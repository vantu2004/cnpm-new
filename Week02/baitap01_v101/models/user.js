import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        defaultValue: "Other",
      },
    },
    { sequelize, modelName: "User" }
  );
  return User;
};
