const dbService = require('../../Common/DBConnection');

// Function to delete a user by username
async function deleteUser(employeeId) {
    await dbService.dbNameWithConnect('office');
    const db = dbService.getDb();
    if (!db) {
        throw new Error('Database connection error');
    }

    try {
        const collection = db.collection('user');
        console.log(employeeId)
        // Find and delete the user by username
        const result = await collection.deleteOne({ id: employeeId });
        if (result.deletedCount === 0) {
            throw new Error('User not found');
        }
        return true; // User deleted successfully
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('User deletion error');
    }
}

// Function to delete a user by username
async function findData(employeeId) {
    await dbService.dbNameWithConnect('office');
    const db = dbService.getDb();
    if (!db) {
        throw new Error('Database connection error');
    }

    try {
        const collection = db.collection('user');
        // Find and delete the user by username
        const result = await collection.findOne({ id: employeeId });
        if (!result) {
            throw new Error('User not found');
        }
        return result; // User deleted successfully
    } catch (error) {
        console.error('Error Update user:', error);
        throw new Error('User deletion error');
    }
}

// Function to update user data by employee ID
async function updateUserData(employeeId, newData) {
    await dbService.dbNameWithConnect('office');
    const db = dbService.getDb();
    if (!db) {
        throw new Error('Database connection error');
    }

    try {
        const collection = db.collection('user');
        // Update the user data based on the employee ID
        const result = await collection.updateOne(
            { id: employeeId },
            { $set: newData } // New data to be updated
        );
        if (result.modifiedCount === 0) {
            throw new Error('User not found or no changes made');
        }
        return result; // User data updated successfully
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('User update error');
    }
}


module.exports = {
    deleteUser,
    findData,
    updateUserData
};