var express = require('express');
var router = express.Router();
var User = require('../models/user')
var session = require('client-sessions')
var bcrypt = require('bcryptjs');
var csrf = require('csurf')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', csrfToken: req.csrfToken() });
});



router.post('/', function(req,res){
  User.findOne({email: req.body.email}, function(err,user){
    if(!user){
      res.render('login',{error: "Invalid Email or Password!"})
    }else{
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user; //set-cookie: session= asdfals123, its gonna hav user email/password
        res.redirect('/dashboard');
      } else{
      res.render('login',{error: "Invalid Email or Password!"})
      }
    }
  })
})

module.exports = router;
