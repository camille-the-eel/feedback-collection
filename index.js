//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); //must include to enable cookies
const passport = require('passport'); //required here so we can tell passport to use cookies
const keys = require('./config/keys');
//does not need to be assigned to a variable since there is nothing being exported-no info being passed
//but! must be called to be executed
require('./models/User'); //must call models before they are ever used in another file. create first, update next //i.e. if you require passport.js first it will run an error
require('./models/Survey');
require('./services/passportTutorial');

//Connecting to mongoose via our mongo atlas URI declared in our private keys file
mongoose.connect(keys.mongoURI);

//APP DECLARATION
const app = express();

// MIDDLEWARE : small functions that an be used to modify incoming requests to our app before they are sent off to route handlers
app.use(bodyParser.json());

//telling express to use cookies!
app.use(
  cookieSession({
    //config object
    maxAge: 30 * 24 * 60 * 60 * 1000, //in milliseconds >> how long cookie can exist inside the browser before expiring
    keys: [keys.cookieKey], //key being used to encrypt our cookie, so cookie is automatically encrypted when generated
  })
);

//telling pasport to use cookieeeees
app.use(passport.initialize());
app.use(passport.session());

//authRoutes.js is being run through express 'app' -- this is how you can run 'app' methods being used/exported in/from another file
//import is a: function, that is then immediately called with 'app'
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// HEROKU PROD - CLIENT
// order of operations matters here.. app.use will run first, and check for any file that would match the req
// if there is no matching file, it will assume it's a client route to be handled >> app.get will run
if (process.env.NODE_ENV === 'production') {
  // express will serve up prod assets like main.js file
  app.use(express.static('client/build'));

  // express will serve up the index.html file if it doesn't recognize the route
  // kicks it over to our client (for example, routes being handled client side with react router like /surveys)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);
