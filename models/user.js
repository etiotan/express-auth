var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var Merchandise = require('./merchandise')

var User = mongoose.model('User', new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  date: {
       type: Date,
       // `Date.now()` returns the current unix timestamp as a number
       default: Date.now
     },
  //  item: [{
  //    ref: "Merchandise",
  //    type: String
  //  }]
}));

module.exports = User
