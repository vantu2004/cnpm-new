"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // associations (nếu có)
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        defaultValue: "Other",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
