//LOGIC FOR PROD VS DEV KEYS

//process.env will be set by Heroku -- 
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    //require and export development keys
    module.exports = require('./dev');
}



