const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quick Bill API",
      version: "1.0.0",
      description: "API documentation for the Quick Bill application",
    },
    servers: [
      {
        url: "http://13.60.238.179/",
        description: "Admin API server",
      },
    ],
  },
  apis: ["./utils/swaggerAdmin.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
