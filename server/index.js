//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//does not need to be assigned to a variable since there is nothing being exported-no info being passed
//but! must be called to be executed
require('./models/User'); //must call models before they are ever used in another file. create first, update next
require('./services/passport'); 

//Connecting to mongoose via our mongo atlas URI declared in our private keys file
mongoose.connect(keys.mongoURI);

//APP DECLARATION
const app = express();

//authRoutes.js is being run through express 'app' -- this is how you can run 'app' methods being used/exported in/from another file
//import is a: function, that is then immediately called with 'app'
require('./routes/authRoutes')(app);

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);
