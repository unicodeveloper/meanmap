var User        = require('../models/user.server.model'),
    jwt         = require('jsonwebtoken');

module.exports = {
  /**
   * [welcome -- Welcome Notice]
   * @param  req
   * @param  res
   * @return Void
   */
  welcome: function(req, res){
    res.status(200).json({ message: 'Welcome to Mean Map Api'});
  },

  /**
   * [registerUser -- Register User with username, email and password and other information]
   * @param  req
   * @param  res
   * @return Void
   */
  registerUser: function(req, res){
    var user  = new User();
    user.username       = req.body.username;
    user.fullname       = req.body.fullname;
    user.email          = req.body.email;
    user.password       = user.hashPassword(req.body.password);
    user.website        = req.body.website;
    user.github_profile = req.body.github_profile;
    user.address        = req.body.address;

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
   * [getEachUserDetails description]
   * @param   req
   * @param   res
   * @param   next
   * @return  Void
   */
  getEachUserDetails: function(req, res, next){
    var userId = req.params.user_id;

    User.findOne({_id: userId}, function (err, user) {
      if(err) {
        res.status(404).json('User Not Found');
      }

      var userDetails = {};
      userDetails.email           = user.email;
      userDetails.fullname        = user.fullname;
      userDetails.username        = user.username;
      userDetails.user_avatar     = user.user_avatar;
      userDetails.admin           = user.admin;
      userDetails.bio             = user.bio;
      userDetails.hire_status     = user.hire_status;
      userDetails.address         = user.address;
      userDetails.github_profile  = user.github_profile;
      userDetails.website         = user.website;

      res.json({success: true, user: userDetails});
      next();
    });
  },

  /**
   * [updateEachUserDetails Update User Details]
   * @param  req
   * @param  res
   * @param  next
   * @return Void
   */
  updateEachUserDetails: function(req, res, next){
    var userId      = req.params.user_id;
    var userDetails = req.body;

    User.update({_id: userId}, userDetails, function (err) {
      if(err) {
        res.status(404).json({success: false, message: 'User Details Not Found'});
      }

      res.status(200).json({success: true, message: 'Update Successful'});
      next();
    });
  },

  /**
   * [deleteEachUserDetails description]
   * @param  req
   * @param  res
   * @param  next
   * @return Void
   */
  deleteEachUserDetails: function(req, res, next){
    var userId   = req.params.user_id;

    User.remove({_id: userId}, function (err, user) {
      if(err) {
        res.status(404).json({success: false, message: 'User Details Not Found'});
      }

      res.json({success: true, message: 'Delete Successful'});
      next();
    });
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