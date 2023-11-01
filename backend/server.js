import express from "express";
import products from "./data/products.json" assert { type: "json" };
const port = 5000;

const app = express();

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
