import express from "express";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
import { validateReview, validateId } from "../middleware/validate.js";

const router = express.Router();

// Public routes
router.get("/", getAllReviews);
router.get("/:id", validateId, getReviewById);

// Protected routes (Require Auth0 Login)
router.post("/", requiresAuth(), validateReview, createReview);
router.put("/:id", requiresAuth(), validateId, validateReview, updateReview);
router.delete("/:id", requiresAuth(), validateId, deleteReview);

export default router;
