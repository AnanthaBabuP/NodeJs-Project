const bcrypt = require('bcrypt');
const dbService = require('../../Common/DBConnection');

// Function to hash the password
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Function to check the password
async function checkPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error checking password');
    }
}

async function authenticateUser(username, password) {
    const db = dbService.getDb();
    if (!db) {
        throw new Error('Database connection error');
    }

    try {
        // Find user with the provided username
        const collection = db.collection('users'); // Assuming your collection is named 'users'
        const user = await collection.findOne({username });
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
