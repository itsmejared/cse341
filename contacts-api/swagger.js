import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Contacts API",
    description: "API to manage contacts (CSE 341)",
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || process.env.HOST || "localhost:3000",
  schemes:
    process.env.RENDER_EXTERNAL_HOSTNAME || process.env.NODE_ENV === "production"
      ? ["https"]
      : ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/routes.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
