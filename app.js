const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const mongoose = require('mongoose')
const keys = require("./config/keys")
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path')
// Connect To Mongo Data Base 
mongoose.connect(keys.mongodb.dbURI ,{ useNewUrlParser: true }, () => {
    console.log("We Are Connected To The Cloud - MongoDataBase ")
})



// Initialize Passport Setup And Strategy

const passportSetup = require('./config/passport-setup')

// Initialize Express Server
const app = express();

// Favicon Logo
app.use(express.static(path.join(__dirname, 'public'))); 

// Cookie Session Setup

app.use(cookieSession({
    // 1 day in Milliseconds
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}))

// Initialize Passport 
app.use(passport.initialize());
app.use(passport.session());

// parse application/json
app.use(bodyParser.json())


// Bring in the Model 
const User = require('./models/User')


// Set View Engine 
app.set('view engine', 'ejs');

// Redirect All /auth routes To This Module 
app.use('/auth', authRoutes)

// Redirect All /auth routes To This Module 
app.use('/profile', profileRoutes)


app.get('/' , (req,res) => {
    res.render('home')
})


app.post('/test/:id' , (req,res) => {})

const port = 5000;

app.listen(process.env.PORT || port, () => {
    console.log("We are live on Port: "+ port)
})