const fs = require("fs");
const path = require("path");
const swaggerSpec = require("../controllers/swaggerController");
const logger = require("../utilities/logger");

const outputDir = path.join(__dirname, "../docs");
const outputPath = path.join(outputDir, "swagger.json");

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf8");
logger.info(`✅ Swagger spec saved to: ${outputPath}`);
