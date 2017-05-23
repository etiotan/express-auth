var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
  id: ObjectId,
  User: String,
  Item: String,
  Description: String,
}));

module.exports = Merchandise
