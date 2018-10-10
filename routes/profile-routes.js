const express = require('express');
const passport = require('passport')
const router = express.Router();


// Check if User Exits in the REQ object == If User is logged in 
const authCheck = (req,res,next) => {
    if(!req.session.user){
        // User not logged In
        res.redirect('/auth/login')
    }else{
        // If User Logged In 
        next();       
    }
}

router.get('/home', authCheck, (req,res) => {
    // console.log("User", req.user)
    // console.log("User", req.session.user)
    res.render('profile' , {
        user : req.session.user
    })
    
})

module.exports = router;