var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  favoris: [ String ]
});

module.exports = mongoose.model('User', userSchema);
