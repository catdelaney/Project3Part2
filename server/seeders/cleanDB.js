const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
