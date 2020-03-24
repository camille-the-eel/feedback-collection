//IMPORTS
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// access the user model class here:
//one argument means we are trying to "fetch" from mongoose, two means we are trying to "load" into it
const User = mongoose.model('users');

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
      // now we are using the Model Class (table schema) to create a new Model Instance (row)  >  new User({ googleID: profile.id, otherKey: otherValue })
      // but!! this does not automatically save (persists) to the database >> must call .save() method
      new User({ googleID: profile.id }).save();
    }
  )
);

//NO EXPORTS
//Because we do not need to export any code, we just need this file to be read and executed as is
//We will do this by requiring this file in our index.js -- requiring the file will execute it
