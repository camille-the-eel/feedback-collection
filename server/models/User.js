const mongoose = require('mongoose');
const { Schema } = mongoose; //destructuring, yo

const userSchema = new Schema({
    googleID: String
    //Schemas can be edited at will
});

// CREATING MODEL CLASS -- THIS LOADS INTO MONGOOSE >> SO, WE'LL BE ABLE TO PULL IT DOWN FROM MONGOOSE IN OTHER FILES
// model() tells mongoose we want to create a new model called: users, based on: userSchema
// will not overwrite existing collection, only create new if does not exist
mongoose.model('users', userSchema);
