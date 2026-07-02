import express from "express";
import cors from "cors";
import { initDb } from "./db/connect.js";
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

//Load all the routes with CORS
app.use("/", routes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
