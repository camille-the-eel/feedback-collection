//IMPORTS
const express = require('express');
//does not need to be assigned to a variable since there is nothing being exported from passport.js--no info being passed
//but! must include so passport.js is executed
require('./services/passport'); 

//APP DECLARATION
const app = express();

//authRoutes.js is being run through express 'app' -- this is how you can run 'app' methods being used/exported in/from another file
//import is a: function, that is then immediately called with 'app'
require('./routes/authRoutes')(app);

//PORT LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT);
