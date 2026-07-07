import { Router } from "express";
import contactsRoutes from "./contacts.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Contacts API is running",
  });
});

router.use("/contacts", contactsRoutes);

export default router;
