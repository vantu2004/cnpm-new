import * as CRUDService from "../services/CRUDService.js";

export const index = (req, res) => res.render("crud");

export const getUsers = async (req, res) => {
  const users = await CRUDService.getAllUsers();
  res.render("users/findAllUser", { users });
};

export const createUser = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  res.redirect("/users");
};

export const editForm = async (req, res) => {
  const user = await CRUDService.getUserById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.render("users/updateUser", { user });
};

export const updateUser = async (req, res) => {
  await CRUDService.updateUser(req.params.id, req.body);
  res.redirect("/users");
};

export const deleteUser = async (req, res) => {
  await CRUDService.deleteUser(req.params.id);
  res.redirect("/users");
};
