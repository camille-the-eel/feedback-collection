const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api', '/api/logout', '/api/current-user', '/auth/google', '/auth/facebook'], { target: 'http://localhost:5000' }));
};
