// src/routes/product.routes.ts
import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
