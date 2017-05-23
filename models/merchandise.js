var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Merchandise = mongoose.model('Merchandise', new Schema({
  email: {type: String, ref: 'User'},
  itemName: {type: String, required: true},
  description: {type: String, required: true},
  date: {
       type: Date,
       // `Date.now()` returns the current unix timestamp as a number
       default: Date.now
     },
  price: {type: Number, required: true}
}));

module.exports = Merchandise
