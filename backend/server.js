import express from "express";
import dotenv from "dotenv";
import products from "./data/products.json" assert { type: "json" };
import cors from "cors";

const port = process.env.PORT || 5001;

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
    const productId = req.params.id; // Get the product ID from the request parameters

    let foundProduct = null;

    products.products.forEach((p) => {
        if (p._id === productId) {
            foundProduct = p;
        }
    });

    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
