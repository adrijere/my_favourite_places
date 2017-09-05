var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  favoris: [ String ]
});

module.exports = mongoose.model('User', userSchema);
