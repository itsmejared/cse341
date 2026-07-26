import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import { validateProduct, validateId } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateId, validateProduct, updateProduct);
router.delete("/:id", validateId, deleteProduct);

export default router;
