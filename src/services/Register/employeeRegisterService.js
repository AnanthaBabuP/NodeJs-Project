// services/EmployeeService.js
const dbService = require('../../Common/DBConnection');
const maxId = require('../../Common/CommonMethods');

async function registerEmployee(employeeData) {
    try {
        await dbService.dbNameWithConnect('office');
        const db = await dbService.getDb();
        const collection = await db.collection('user'); // Assuming your collection is named 'employees'
        employeeData.id =await maxId.getMaxId('office','user');
        await collection.insertOne(employeeData);
    } catch (error) {
        throw new Error('Error registering employee');
    }
}

module.exports = {
    registerEmployee
};
