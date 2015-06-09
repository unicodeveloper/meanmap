var mongoose          = require('mongoose'),
    bcrypt            = require('bcrypt'),
    userSchema        =  mongoose.Schema({
    username:      { type: String, required: true, unique: true},
    fullname:      { type: String, required: true },
    email:         { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    website:       { type: String, default: ''},
    github_profile:{ type: String, default: ''},
    address:       { type: String, required: true, default: ''},
    hire_status:   { type: String, default: 'No'},
    bio:           { type: String, default: ''},
    admin:         { type: Boolean, default: false },
    user_avatar:   { type: String, default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' },
    registered_on: { type: Date, default: Date.now }
});

userSchema.methods.hashPassword = function(userpassword) {
  return bcrypt.hashSync(userpassword, bcrypt.genSaltSync(10), null);
};

userSchema.methods.comparePassword = function(requestPassword, dbpassword, cb) {
  bcrypt.compare(requestPassword, dbpassword, cb);
};

module.exports = mongoose.model('User', userSchema, 'users');