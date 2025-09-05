import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsPaged,
} from "../controllers/product.controller.js";

const router = Router();
router.post("/", createProduct);
router.get("/", getProducts); // cursor-based (infinite scroll)
router.get("/paged", getProductsPaged); // pagination (tuỳ chọn)
export default router;
