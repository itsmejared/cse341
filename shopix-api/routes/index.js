import express from "express";
import productRoutes from "./products.js";
import reviewRoutes from "./reviews.js";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);

export default router;
