var User        = require('./controllers/user.controller');
var jwt         = require('jsonwebtoken'),
    secrets     = require('../config/secrets'),
    verifyToken = require('../config/tokenMiddleware'),
    passport    = require('passport');

module.exports = function(app) {

  app.get('/api', verifyToken, User.welcome);
  app.get('/api/users', verifyToken, User.getAllUsers);

  app.post('/api/login', User.authenticateUser);
  app.post('/api/register', User.registerUser);
};
