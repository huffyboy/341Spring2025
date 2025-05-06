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

  if (!shouldIgnore) {
    // print routes in gray and blue
    logger.info(
      `\x1b[90m${req.method}\x1b[0m \x1b[34m${req.originalUrl}\x1b[0m`
    );
  }

  next();
};

Util.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = Util;
