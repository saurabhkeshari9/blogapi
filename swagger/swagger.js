const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Importing schemas
const components = require("./components");

// Importing paths correctly
const adminRoutes = require("./admin/adminroutes");
const userAuth = require("./user/userroutes");

console.log(adminRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Post API",
      version: "1.0.0",
      description: "API documentation for User and Admin",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
    components: components.components,
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Admin", description: "Admin operations" },
      { name: "Posts", description: "Post operations" },
      { name: "Comments", description: "Comment operations" },
      { name: "FAQs", description: "FAQ operations" },
      { name: "AdminPosts", description: "Admin post operations" },
      { name: "AdminComments", description: "Admin comment operations" },
      { name: "AdminFAQs", description: "Admin FAQ operations" },
    ],
    paths: {
      ...adminRoutes,
      ...userAuth,
    },
  },
  apis: ["./routes/**/*.js"], // Ensure correct path
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
