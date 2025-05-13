const express = require("express");
const mongodb = require("./db/connect");
const utilities = require("./utilities");
const logger = require("./utilities/logger");
require("dotenv").config();
const app = express();

/* ***********************
 * Middleware
 * ************************/
app.use(express.json()); // JSON parsing
app.use(utilities.logRoutes); // Basic traffic logging

// Import routes
const homeRoute = require("./routes/homeRoute");
const contactRoutes = require("./routes/contactsRoute");
const swaggerRoutes = require("./routes/swagger");

// Home route
app.get("/", homeRoute);
app.use("/contacts", contactRoutes);
app.use("/", swaggerRoutes);
app.use((req, res) => {
  res.status(404).send("Sorry, we appear to have lost that page.");
});

/* ***********************
 * Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

// Setup DB
mongodb.initDb((err) => {
  if (err) {
    logger.error(err);
  }
});

// Final error handler
app.use(utilities.errorHandler);

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  logger.info(`App listening at http://${host}:${port}`);
});
