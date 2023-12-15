import express from "express";
// import products from "../data/products.js";
// import asyncHandler from "express-async-handler";
// import Product from "../models/productsModel.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router
    .route("/:id")
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
