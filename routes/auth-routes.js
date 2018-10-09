const express = require('express');
const passport = require('passport')
const router = express.Router();

// All Routes @ auth/

router.get('/login' , (req,res) => {
    res.render('login')
})

router.get('/logout' , (req,res) => {
    res.send("Logging Out")
})

router.get('/google' , passport.authenticate('google',{
    scope: ['profile']
}))

router.get('/google/redirect', (req,res) => {

    res.send("Loggin in with Google - Redirect Page")
})

router.get('/facebook' , (req,res) => {
    res.send("Loggin in with facebook")
})

router.get('/github' , (req,res) => {
    res.send("Loggin in with github")
})



module.exports = router