const express = require('express');
const authRoutes = require('./routes/auth-routes')
const mongoose = require('mongoose')
const keys = require("./config/keys")
const bodyParser = require('body-parser')

// Connect To Mongo Data Base 
mongoose.connect(keys.mongodb.dbURI ,{ useNewUrlParser: true }, () => {
    console.log("We Are Connected To The Cloud - MongoDataBase ")
})

// Initialize Passport Setup And Strategy

const passportSetup = require('./config/passport-setup')

// Initialize Express Server
const app = express();


// parse application/json
app.use(bodyParser.json())


// Bring in the Model 
const User = require('./models/User')


// Set View Engine 
app.set('view engine', 'ejs');

// Redirect All /auth routes To This Module 
app.use('/auth', authRoutes)

app.get('/' , (req,res) => {
    res.render('home')
})


app.post('/test/:id' , (req,res) => {})

const port = 5000;

app.listen(port, () => {
    console.log("We are live on Port: "+ port)
})