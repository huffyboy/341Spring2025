const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contactsController");
const { asyncHandler } = require("../utilities");

router.get("/", asyncHandler(contactsController.getContacts));
router.get("/:id", asyncHandler(contactsController.getContact));
router.post("/", asyncHandler(contactsController.createContact));
router.put("/:id", asyncHandler(contactsController.updateContact));
router.patch("/:id", asyncHandler(contactsController.patchContact));
router.delete("/:id", asyncHandler(contactsController.deleteContact));

module.exports = router;
