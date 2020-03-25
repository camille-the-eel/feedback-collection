//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //must include to enable cookies
const passport = require('passport'); //required here so we can tell passport to use cookies
const keys = require('./config/keys');
//does not need to be assigned to a variable since there is nothing being exported-no info being passed
//but! must be called to be executed
require('./models/User'); //must call models before they are ever used in another file. create first, update next //i.e. if you require passport.js first it will run an error
require('./services/passport');

//Connecting to mongoose via our mongo atlas URI declared in our private keys file
mongoose.connect(keys.mongoURI);

//APP DECLARATION
const app = express();

// MIDDLEWARE : small functions that an be used to modify incoming requests to our app before they are sent off to route handlers
//telling express to use cookies!
app.use(
  cookieSession({
    //config object
    maxAge: 30 * 24 * 60 * 60 * 1000, //in milliseconds >> how long cookie can exist inside the browser before expiring
    keys: [keys.cookieKey] //key being used to encrypt our cookie, so cookie is automatically encrypted when generated
  })
);
//telling pasport to use cookieeeees
app.use(passport.initialize());
app.use(passport.session());

//authRoutes.js is being run through express 'app' -- this is how you can run 'app' methods being used/exported in/from another file
//import is a: function, that is then immediately called with 'app'
require('./routes/authRoutes')(app);

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);