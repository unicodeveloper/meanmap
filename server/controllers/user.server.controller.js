 var User       = require('../models/user.server.model'),
    jwt         = require('jsonwebtoken'),
    bluebird    = require('bluebird'),
    Q           = require('q'),
    fs          = bluebird.promisifyAll(require('fs')),
    multiparty  = require('multiparty'),
    path        = require('path'),
    uuid        = require('node-uuid'),
    cloudinary  = require('cloudinary'),
    gravatar    = require('gravatar');

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
    var user            = new User();
    var secureImageUrl  = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);
    user.username       = req.body.username;
    user.fullname       = req.body.fullname;
    user.email          = req.body.email;
    user.password       = user.hashPassword(req.body.password);
    user.website        = req.body.website;
    user.github_profile = req.body.github_profile;
    user.address        = req.body.address;
    user.user_avatar    = secureImageUrl;

    user.save( function(err, users){
      if(err) {
        if(err.name == 'MongoError' && err.message.indexOf('$email_1') > 0 ) {
          res.json({ Error: 'Email is already registered. Please choose another' });
        }else if ( err.name == 'MongoError' && err.message.indexOf('$username_1') > 0) {
          res.json({ Error: 'Username is already taken. Please choose another' });
        }
      } else {
        res.status(200).json({ success: true, message: "User Registered successfully. Please, login and be Mean" });
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
      userDetails.twitter_handle  = user.twitter_handle;
      userDetails.registered      = user.registered_on;

      res.json({success: true, user: userDetails});
      next();
    });
  },

  /**
   * [getEachUserByUsername description]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  getEachUserByUsername: function(req, res, next){
    var userReal = req.params.username;

    User.find({username: userReal}, function (err, user) {
      if(err) {
        res.status(404).json({ err: err });
      }

      if(user.length === 0){
        res.json({ success: false, message: 'User not found.' });
      }
      else if(user.length == 1) {
        var userDetails = {};
        userDetails.email           = user[0].email;
        userDetails.fullname        = user[0].fullname;
        userDetails.username        = user[0].username;
        userDetails.user_avatar     = user[0].user_avatar;
        userDetails.admin           = user[0].admin;
        userDetails.bio             = user[0].bio;
        userDetails.hire_status     = user[0].hire_status;
        userDetails.address         = user[0].address;
        userDetails.github_profile  = user[0].github_profile;
        userDetails.website         = user[0].website;
        userDetails.registered      = user[0].registered_on;

        res.json({success: true, user: userDetails});
      }
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
    console.log( req.body);

    User.update({_id: userId}, userDetails, function (err) {
      if(err) {
        res.status(404).json({success: false, message: 'User Details Not Found', err: err});
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
        res.status(500).json({ error: err });
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
              user: user,
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
  },

  /**
   * [postPhoto description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  postPhoto: function(req, res){
    var fileName = '';
    var size = '';
    var tempPath;
    var destPath = '';
    var extension;
    var imageName;
    var destPath = '';
    var inputStream;
    var outputStream;
    var form = new multiparty.Form();

    form.on('error', function(err){
      console.log('Error parsing form: ' + err.stack);
    });
    form.on('part', function(part){
      if(!part.filename){
        return;
      }
      size = part.byteCount;
      fileName = part.filename;
    });
    form.on('file', function(name, file){
      tempPath     = file.path;
      cloudinary.uploader.upload(tempPath, function(result){
        var pixUrl = result.url;
        res.json({ dest: pixUrl });
      });
    });
    form.on('close', function(){
      console.log('Uploaded!!');
    });
    form.parse(req);
  }
};