import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, categoryId } = req.body;
    if (!name || price == null || !categoryId)
      return res
        .status(400)
        .json({ success: false, error: "name, price, categoryId là bắt buộc" });

    const existsCat = await Category.findById(categoryId).select("_id");
    if (!existsCat)
      return res
        .status(404)
        .json({ success: false, error: "Category không tồn tại" });

    const product = await Product.create({ name, price, image, categoryId });
    res.status(201).json({ success: true, product });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

// GET /api/products (cursor-based)
// query: categoryId | categorySlug, limit=12, after=<ObjectId>
export const getProducts = async (req, res) => {
  try {
    const { categoryId, categorySlug, limit = 5, after } = req.query;
    const pageSize = Math.min(Number(limit) || 12, 60);

    let catId = categoryId;
    if (!catId && categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug })
        .select("_id")
        .lean();
      if (!cat)
        return res
          .status(404)
          .json({ success: false, error: "Category not found" });
      catId = cat._id;
    }
    if (!catId)
      return res.status(400).json({
        success: false,
        error: "categoryId hoặc categorySlug là bắt buộc",
      });

    const filter = { categoryId: new mongoose.Types.ObjectId(catId) };
    if (after) {
      if (!mongoose.isValidObjectId(after))
        return res
          .status(400)
          .json({ success: false, error: "after không hợp lệ" });
      filter._id = { $lt: new mongoose.Types.ObjectId(after) }; // sort desc, load tiếp
    }

    const items = await Product.find(filter)
      .sort({ _id: -1 }) // đảm bảo cursor hoạt động
      .limit(pageSize)
      .lean();

    const nextCursor =
      items.length === pageSize ? String(items[items.length - 1]._id) : null;

    res.json({ success: true, items, nextCursor });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

// (Tuỳ chọn) GET /api/products/paged?page=1&pageSize=12&categoryId=...
export const getProductsPaged = async (req, res) => {
  try {
    const { page = 1, pageSize = 12, categoryId } = req.query;
    if (!categoryId)
      return res
        .status(400)
        .json({ success: false, error: "categoryId là bắt buộc" });

    const p = Math.max(Number(page), 1);
    const size = Math.min(Number(pageSize), 60);

    const filter = { categoryId: new mongoose.Types.ObjectId(categoryId) };
    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * size)
        .limit(size)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      items,
      page: p,
      pageSize: size,
      total,
      totalPages: Math.ceil(total / size),
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
