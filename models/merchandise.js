var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var Merchandise = mongoose.model('Merchandise', new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  owner: String,
  email: {
    type: String,
    ref: 'User'
  },
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  }
}));

module.exports = Merchandise
