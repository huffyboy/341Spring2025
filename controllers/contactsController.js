const contactsService = require("../services/contactsService");

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

module.exports = {
  getContacts,
  getContact,
};
