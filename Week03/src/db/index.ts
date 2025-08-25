import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
  }
);

export async function testConnection() {
  // Sequelize sẽ thử kết nối tới DB bằng thông tin trên
  await sequelize.authenticate();
  console.log("✅ Database connected");
}
