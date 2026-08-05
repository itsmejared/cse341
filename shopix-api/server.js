import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import { initDb } from "./database/connection.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import pkg from "express-openid-connect";
const { auth, requiresAuth } = pkg;

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL || `http://localhost:${PORT}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Middleware
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(auth(config))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", routes)
  .use(errorHandler);

// Rutas auxiliares de autenticación para pruebas/demostración
app.get("/auth-status", (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.isAuthenticated() ? req.oidc.user : null,
  });
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to database connection error:", err);
  });
