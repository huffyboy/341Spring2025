const express = require("express");
const mongodb = require("./db/connect");
const utilities = require("./utilities");
const logger = require("./utilities/logger");
const cors = require("cors");
require("dotenv").config();

const allowedOrigins = [
  process.env.SERVER_URL,
  "https://cse341-contacts-frontend.netlify.app",
  "http://localhost:3000",
];
const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

/* ***********************
 * Middleware
 * ************************/
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);
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
