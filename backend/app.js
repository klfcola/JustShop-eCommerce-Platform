import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import products from "./data/products.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    let foundProduct = products.find((p) => p._id === productId);

    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

export default app;
