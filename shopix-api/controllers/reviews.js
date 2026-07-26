import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

const COLLECTION_NAME = "reviews";

export const getAllReviews = async (req, res, next) => {
  try {
    const db = getDb();
    const reviews = await db.collection(COLLECTION_NAME).find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const review = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const db = getDb();
    const newReview = {
      productId: req.body.productId,
      user: req.body.user,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    };

    const response = await db.collection(COLLECTION_NAME).insertOne(newReview);
    res.status(201).json({ id: response.insertedId });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updatedReview = {
      productId: req.body.productId,
      user: req.body.user,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      updatedAt: new Date().toISOString(),
    };

    const response = await db
      .collection(COLLECTION_NAME)
      .replaceOne({ _id: new ObjectId(id) }, updatedReview);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const response = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    next(error);
  }
};
