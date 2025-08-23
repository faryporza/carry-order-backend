import express from "express";
import { getProducts, createProduct, updateProduct, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;
