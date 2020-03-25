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



  // right now the routes below are almost acting as "buttons"... you go to the route...the second arg is executed
  // route can be made up to whatever you want it to be
  // req = incoming request, res = outgoing response

  app.get('/api/logout', (req, res) => {
    // logout() attached automatically from passport -- kills the cookie
    req.logout();
    res.send(req.user); //this would return as empty
  })

  app.get('/api/current-user', (req, res) => {
    //passport automatically attaches .user to req
    res.send(req.user);
  });
};

// req.session is what is stored in the cookie session -- it is the info that we are passing
// try res.send(req.session) to see what it includes

// basically... cookie processed request and populates the session with the data requested to req.session
// then passport access the data that exists on req.session