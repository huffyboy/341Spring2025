// utilities/logger.js
const winston = require("winston");

const { combine, timestamp, printf, colorize, json } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", // Default log level
  format: combine(timestamp(), logFormat),
  transports: [
    // Console output for development
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    // File output for production
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info", // Only log 'info' and higher levels to file in production
      format: combine(timestamp(), json()),
    }),
  ],
});

module.exports = logger;
