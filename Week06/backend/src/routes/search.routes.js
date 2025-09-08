import { Router } from "express";
import { searchProducts } from "../controllers/search.controller.js";
const router = Router();
router.get("/products", searchProducts);
export default router;
