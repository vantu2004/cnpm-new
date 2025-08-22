const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./models"); // models/index.js (CLI sinh sẵn)
const webRoutes = require("./routes/web");

dotenv.config();
const app = express();

// Middleware mới của Express 5 (thay body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", webRoutes);

// Error handler chuẩn Express 5 (bắt lỗi async Promise reject)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal error");
});

const port = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected");
    return db.sequelize.sync(); // có thể bỏ nếu chỉ dùng migration
  })
  .then(() =>
    app.listen(port, () => console.log(`Server http://localhost:${port}`))
  )
  .catch((e) => {
    console.error("❌ DB error:", e);
    process.exit(1);
  });
