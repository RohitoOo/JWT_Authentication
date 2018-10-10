const express = require('express');
const passport = require('passport')
const router = express.Router();

// All Routes @ auth/

router.get('/login' , (req,res) => {
    res.render('login')
})

router.get('/logout' , (req,res) => {
    // Logout With Passport 

    req.session = null;
    res.clearCookie('connect.sid');
    res.redirect('/');

})

router.get('/google' , passport.authenticate('google',{
    scope: ['profile']
}), () => {

} )

// passport.authenticate('google') --> Has the Google Code -> Goes Through Serlize and Deserialize Process and Returns 
// the user in the REQ object

router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    // res.render('profile' , {
    //     user : req.user
    // })
    // Add req.user object to Express session 
    req.session.user = req.user;
   res.redirect('/profile/home/')
})

router.get('/facebook' , (req,res) => {
    res.send("Loggin in with facebook")
})

router.get('/github' , (req,res) => {
    res.send("Loggin in with github")
})



module.exports = router