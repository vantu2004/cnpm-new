import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName: "mini_shop" });
  console.log("✅ MongoDB connected");
}
