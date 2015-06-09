var mongoose          = require('mongoose'),
    bcrypt            = require('bcrypt'),
    userSchema        =  mongoose.Schema({
    username:      { type: String, required: true, unique: true},
    firstname:     { type: String, default: 'First name'},
    lastname:      { type: String, default: 'Last name' },
    email:         { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    admin:         { type: Boolean, default: false },
    user_avatar:   { type: String, default: 'http://prosperotemuyiwa.com' },
    registered_on: { type: Date, default: Date.now }
});

userSchema.methods.hashPassword = function(userpassword) {
  return bcrypt.hashSync(userpassword, bcrypt.genSaltSync(10), null);
};

userSchema.methods.comparePassword = function(requestPassword, dbpassword, cb) {
  bcrypt.compare(requestPassword, dbpassword, cb);
};

module.exports = mongoose.model('User', userSchema, 'users');