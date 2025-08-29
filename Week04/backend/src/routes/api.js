import { Router } from "express";
import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { getHome } from "../controllers/homeController.js";
import { register, login } from "../controllers/userController.js";

const router = Router();

// Public
router.post("/auth/register", delay(300), register);
router.post("/auth/login", delay(300), login);

// Private
router.get("/home", auth, getHome);

export default router;
