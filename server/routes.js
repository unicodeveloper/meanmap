var User        = require('./controllers/user.server.controller');
var jwt         = require('jsonwebtoken'),
    secrets     = require('../config/secrets'),
    verifyToken = require('../config/tokenMiddleware'),
    passport    = require('passport');

module.exports = function(app) {

  app.get('/api', verifyToken,     User.welcome);

  app.post('/api/login',    User.authenticateUserByEmail);
  app.post('/api/register', User.registerUser);

  app.get('/api/users',            User.getAllUsers);
  app.get('/api/user/:user_id',    User.getEachUserDetails);
  app.put('/api/user/:user_id',    User.updateEachUserDetails);
  app.delete('/api/user/:user_id', User.deleteEachUserDetails);


};
