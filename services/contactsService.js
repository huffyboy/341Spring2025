const { getCollection } = require("../db/connect");
const { ObjectId } = require("mongodb");

async function fetchContacts() {
  return await getCollection("contacts", { asArray: true });
}

async function fetchContact(contactId) {
  if (!ObjectId.isValid(contactId)) {
    return null;
  }

  const collection = await getCollection("contacts");
  return await collection.findOne({
    _id: ObjectId.createFromHexString(contactId),
  });
}

module.exports = {
  fetchContacts,
  fetchContact,
};
