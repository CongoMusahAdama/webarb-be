//middleware for AUTH02
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';
import FacebookStrategy from 'passport-facebook';

dotenv.config();

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
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

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = await User.create({
        facebookId: profile.id,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Single serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findById(id);
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});
