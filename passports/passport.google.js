require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://fe-api-oauth.vercel.app/auth/google/callback",
        passReqToCallback: true,
        scope: ["profile", "email"],
    },
    function(request, accessToken, refreshToken, profile, cb) {
        const dataSave = {
            email: profile?.emails[0].value,
            name: profile?.displayName,
            thumbnail: profile?._json?.picture,
        };
    
        return cb(null, dataSave);
    }
)