import Category from "../models/Category.js";
import { es, ES_INDEX } from "../search/es.js";

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
      pageSize = 12,
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

    if (catId) filter.push({ term: { categoryId: catId } });
    if (catSlug) filter.push({ term: { categorySlug: catSlug } });

    const priceRange = {};
    if (priceMin != null) priceRange.gte = Number(priceMin);
    if (priceMax != null) priceRange.lte = Number(priceMax);
    if (Object.keys(priceRange).length)
      filter.push({ range: { price: priceRange } });

    if (onSale != null && onSale !== "")
      filter.push({ term: { onSale: onSale === "true" } });
    if (minViews != null && minViews !== "")
      filter.push({ range: { views: { gte: Number(minViews) } } });

    let sortSpec = [];
    if (sort === "newest") sortSpec = [{ createdAt: "desc" }];
    else if (sort === "priceAsc") sortSpec = [{ price: "asc" }];
    else if (sort === "priceDesc") sortSpec = [{ price: "desc" }];
    else if (sort === "viewsDesc") sortSpec = [{ views: "desc" }];
    else sortSpec = ["_score"]; // relevance

    const from = Math.max(
      0,
      (Number(page) - 1) * Math.min(Number(pageSize) || 12, 60)
    );
    const size = Math.min(Number(pageSize) || 12, 60);

    const body = {
      query: { bool: { must, filter } },
      sort: sortSpec,
      from,
      size,
    };
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
