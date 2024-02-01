// src/controllers/authController.js
const express = require('express');
const router = express.Router();

// GET login page
router.get('/', (req, res) => {
    res.render('login');
});

// POST login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Add authentication logic here (e.g., validate credentials)
    // For simplicity, we're skipping actual authentication
    // Array of username and password pairs
     var users = [
        { username: 'admin', password: 'admin@123' },
        { username: 'user', password: 'user@123' },
        { username: 'extence', password: 'extence@123' }
    ];

     // Check if the input username and password match any user in the array
    var isValidUser = users.some(function(user) {
        return user.username === username && user.password === password;
    });
    if (isValidUser) {
        // Valid credentials, allow form submission
        res.redirect('/dashboard');
    } else {
        // Invalid credentials, show alert
        res.redirect('/loginFail');
        // res.send('Invalid username or password.');
    }
    // res.send(`Welcome, ${username}!`);
});

// GET dashboard page
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard view
});

// GET LoginFail page
router.get('/loginFail', (req, res) => {
    res.render('Fail/fail'); // Render the dashboard view
});


module.exports = router;
