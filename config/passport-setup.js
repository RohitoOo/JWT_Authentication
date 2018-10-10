const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys")

// Bring in the Model 
const User = require('../models/User')

// Serialize User => Add User to The Cookie 

passport.serializeUser((user,done) => {
   // not user._id => Grab MongoID from Database And Put Inside a Cookie
    done(null, user.id);
})

// Deserialize User => Extract User From Cookie

passport.deserializeUser((id,done) => {
    // not user._id => Use MongodbId to Grab User from Database 
    User.find({id}).then( (user) => {
        done(null, user);
    })
     
 })

passport.use(
    new GoogleStrategy({

        // CLient Id & Client Secret Needed ( Google API Developer - Create Project )
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
        // Passport Call Back function // After The Profile Information Is Received 


        User.findOne({_id : User._id}).then( (currentUser) => {
            if(currentUser){
                // Check If User Already Exists 
                console.log(`${currentUser.username} has been there and done that!`)
                // Pass Existing User To Passport Serialize Function 
                done(null, currentUser)
            }else {

                let newUser = new User();
                newUser.username = profile.displayName;
                newUser.googleid =  profile.id;
                newUser.imageurl =  profile.photos[0].value;
                // Save User To Database -> Returns a Promise
                newUser.save((err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("User Saved To Database")
                    // Pass New User To Passport Serialize Function 
                    done(null, newUser)
                }            
                })
            }
        })
        .catch(err => {
            console.log("We Got An Error Son!" , err)
        })

    })
)