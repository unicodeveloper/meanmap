var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    webshot       = require('webshot'),
    cloudinary    = require('cloudinary'),
    async         = require('async'),
    Project       = require('../models/project.server.model');

module.exports = {
  shareProject: function(req, res){

    async.waterfall([
      function(cb) {
        var projectUrl = req.body.url;
        var url = cloudinary.url( projectUrl,
          { type: "url2png", secure: true, crop: "fill", width: 300, height: 200, gravity: "north", sign_url: true });
        console.log("url ", url);
        cb(null, url);
      },
    ], function (err, result) {
        console.log("New result ", result);
        var project = new Project();
        project.name = req.body.name;
        project.description = req.body.description;
        project.url = req.body.url;
        project.slug = slug( req.body.name );
        project.postedBy = req.body.postedBy;
        project.snapshot = result;
        project.save( function( err, projects){
          if(err) {
            console.log( err );
            if(err.name == 'MongoError' && err.message.indexOf('$name_1') > 0 || err.message.indexOf('$url_1') > 0 ) {
              return res.json({ success: false, message: 'Project is registered already. Please choose another' });
            }
          } else {
            return res.status(200).json({ success: true, message: "Project Shared successfully." });
          }
        });
    });
  },

  getAllProjects: function( req, res, next){
    Project.find({}, function(err, projects) {
      res.status(200).json(projects);
    });
  },

  getEachProjectDetail: function(req, res, next){
    var project = req.params.projectSlug;

    Project.find({ slug: project }, function (err, project) {
      if(err) {
        res.status(404).json({ err: err });
      }

      if(project.length === 0){
        res.json({ success: false, message: 'Project not found.' });
      }
      else if(project.length == 1) {
        var projectDetails = {};
        var project = project[0];
        projectDetails.name           = project.name;
        projectDetails.slug           = project.slug;
        projectDetails.description    = project.description;
        projectDetails.url            = project.url;
        projectDetails.postedBy       = project.postedBy;
        projectDetails.postedOn       = project.registered_on;

        res.json({success: true, project: projectDetails});
      }
      next();
    });
  },

};