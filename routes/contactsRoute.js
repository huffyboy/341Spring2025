const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contactsController");
const { asyncHandler } = require("../utilities");

router.get("/", asyncHandler(contactsController.getContacts));
router.get("/:id", asyncHandler(contactsController.getContact));

module.exports = router;
