//IMPORTS
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//OAUTH CONFIG
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

//NO EXPORTS
//Because we do not need to export any code, we just need this file to be read and executed as is
//We will do this by requiring this file in our index.js -- requiring the file will execute it