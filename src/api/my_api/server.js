const express = require("express");
const dotenv = require("dotenv").config();
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