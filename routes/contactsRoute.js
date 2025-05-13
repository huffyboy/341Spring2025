const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contactsController");
const { asyncHandler } = require("../utilities");

/**
 * @openapi
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contacts
 *     operationId: getAllContacts
 *     description: Returns a list of all contacts.
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(contactsController.getContacts));

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get a single contact
 *     operationId: getContactById
 *     description: Returns a contact by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: A single contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(contactsController.getContact));

/**
 * @openapi
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a contact
 *     operationId: createContact
 *     description: Creates a new contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *         links:
 *           GetCreatedContact:
 *             $ref: '#/components/links/GetContactById'
 *       400:
 *         description: Bad request — missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", asyncHandler(contactsController.createContact));

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Replace a contact
 *     operationId: replaceContact
 *     description: Completely replace a contact's data.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       200:
 *         description: Contact replaced
 *         links:
 *           GetUpdatedContact:
 *             $ref: '#/components/links/GetContactFromRequestPath'
 *       400:
 *         description: Bad request — missing required fields
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", asyncHandler(contactsController.updateContact));

/**
 * @openapi
 * /contacts/{id}:
 *   patch:
 *     tags:
 *       - Contacts
 *     summary: Update a contact
 *     operationId: updateContact
 *     description: Update one or more fields of an existing contact.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartialContact'
 *     responses:
 *       200:
 *         description: Contact updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *         links:
 *           GetUpdatedContact:
 *             $ref: '#/components/links/GetContactFromRequestPath'
 *       400:
 *         description: Bad request — invalid data
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", asyncHandler(contactsController.patchContact));

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact
 *     operationId: deleteContact
 *     description: Delete a contact from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(contactsController.deleteContact));

module.exports = router;
