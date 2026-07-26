import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

const COLLECTION_NAME = "products";

export const getAllProducts = async (req, res, next) => {
  try {
    const db = getDb();
    const products = await db.collection(COLLECTION_NAME).find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const product = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const db = getDb();
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      brand: req.body.brand,
      sku: req.body.sku,
      isAvailable: Boolean(req.body.isAvailable),
      createdAt: new Date().toISOString(),
    };

    const response = await db.collection(COLLECTION_NAME).insertOne(newProduct);
    res.status(201).json({ id: response.insertedId });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      brand: req.body.brand,
      sku: req.body.sku,
      isAvailable: Boolean(req.body.isAvailable),
      updatedAt: new Date().toISOString(),
    };

    const response = await db
      .collection(COLLECTION_NAME)
      .replaceOne({ _id: new ObjectId(id) }, updatedProduct);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const response = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    next(error);
  }
};
