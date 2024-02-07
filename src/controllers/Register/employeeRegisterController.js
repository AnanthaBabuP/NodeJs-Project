// controllers/EmployeeController.js
const express = require('express');
const router = express.Router();
const commonMethod = require('../../Common/CommonMethods');
const commonData = require('../../Common/DataStringStoreage');
const itemService = require('../../services/List/listService');
const employeeService = require('../../services/Register/employeeRegisterService');

// Render the register form
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle form submission
router.post('/register', async (req, res) => {
    try {
        const employeeData = req.body;
        // await employeeService.registerEmployee(employeeData);
        // res.render('/list',{error: "",info:"Regsiter Successfully ..."}); // Redirect to the register page after successful registration
        const currentPage  = parseInt(req.body.page) || 1;
        const pageSize = commonData.commonIntObject.PAGE_COUNT_05; // Number of items per page
        const startIndex = (currentPage  - 1) * pageSize;
        const endIndex = currentPage  * pageSize;

        await employeeService.registerEmployee(employeeData);

        const items = await itemService.getAllItems();

        const totalPages = await commonMethod.calculateTotalPages(items,pageSize);

        const paginatedItems = items.slice(startIndex, endIndex);
        res.render('List/list', { totalPages, currentPage , items: paginatedItems});
        
    } catch (error) {
        console.error('Error registering employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
