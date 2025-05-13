const logger = require("./logger");

const Util = {};

Util.logRoutes = (req, res, next) => {
  const ignoredExtensions = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".ico",
  ];
  const shouldIgnore = ignoredExtensions.some((ext) =>
    req.originalUrl.endsWith(ext)
  );

  const startTime = Date.now();

  res.on("finish", () => {
    if (!shouldIgnore) {
      const duration = Date.now() - startTime;
      const status = res.statusCode;
      const method = req.method;
      const url = req.originalUrl;

      let color, level;

      if (status >= 500) {
        color = "\x1b[31m"; // red
        level = "error";
      } else if (status >= 400) {
        color = "\x1b[33m"; // yellow
        level = "warn";
      } else if (status >= 300) {
        color = "\x1b[36m"; // cyan
        level = "info";
      } else {
        color = "\x1b[32m"; // green
        level = "info";
      }

      const msg = `\x1b[90m${method}\x1b[0m ${color}${status}\x1b[0m \x1b[34m${url}\x1b[0m (${duration}ms)`;
      logger[level](msg);
    }
  });

  next();
};

Util.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

Util.errorHandler = (err, req, res, next) => {
  void next;
  const grey = "\x1b[90m";
  const reset = "\x1b[0m";

  logger.error(
    `${grey}${req.method} ${req.originalUrl} \n${err.stack || err.message}${reset}`
  );

  res.status(500).send("Internal Server Error");
};

module.exports = Util;
