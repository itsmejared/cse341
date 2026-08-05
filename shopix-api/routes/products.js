import express from "express";
import pkg from "express-openid-connect";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import { validateProduct, validateId } from "../middleware/validate.js";

const { requiresAuth } = pkg;
const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);

// Protected routes (Require Auth0 Login)
router.post("/", requiresAuth(), validateProduct, createProduct);
router.put("/:id", requiresAuth(), validateId, validateProduct, updateProduct);
router.delete("/:id", requiresAuth(), validateId, deleteProduct);

export default router;
