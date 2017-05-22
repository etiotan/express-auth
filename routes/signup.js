var express = require('express');
var router = express.Router();
var User = require('../models/user')
var bcrypt = require('bcryptjs');
var csrf = require('csurf')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up', csrfToken: req.csrfToken() });
});



router.post('/', function(req,res,next){
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash
  })
  user.save(function(err){
    if(err){
      res.render('signup', { error: "Email Already In Use!"})
    }else{
      console.log("saved")
      res.redirect('/login')
    }
  })

  })

module.exports = router;
