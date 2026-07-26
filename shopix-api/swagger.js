import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Shopix REST API",
    description: "E-Commerce REST API - Project 2 Part 1 for CSE341",
    version: "1.0.0",
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || "localhost:3000",
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ["https"] : ["http"],
};

const outputFile = "./swagger-output.json";
const routesFiles = ["./routes/index.js"];

await swaggerAutogen()(outputFile, routesFiles, doc);
