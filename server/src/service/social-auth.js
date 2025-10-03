const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { googleClientId, googleClientSecret, googleCallbackUrl } = require('../constants');


// Google
passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackUrl,
}, 
async (accessToken, refreshToken, profile, done) => {
    try 
    {
        // Extract properties
        const gid = profile?.id;
        const name = `${profile?.name?.givenName} ${profile?.name?.familyName}`;
        const email = profile?.emails?.[0]?.value;
        const username = email;

        // If user already exist in database
        const existingUser = await User.findOne({ $or:[{ gid: profile.id }, { email:email }] });
        if(existingUser) return done(null, existingUser);
    
        // Create new user
        const createUser = await User.create({
            gid:gid,
            name: name,
            email: email,
            username: username,
            role:"User",
            status:"Approved",
            password:null
        });
        return done(null, createUser);
    } 
    catch(error) 
    {
        return done(error, null);
    }
}));