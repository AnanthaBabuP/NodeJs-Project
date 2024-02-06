const dbService = require('./DBConnection');

const getMaxId = async (collectionName, tableName) => {
    try {
        await dbService.dbNameWithConnect(collectionName);
        const db = await dbService.getDb();
        const collection = db.collection(tableName);
        const maxIdDocument = await collection.find().sort({ id: -1 }).limit(1).toArray();
        if (maxIdDocument.length > 0) {
            let maxId = maxIdDocument[0].id;
            console.log('Maximum id value:', maxId);
            return maxId+1;
        } else {
            console.log('Maximum id value:', 1);
            return 1;
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error occurred while getting the maximum ID');
    }
};

// Export the object and function
module.exports = {
    getMaxId
};
