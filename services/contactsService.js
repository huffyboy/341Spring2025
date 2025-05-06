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

async function addContact(newContact) {
  const collection = await getCollection("contacts");
  const result = await collection.insertOne(newContact);

  if (result.insertedId) {
    return { ...newContact, _id: result.insertedId };
  } else {
    throw new Error("Error inserting contact");
  }
}

async function updateContact(contactId, updatedContact) {
  if (!ObjectId.isValid(contactId)) {
    return null;
  }

  const collection = await getCollection("contacts");
  await collection.updateOne(
    { _id: ObjectId.createFromHexString(contactId) },
    { $set: updatedContact }
  );

  return await fetchContact(contactId);
}

async function deleteContact(contactId) {
  if (!ObjectId.isValid(contactId)) {
    return null;
  }

  const collection = await getCollection("contacts");
  const result = await collection.deleteOne({
    _id: ObjectId.createFromHexString(contactId),
  });

  return result.deletedCount > 0;
}

module.exports = {
  fetchContacts,
  fetchContact,
  addContact,
  updateContact,
  deleteContact,
};
