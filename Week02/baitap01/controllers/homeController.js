const CRUDService = require("../services/CRUDService");

const index = (req, res) => res.render("crud");

const getUsers = async (req, res) => {
  const users = await CRUDService.getAllUsers();
  res.render("users/findAllUser", { users });
};

const createUser = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  res.redirect("/users");
};

const editForm = async (req, res) => {
  const user = await CRUDService.getUserById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.render("users/updateUser", { user });
};

const updateUser = async (req, res) => {
  await CRUDService.updateUser(req.params.id, req.body);
  res.redirect("/users");
};

const deleteUser = async (req, res) => {
  await CRUDService.deleteUser(req.params.id);
  res.redirect("/users");
};

module.exports = {
  index,
  getUsers,
  createUser,
  editForm,
  updateUser,
  deleteUser,
};
