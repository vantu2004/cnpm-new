const express = require("express");
const home = require("../controllers/homeController");
const router = express.Router();

router.get("/", home.index);

router.get("/users", home.getUsers); // READ all
router.post("/users", home.createUser); // CREATE
router.get("/users/:id/edit", home.editForm); // UPDATE form
router.post("/users/:id", home.updateUser); // UPDATE (giữ POST để giống slide)
router.post("/users/:id/delete", home.deleteUser); // DELETE

module.exports = router;
