import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug)
      return res
        .status(400)
        .json({ success: false, error: "name và slug là bắt buộc" });
    const exists = await Category.findOne({ slug });
    if (exists)
      return res.status(409).json({ success: false, error: "Slug đã tồn tại" });

    const category = await Category.create({ name, slug });
    res.status(201).json({ success: true, category });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
