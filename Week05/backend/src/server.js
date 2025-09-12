import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();
// credentials: false: không cho phép gửi cookies, Authorization header, hoặc TLS client certificates từ frontend sang backend.
app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`🚀 Server running http://localhost:${PORT}`)
    )
  )
  .catch((e) => {
    console.error("❌ DB connect error:", e);
    process.exit(1);
  });
