var nodemailer = require('nodemailer'),
    secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    Tutorial      = require('../models/tutorial.server.model');

module.exports = {

  create: function(req, res, next){
    var tuts            = new Tutorial();
    tuts.title          = req.body.title;
    tuts.slug           = slug(req.body.title.toLowerCase());
    tuts.content        = req.body.content;
    tuts.postedBy       = req.body.postedBy;
    tuts.save( function(err, tuts){
      if(err) {
        if(err.name == 'MongoError' && err.message.indexOf('$title_1') > 0 || err.message.indexOf('$slug_1') > 0) {
          res.json({ success: false, message: "Tutorial is already registered. Please write another" });
        }else{
          res.json( err);
        }
      } else {
        res.status(200).json({ success: true, message: "Tutorial submitted successfully.Review will take place now" });
      }
    });
  },

  // getAllProjects: function( req, res, next){
  //   Project.find({}, function(err, projects) {
  //     res.status(200).json(projects);
  //   });
  // },

  // deleteEachProject: function(req, res, next){
  //   var projectId   = req.params.id;

  //   Project.remove({_id: projectId}, function (err, project) {
  //     if(err) {
  //       res.status(404).json({success: false, message: 'Project Details Not Found'});
  //     }

  //     res.json({success: true, message: 'Delete Successful'});
  //     next();
  //   });
  // },
};