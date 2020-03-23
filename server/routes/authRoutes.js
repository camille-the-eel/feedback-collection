//IMPORTS
const passport = require('passport');

//must export so you can use express 'app' methods as express is not imported/declared in this file
//(this exports as a function)
module.exports = app => {
  //ROUTE HANDLERS TO SEND USER TO PASSPORT GOOGLE OAUTH
  //FIRST REQ -- SCREEN FOR USER TO TELL GOOGLE TO GRANT PERMISSIONS -- RES IS PERMISSION CODE
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //SECOND REQ -- SENT WITH PERMISSION CODE -- RES IS USER INFO (ACCESSED IN OAUTH CONFIG services/passport.js)
  app.get('/auth/google/callback', passport.authenticate('google'));
};
