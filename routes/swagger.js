const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerController = require("../controllers/swaggerController");

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerController.spec)
);
router.get("/swagger.json", swaggerController.getSwaggerSpec);

module.exports = router;
