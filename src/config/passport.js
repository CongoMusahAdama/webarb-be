//middleware for AUTH02
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();


//handles redirect, token exchange, getting profile info
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {

        //find or create user
        let user = await User.findOne({ googleId: profile.id });

        if (!user){
            user = await User.create({
                googleId: profile.id,
                fullname: profile.displayName,
                email: profile.emails?.[0].value,
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

//serialize : lets decide what minimal info to save. we saving the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//deserialize: rebuilds the full user info later using the user info
passport.deserializeUser(async (id, done )=> {
    const user = await User.findById(id);
    done(null, user);
});