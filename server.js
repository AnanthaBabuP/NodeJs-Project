// SERVER.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const dbService = require('./src/Common/DBConnection');
const authController = require('./src/controllers/Authentication/authController');
const DataString = require('./src/Common/DataStringStoreage');
const itemController = require('./src/controllers/List/listController');
const register = require('./src/controllers/Register/employeeRegisterController');
const listEditDelete = require('./src/controllers/List/updateDeleteController');


const app = express();

// Set up static files directory
app.use(express.static('src'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Middleware to check if user is authenticated
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Connect to MongoDB
dbService.connect();

// Routes
// Home screen
app.get('/', (req, res) => {
    res.render('Component/home');
});

app.get('/about', (req, res) => {
    res.render('Component/about');
});

app.get('/contact', (req, res) => {
    res.render('Component/contact');
});

// Login Screen
app.get('/login', (req, res) => {
    res.render('Login/login', { message: DataString.commonStringObject.EmptyString });
});

app.get('/loginFail', (req, res) => {
    res.render('Login/login', { message: DataString.commonStringObject.InvalidLogin});
});

// Routes
app.get('/list', itemController.getList);

// Routes
app.post('/list', itemController.getList);

app.post('/login', authController.login);

// Register route
// Handle form submission for register route
app.post('/register', register);

// Render the register form
app.get('/register', (req, res) => {
    res.render('Register/employeeRegister');
});

// Add routes for editing and deleting items
app.get('/edit/:id', listEditDelete.getEdit);

app.post('/delete', listEditDelete.employeeDataDelete);


// Dashboard route
app.get('/dashboard', requireLogin, (req, res) => {
    const username = req.session.user; // Retrieve username from session
    res.render('Dashboard/dashboard', { username });
});

// Logout route
app.get('/logout', authController.logout);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} port `);
    
});

