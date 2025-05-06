const contactsService = require("../services/contactsService");
const logger = require("../utilities/logger");

async function getContacts(req, res) {
  const contacts = await contactsService.fetchContacts();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(contacts);
}

async function getContact(req, res) {
  const contact = await contactsService.fetchContact(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(contact);
}

async function createContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };
    const createdContact = await contactsService.addContact(newContact);

    res.status(201).json(createdContact);
  } catch (error) {
    logger.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await contactsService.fetchContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await contactsService.updateContact(id, {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    logger.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function patchContact(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const contact = await contactsService.fetchContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await contactsService.updateContact(id, {
      firstName: firstName || contact.firstName,
      lastName: lastName || contact.lastName,
      email: email || contact.email,
      favoriteColor: favoriteColor || contact.favoriteColor,
      birthday: birthday || contact.birthday,
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    logger.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    const contact = await contactsService.fetchContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contactsService.deleteContact(id);

    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  patchContact,
  deleteContact,
};
