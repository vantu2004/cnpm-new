import { Router } from "express";
import * as home from "../controllers/homeController.js";

const router = Router();

router.get("/", home.index);
router.get("/users", home.getUsers); // READ all
router.post("/users", home.createUser); // CREATE
router.get("/users/:id/edit", home.editForm); // UPDATE form
router.post("/users/:id", home.updateUser); // UPDATE (giữ POST như slide)
router.post("/users/:id/delete", home.deleteUser); // DELETE

export default router;
