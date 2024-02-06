const dbService = require('../../Common/DBConnection');

async function authenticateUser(username, password) {
    await dbService.dbNameWithConnect('loginDatabase');
    const db = dbService.getDb();
    if (!db) {
        throw new Error('Database connection error');
    }

    try {
        // Find user with the provided username
        const collection = db.collection('users'); // Assuming your collection is named 'users'
        const user = await collection.findOne({username : username });
        // If user doesn't exist or password doesn't match, return null

        if (!user || user.password !== password) {
            return null;
        }

        // If user exists and password matches, return the user
        return user;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw new Error('Authentication error');
    }
}

module.exports = {
    authenticateUser
};
