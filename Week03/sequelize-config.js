import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    timezone: "+07:00",
    logging: false,
  },
  test: {
    /* có thể copy dev và chỉnh DB riêng */
  },
  production: {
    /* ... */
  },
};
