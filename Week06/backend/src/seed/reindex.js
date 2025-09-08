import dotenv from "dotenv";
import { connectDB } from "../db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { bulkReindex } from "../search/indexer.js";

dotenv.config();

await connectDB(process.env.MONGODB_URI);
const cats = await Category.find().select("slug").lean();
const slugMap = new Map(cats.map((c) => [String(c._id), c.slug]));
const products = (await Product.find().lean()).map((p) => ({
  ...p,
  categorySlug: slugMap.get(String(p.categoryId)),
}));
await bulkReindex(products);
console.log("✅ Reindex done");
process.exit(0);
