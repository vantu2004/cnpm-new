import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { indexProductDoc, deleteProductDoc } from "../search/indexer.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      categoryId,
      description = "",
      onSale = false,
      discountPercent = 0,
    } = req.body;
    if (!name || price == null || !categoryId)
      return res
        .status(400)
        .json({ success: false, error: "name, price, categoryId là bắt buộc" });

    const cat = await Category.findById(categoryId).select("slug");
    if (!cat)
      return res
        .status(404)
        .json({ success: false, error: "Category không tồn tại" });

    const product = await Product.create({
      name,
      price,
      image,
      categoryId,
      description,
      onSale,
      discountPercent,
    });
    await indexProductDoc({ ...product.toObject(), categorySlug: cat.slug });
    res.status(201).json({ success: true, product });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Product.findByIdAndDelete(id);
    if (!del)
      return res.status(404).json({ success: false, error: "Not found" });
    await deleteProductDoc(id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

// Cursor-based cho infinite scroll theo danh mục
export const getProducts = async (req, res) => {
  try {
    const { categoryId, categorySlug, limit = 12, after } = req.query;
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
      return res
        .status(400)
        .json({
          success: false,
          error: "categoryId hoặc categorySlug là bắt buộc",
        });

    const filter = { categoryId: new mongoose.Types.ObjectId(catId) };
    if (after) {
      if (!mongoose.isValidObjectId(after))
        return res
          .status(400)
          .json({ success: false, error: "after không hợp lệ" });
      filter._id = { $lt: new mongoose.Types.ObjectId(after) };
    }

    const items = await Product.find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .lean();
    const nextCursor =
      items.length === pageSize ? String(items[items.length - 1]._id) : null;
    res.json({ success: true, items, nextCursor });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

// (tuỳ chọn) Pagination truyền thống
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

export const increaseViews = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, product: updated });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
