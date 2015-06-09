var User        = require('../models/user.model'),
    jwt         = require('jsonwebtoken');

module.exports = {
  /**
   * [welcome -- Welcome Notice]
   * @param  req
   * @param  res
   * @return Void
   */
  welcome: function(req, res){
    res.status(200).json({ message: 'Welcome to our api shinanengan'});
  },

  /**
   * [registerUser -- Register User with username, email and password]
   * @param  req
   * @param  res
   * @return Void
   */
  registerUser: function(req, res){
    var user  = new User();
    user.username  = req.body.username;
    user.email     = req.body.email;
    user.password  = user.hashPassword(req.body.password);

    user.save( function(err, users){
      if(err) {
        if(err.name == 'MongoError' && err.message.indexOf('$email_1') > 0 ) {
          res.status(400).json({ error: 'Email is already registered. Please choose another' });
        }else if ( err.name == 'MongoError' && err.message.indexOf('$username_1') > 0) {
          res.status(500).json({ error: 'Username is already taken. Please choose another' });
        }
      } else {
        res.status(200).json({ success: true, message: "User Registered successfully" });
      }
    });
  },

  /**
   * [authenticateUserByUsername -- Authenticate User by Username and Password]
   * @param  req
   * @param  res
   * @return Void
   */
  authenticateUserByUsername: function(req, res){
    var user  = new User();
    var token = jwt.sign(user, secrets.sessionSecret, { expiresInMinutes: 1440 });

    User.find({username: req.body.username}, function(err, user) {
      if(err){
        res.status(500).json({ error: 'Server Error'});
      }

      if(user.length === 0){
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if(user.length == 1) {
        var users = new User();
        users.comparePassword(req.body.password, user[0].password, function(err, result){

          if(err){
            res.status(500).json({ error: 'Server Error'});
          }

          if(result){
            res.json({
              success: true,
              message: 'User authenticated successfully',
              token: token
            });
          } else {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          }
      });
    }});
  },

  /**
   * [authenticateUserByEmail -- Authenticate User Email and Password]
   * @param  req
   * @param  res
   * @return Void
   */
  authenticateUserByEmail: function(req, res){
    var user  = new User();
    var token = jwt.sign(user, secrets.sessionSecret, { expiresInMinutes: 1440 });

    User.find({email: req.body.email}, function(err, user) {
      if(err){
        res.status(500).json({ error: 'Server Error'});
      }

      if(user.length === 0){
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if(user.length == 1) {
        var users = new User();
        users.comparePassword(req.body.password, user[0].password, function(err, result){

          if(err){
            res.status(500).json({ error: 'Server Error'});
          }

          if(result){
            res.json({
              success: true,
              message: 'User authenticated successfully',
              token: token
            });
          } else {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          }
      });
    }});
  },

  /**
   * [getAllUsers -- Get All the Users registered on the platform]
   * @param   req
   * @param   res
   * @return  void
   */
  getAllUsers: function(req, res){
     User.find({}, function(err, users) {
        res.json(users);
     });
  }
};