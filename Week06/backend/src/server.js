import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import searchRouter from "./routes/search.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/search", searchRouter);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`))
  )
  .catch((e) => {
    console.error("❌ DB connect error:", e);
    process.exit(1);
  });
