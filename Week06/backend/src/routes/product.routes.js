import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsPaged,
  increaseViews,
} from "../controllers/product.controller.js";
const router = Router();
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts); // cursor-based (infinite scroll)
router.get("/paged", getProductsPaged); // pagination (tuỳ chọn)
router.post("/:id/views", increaseViews);
export default router;
