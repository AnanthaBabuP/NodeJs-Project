// SERVER.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dbService = require('./src/Common/DBConnection');
const authController = require('./src/controllers/Authentication/authController');

const app = express();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Connect to MongoDB
dbService.connect();

// Routes
app.get('/login', (req, res) => {
    res.render('Login/login');
});

app.get('/loginFail', (req, res) => {
    res.render('Fail/fail');
});

app.post('/login', authController.login);

// Middleware to check if user is authenticated
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

// Dashboard route
app.get('/dashboard', requireLogin, (req, res) => {
    const username = req.session.user; // Retrieve username from session
    res.render('Dashboard/dashboard', { username });
});

// Logout route
app.get('/logout', authController.logout);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

