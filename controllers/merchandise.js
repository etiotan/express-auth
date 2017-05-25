var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Merchandise = require('../models/merchandise')
var bcrypt = require('bcryptjs');
var csrf = require('csurf')
var shortid = require('shortid')


exports.itemPage = function(req,res,next) {
  Merchandise.find({_id:req.params.id}, function(err, doc) {
    if (err)
      throw err;
    console.log(doc)
    res.render('itemPage', {
      title: 'Listings',
      merchandise: doc
    });
  })
}
