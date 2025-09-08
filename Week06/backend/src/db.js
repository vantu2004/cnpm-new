import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName: "mini_shop_v2" });
  console.log("✅ MongoDB connected");
}
