const db = require("../models/index");

const createNewUser = async (data) => {
  // data nhận từ form/body: firstName, lastName, email, address, phone, gender
  return db.User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    phone: data.phone,
    gender: data.gender || "Other",
  });
};

const getAllUsers = async () => {
  return db.User.findAll({ order: [["id", "DESC"]] });
};

const getUserById = async (id) => {
  return db.User.findByPk(id);
};

const updateUser = async (id, data) => {
  return db.User.update(
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
};

const deleteUser = async (id) => {
  return db.User.destroy({ where: { id } });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
