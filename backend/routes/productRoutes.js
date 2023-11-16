import express from "express";
import products from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const productId = req.params.id;
    let foundProduct = products.find((p) => p._id === productId);

    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

export default router;
