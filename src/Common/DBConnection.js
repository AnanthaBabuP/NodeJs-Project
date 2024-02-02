// src/services/Common/DBConnectionService.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'loginDatabase';

let db;

// Check Connection
async function connect() {
    try {
        const client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getDb() {
    return db;
}

module.exports = {
    connect,
    getDb
};
