const express = require('express');
const authRoutes = require('./routes/auth-routes')

// Initialize Passport Setup And Strategy

const passportSetup = require('./config/passport-setup')

// Initialize Express Server
const app = express();

// Set View Engine 
app.set('view engine', 'ejs');

// Redirect All /auth routes To This Module 
app.use('/auth', authRoutes)

app.get('/' , (req,res) => {
    res.render('home')
})


const port = 5000;

app.listen(port, () => {
    console.log("We are live on Port: "+ port)
})