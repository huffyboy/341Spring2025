const express = require('express');
require('dotenv').config();
const app = express();

// Import routes
const homeRoute = require("./routes/homeRoute");

// Home route
app.get("/", homeRoute)

/* ***********************
 * Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
