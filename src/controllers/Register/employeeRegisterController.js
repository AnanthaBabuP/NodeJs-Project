// controllers/EmployeeController.js
const express = require('express');
const router = express.Router();
const employeeService = require('../../services/Register/employeeRegisterService');

// Render the register form
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle form submission
router.post('/register', async (req, res) => {
    try {
        const employeeData = req.body;
        await employeeService.registerEmployee(employeeData);
        res.redirect('/list'); // Redirect to the register page after successful registration
    } catch (error) {
        console.error('Error registering employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
