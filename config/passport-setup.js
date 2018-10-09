const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys")

passport.use(
    new GoogleStrategy({

        // CLient Id & Client Secret Needed ( Google API Developer - Create Project )
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
        // Passport Call Back function // After The Profile Information Is Received 

        // console.log(profile, "Passport CallBack Function Fired!!")
    })
)