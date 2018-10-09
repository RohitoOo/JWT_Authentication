const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys")

passport.use(
    new GoogleStrategy({

        // CLient Id & Client Secret Needed ( Google API Developer - Create Project )
   
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }),
    () => {
        // Passport Call Back function
    }
)