import "dotenv/config";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import db from "./models/index.js";
import webRoutes from "./routes/web.js";

const app = express();

// Middleware Express 5 (thay body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", webRoutes);

// Error handler chuẩn (bắt async errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal error");
});

const port = process.env.PORT || 3000;

try {
  await db.sequelize.authenticate();
  console.log("✅ MySQL connected");
  // Nếu bạn dùng migration rồi thì không cần sync:
  // await db.sequelize.sync();
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
} catch (e) {
  console.error("❌ DB error:", e);
  process.exit(1);
}
