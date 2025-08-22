import Sequelize from "sequelize";
import process from "process";
import configFile from "../config/config.js"; // CLI dùng CJS; app có thể import .cjs
import UserModel from "./user.js";

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);

export default db;
