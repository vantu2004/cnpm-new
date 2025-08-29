import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { port, mongoUri } from "./config/index.js";
import connectDB from "./config/db.js";
import apiRouter from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine (tuỳ chọn)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
await connectDB(mongoUri);

// Routes
app.use("/api", apiRouter);

// Trang chủ demo (EJS)
app.get("/", (req, res) => {
  res.render("index", { title: "ExpressJS + MongoDB Demo (ESM)" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
