const express = require("express");
const router = new express.Router();
const homeController = require("../controllers/homeController");
const { asyncHandler } = require("../utilities");

router.get("/", asyncHandler(homeController.buildHome));

module.exports = router;
