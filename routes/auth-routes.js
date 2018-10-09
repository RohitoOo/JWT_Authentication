const express = require('express');

const router = express.Router()

router.get('/login' , (req,res) => {
    res.render('login')
})

router.get('/google' , (req,res) => {

    res.send("Loggin in with Google")

})

router.get('/logout' , (req,res) => {

    res.send("Logging Out")

})

module.exports = router