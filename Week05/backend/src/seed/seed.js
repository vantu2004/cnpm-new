import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const cats = [
  { name: "Điện thoại", slug: "dien-thoai", q: "phone" },
  { name: "Laptop", slug: "laptop", q: "laptop" },
  { name: "Máy ảnh", slug: "may-anh", q: "camera" },
  { name: "Đồng hồ", slug: "dong-ho", q: "watch" },
  { name: "Tai nghe", slug: "tai-nghe", q: "headphone" },
  { name: "Loa", slug: "loa", q: "speaker" },
  { name: "Bàn phím", slug: "ban-phim", q: "keyboard" },
  { name: "Chuột", slug: "chuot", q: "mouse" },
  { name: "Màn hình", slug: "man-hinh", q: "monitor" },
];

function unsplash(q, i) {
  // Chỉ dùng URL ảnh public để demo
  return `https://images.unsplash.com/photo-155${i}12345?auto=format&fit=crop&w=800&q=60&sig=${q}-${i}`;
}

async function run() {
  await connectDB(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Category.deleteMany({});

  for (const c of cats) {
    const cat = await Category.create({ name: c.name, slug: c.slug });
    const items = Array.from({ length: 5 }).map((_, i) => ({
      name: `${c.name} ${i + 1}`,
      price: Math.floor(Math.random() * 900 + 100) * 1000,
      image: unsplash(c.q, i + 1),
      categoryId: cat._id,
    }));
    await Product.insertMany(items);
  }
  console.log("✅ Seed done");
  await mongoose.connection.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
