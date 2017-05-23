var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = mongoose.model('User', new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  date: {
       type: Date,
       // `Date.now()` returns the current unix timestamp as a number
       default: Date.now
     }
}));

module.exports = User
