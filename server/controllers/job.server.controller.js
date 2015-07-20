var nodemailer = require('nodemailer'),
    secrets       = require('../../config/secrets'),
    slug          = require('slug'),
    Job           = require('../models/job.server.model');

module.exports = {

  create: function(req, res, next){
    var jobs            = new Job();
    jobs.title          = req.body.title;
    jobs.description    = req.body.description;
    jobs.company        = req.body.company;
    jobs.save( function(err, jobs){
      if(err) {
        next(err);
      } else {
        return res.status(200).json({ success: true, message: "Job submitted successfully.Review will take place within 24hrs" });
      }
    });
  },

  getAllJobs: function( req, res){
    Job.find({ approval_status: true }, function(err, jobs) {
      return res.status(200).json(jobs);
    });
  }
};