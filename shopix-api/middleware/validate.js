import { ObjectId } from "mongodb";

export const validateProduct = (req, res, next) => {
  const { name, description, price, category, stock, brand, sku, isAvailable } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!description) missingFields.push("description");
  if (price === undefined || price === null) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (stock === undefined || stock === null) missingFields.push("stock");
  if (!brand) missingFields.push("brand");
  if (!sku) missingFields.push("sku");
  if (isAvailable === undefined || isAvailable === null) missingFields.push("isAvailable");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Validation Failed",
      message: `The following required fields are missing: ${missingFields.join(", ")}`,
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: "Validation Failed",
      message: 'Field "price" must be a positive number.',
    });
  }

  if (typeof stock !== "number" || stock < 0) {
    return res.status(400).json({
      error: "Validation Failed",
      message: 'Field "stock" must be a non-negative integer.',
    });
  }

  if (typeof isAvailable !== "boolean") {
    return res.status(400).json({
      error: "Validation Failed",
      message: 'Field "isAvailable" must be a boolean.',
    });
  }

  next();
};

export const validateReview = (req, res, next) => {
  const { productId, user, rating, comment } = req.body;

  const missingFields = [];
  if (!productId) missingFields.push("productId");
  if (!user) missingFields.push("user");
  if (rating === undefined || rating === null) missingFields.push("rating");
  if (!comment) missingFields.push("comment");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Validation Failed",
      message: `The following required fields are missing: ${missingFields.join(", ")}`,
    });
  }

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: "Validation Failed",
      message: 'Field "productId" must be a valid MongoDB ObjectId string.',
    });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      error: "Validation Failed",
      message: 'Field "rating" must be a number between 1 and 5.',
    });
  }

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid Identifier",
      message: "The provided URL parameter is not a valid MongoDB ObjectId.",
    });
  }
  next();
};
