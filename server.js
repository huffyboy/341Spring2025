const express = require("express");
const mongodb = require("./db/connect");
const utilities = require("./utilities");
const logger = require("./utilities/logger");
require("dotenv").config();
const app = express();

/* ***********************
 * Middleware
 * ************************/
app.use(utilities.logRoutes);

// Import routes
const homeRoute = require("./routes/homeRoute");
const contactsRoute = require("./routes/contactsRoute");

// Home route
app.get("/", homeRoute);
app.use("/contacts", contactsRoute);
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

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  logger.info(`App listening at http://${host}:${port}`);
});
