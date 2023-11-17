import express from "express";
// import products from "../data/products.js";
// import asyncHandler from "express-async-handler";
// import Product from "../models/productsModel.js";
import {
    getProducts,
    getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

export default router;
