var User        = require('./controllers/user.server.controller'),
    Contact     = require('./controllers/contact.server.controller'),
    Newsletter  = require('./controllers/newsletter.server.controller'),
    jwt         = require('jsonwebtoken'),
    secrets     = require('../config/secrets'),
    verifyToken = require('../config/tokenMiddleware'),
    passport    = require('passport');

module.exports = function(app) {

  app.get('/api', verifyToken,     User.welcome);

  app.post('/api/login',    User.authenticateUserByEmail);
  app.post('/api/register', User.registerUser);

  app.get('/api/users',            User.getAllUsers);
  app.get('/api/user/:user_id',    User.getEachUserDetails);
  app.get('/api/users/:username',   User.getEachUserByUsername);
  app.put('/api/user/:user_id',    User.updateEachUserDetails);
  app.delete('/api/user/:user_id', User.deleteEachUserDetails);

  app.post('/api/file/upload', User.postPhoto);
  app.post('/api/contact', Contact.sendMessage);
  app.post('/api/newsletter', Newsletter.subscribe);


};
