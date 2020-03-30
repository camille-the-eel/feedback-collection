//IMPORTS
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// access the user model class here:
//using one argument means we are trying to "fetch" from mongoose, two means we are trying to "load" into it (see Line 13 of models/User.js)
const User = mongoose.model('users');

//this first arg is what is passed from the db to passport in .use() found below: second arg of Line 42 or Line 48
passport.serializeUser((user, done) => {
  //user.id is NOT the profile.id, it is the primary key _id that mongo auto-generates upon creation of a new record
  done(null, user.id);
});

//first arg is what you gave to the token/cookie as an identifier, this is the token/cookie giving it back to find the user associated
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//OAUTH GOOGLE CONFIG
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
      // async db query & promise
      // existingUser represents a Model Instance of a user that matched this query
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with profile ID!
          //done() tells passport we are all done with our db part >> first arg is null(indicating there is no error) second arg is the user record
          done(null, existingUser);
        } else {
          // since we don't have a match now we are using the Model Class (table schema) to create a new Model Document (row)....by creating a new model instance >  new User({ googleID: profile.id, otherKey: otherValue })
          // but!! this does not automatically save (persist) to the database >> must call .save() method
          new User({ googleID: profile.id })
            .save() //bc save is async we must use a promise before telling passport we're done
            .then(user => done(null, user)); //this 'user' is the second instance of this User record, we always use the promise return instance (in case other things happen to it on the db side)
        }
      });
    }
  )
);

//OAUTH FACEBOOK CONFIG
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookID: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ facebookID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

//NO EXPORTS
//Because we do not need to export any code, we just need this file to be read and executed as is
//We will do this by requiring this file in our index.js -- requiring the file will execute it


