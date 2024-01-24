const express = require("express");
const dotenv = require("dotenv").config();
const path = require('path'); // Import the 'path' module
const app = express();

const port = process.env.PORT || 5000;

// check with Server Port 
app.listen(port, () =>{
    console.log(`server Runing Port on ${port}`)
})

// How to call to web application
app.get('/init', (req,res) => {
    res.send("Get All Content")
})

// Middleware setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'src', 'views', 'Login', 'index'));
});

// // Set the views directory to the 'src/views' folder
// app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('./Login/index', { user: req.user });
// });

// // Middleware setup
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// // Routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });