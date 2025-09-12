import Category from "../models/Category.js";
import { es, ES_INDEX } from "../search/es.js";

// helper: convert string param thành number nếu có, nếu rỗng thì bỏ qua
function parseNumberParam(val) {
  if (val === undefined || val === null || val === "") return undefined;
  return Number(val);
}

// GET /api/search/products
// q, categorySlug|categoryId, priceMin, priceMax, onSale, minViews, sort(relevance|newest|priceAsc|priceDesc|viewsDesc), page, pageSize
export const searchProducts = async (req, res) => {
  try {
    const {
      q = "",
      categoryId,
      categorySlug,
      priceMin,
      priceMax,
      onSale,
      minViews,
      sort = "relevance",
      page = 1,
      pageSize = 5,
    } = req.query;

    let catId = categoryId;
    let catSlug = categorySlug;
    if (!catId && catSlug) {
      const cat = await Category.findOne({ slug: catSlug })
        .select("_id slug")
        .lean();
      if (cat) catId = String(cat._id);
    }

    const must = [];
    const should = [];
    const filter = [];

    // search text
    if (q && q.trim()) {
      should.push(
        {
          multi_match: {
            query: q,
            fields: ["name^3", "description"],
            fuzziness: "AUTO",
            operator: "and",
            type: "most_fields",
          },
        },
        { prefix: { name: q.toLowerCase() } }
      );
      must.push({ bool: { should, minimum_should_match: 1 } });
    }

    // category filter
    if (catId) filter.push({ term: { categoryId: catId } });
    if (catSlug) filter.push({ term: { categorySlug: catSlug } });

    // price filter
    const min = parseNumberParam(priceMin);
    const max = parseNumberParam(priceMax);
    const priceRange = {};
    if (min !== undefined) priceRange.gte = min;
    if (max !== undefined) priceRange.lte = max;
    if (Object.keys(priceRange).length) {
      filter.push({ range: { price: priceRange } });
    }

    // onSale filter
    if (onSale !== undefined && onSale !== "") {
      filter.push({ term: { onSale: onSale === "true" } });
    }

    // minViews filter
    const viewsMin = parseNumberParam(minViews);
    if (viewsMin !== undefined) {
      filter.push({ range: { views: { gte: viewsMin } } });
    }

    // sort
    let sortSpec = [];
    if (sort === "newest") sortSpec = [{ createdAt: "desc" }];
    else if (sort === "priceAsc") sortSpec = [{ price: "asc" }];
    else if (sort === "priceDesc") sortSpec = [{ price: "desc" }];
    else if (sort === "viewsDesc") sortSpec = [{ views: "desc" }];
    else sortSpec = ["_score"]; // relevance

    // pagination
    const from = Math.max(
      0,
      (Number(page) - 1) * Math.min(Number(pageSize) || 5, 60)
    );
    const size = Math.min(Number(pageSize) || 5, 60);

    const body = {
      query: { bool: { must, filter } },
      sort: sortSpec,
      from,
      size,
    };

    console.log("Elasticsearch query body:", JSON.stringify(body, null, 2)); // log debug

    const { hits } = await es.search({ index: ES_INDEX, body });

    const items = hits.hits.map((h) => ({
      _id: h._id,
      score: h._score,
      ...h._source,
    }));

    res.json({
      success: true,
      items,
      page: Number(page),
      pageSize: size,
      total: hits.total?.value ?? 0,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
