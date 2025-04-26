const express = require("express");
const router = new express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.buildHome);

module.exports = router;