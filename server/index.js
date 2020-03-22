//IMPORTS
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// OAUTH CONFIG
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //ROUTE THE USER IS SENT TO AFTER GOOGLE GRANTS PERMISSION
      // Google's permission code will be sent back on the end of this URL as a query string
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('ACCESS', accessToken);
      console.log('REFRESH', refreshToken);
      console.log('PROFILE: ', profile);
    }
  )
);

//ROUTE HANDLER TO SEND USER TO PASSPORT GOOGLE OAUTH
//FIRST REQ -- SCREEN FOR USER TO GRANT PERMISSIONS -- RES IS PERMISSION CODE
// Passport has internal strategy identifier for 'google', as seen in first arg below
// that's why what you name your config ^ doesn't matter- authenticate() method is where you are actually declaring that you want to use the preset google strategy inside Passport
app.get(
  '/auth/google',
  passport.authenticate('google', {
    //SCOPE is telling Google what user info you want from it
    scope: ['profile', 'email']
  })
);

//ROUTE HANDLER TO SEND USER TO PASSPORT GOOGLE OAUTH CALLBACK
//SECOND REQ -- SENT WITH PERMISSION CODE -- RES IS USER INFO (ACCESSED IN SECOND ARG OF OAUTH CONFIG ^ accessToken, profile, etc)
app.get('/auth/google/callback', passport.authenticate('google'));

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);
