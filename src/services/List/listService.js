// src/services/ItemService.js
const { getDb } = require('../../Common/DBConnection');
const dbService = require('../../Common/DBConnection');

async function getAllItems() {
    await dbService.dbNameWithConnect('office');
    const db = getDb();
    if (!db) {
        throw new Error('Database connection error');
    }
    try {
        const items = await db.collection('user').find({}).toArray();
        console.log("DB Contant");
        console.log(items)
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

module.exports = {
    getAllItems
};
