import express from "express";
// import products from "../data/products.js";
// import asyncHandler from "express-async-handler";
// import Product from "../models/productsModel.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
