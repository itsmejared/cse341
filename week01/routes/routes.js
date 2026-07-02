import { Router } from "express";
import { getData } from "../controllers/professional.js";
import data from "../data.json" with { type: "json" };

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Week 01 REST API is running",
  });
});

router.get("/professional-json", (req, res) => {
  res.json(data[0]);
});

router.get("/professional", getData);

export default router;
