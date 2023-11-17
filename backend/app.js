import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
