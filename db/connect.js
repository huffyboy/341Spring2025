const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const logger = require("../utilities/logger");

let _db;

const initDb = async (callback) => {
  if (_db) {
    logger.info("Db is already initialized!");
    return callback(null, _db);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client;
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized!");
  }
  return _db;
};

/**
 * Generic helper to get a MongoDB collection and optionally return its contents
 * @param {string} collectionName - The collection to access
 * @param {object} options
 * @param {boolean} options.asArray - If true, returns the contents of the collection as an array
 * @param {object} options.query - Optional MongoDB query
 * @returns {Promise<Array|Collection>}
 */
const getCollection = async (
  collectionName,
  { asArray = false, query = {} } = {}
) => {
  const db = getDb().db();
  const collection = db.collection(collectionName);

  if (asArray) {
    const cursor = collection.find(query);
    return await cursor.toArray();
  }

  return collection;
};

module.exports = {
  initDb,
  getDb,
  getCollection,
};
