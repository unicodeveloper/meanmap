var mongoose          = require('mongoose'),
    projectSchema     =  mongoose.Schema({
    name:             { type: String, unique: true},
    description:      { type: String, required: true },
    url:              { type: String, required: true, unique: true },
    postedBy:         { type: String, required: true },
    tags:             { type: Array, required: true, default: [] },
    snapshot:         { type: String, default: ''},
    registered_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema, 'projects');