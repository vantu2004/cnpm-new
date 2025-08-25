import app from "./app";
import { testConnection, sequelize } from "./db";

const PORT = Number(process.env.PORT || 3000);

(async () => {
  try {
    await testConnection();
    // Không dùng sync() nếu bạn đã dùng migration. Chỉ bật khi cần tạo bảng nhanh:
    // await sequelize.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("DB connect failed:", e);
    process.exit(1);
  }
})();
