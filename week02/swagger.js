const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Temples API",
    description: "API for managing temples - CSE341 Week 02",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const routesFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, routesFiles, doc);
