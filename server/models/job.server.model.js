var mongoose          = require('mongoose'),
    jobSchema         =  mongoose.Schema({
    title:            { type: String, unique: true },
    description:      { type: String, required: true },
    expired:          { type: Boolean, default: false },
    company:          { type: String, required: true },
    registered_on:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema, 'jobs');