const dbService = require('./DBConnection');

/**
 * Get MaxId Value
 * @param {*} collectionName 
 * @param {*} tableName 
 * @returns 
 */
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

/**
 * Total count for Screen
 * @param {*} itemsData 
 * @param {*} pageSize 
 * @returns 
 */
const calculateTotalPages = async (itemsData, pageSize) => {
    try {
        
        const totalItems = itemsData.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        console.log("total page count : "+ totalPages);
        return totalPages;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error occurred while calculating total pages');
    }
};

// Export the object and function
module.exports = {
    getMaxId,
    calculateTotalPages
};
