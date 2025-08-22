import db from "../models/index.js";

export const createNewUser = (data) =>
  db.User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    phone: data.phone,
    gender: data.gender || "Other",
  });

export const getAllUsers = () => db.User.findAll({ order: [["id", "DESC"]] });

export const getUserById = (id) => db.User.findByPk(id);

export const updateUser = (id, data) =>
  db.User.update(
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      gender: data.gender,
    },
    { where: { id } }
  );

export const deleteUser = (id) => db.User.destroy({ where: { id } });
