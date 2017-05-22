var express = require('express');
var router = express.Router();
var User = require('../models/user')
var bcrypt = require('bcryptjs');
var csrf = require('csurf')


// signup
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up', csrfToken: req.csrfToken() });
});


router.post('/signup', function(req,res,next){
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
      res.redirect('/u/dashboard')
    }
  })

  })

// Login

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', csrfToken: req.csrfToken() });
  });



  router.post('/login', function(req,res){
    User.findOne({email: req.body.email}, function(err,user){
      if(!user){
        res.render('login',{error: "Invalid Email or Password!"})
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user; //set-cookie: session= asdfals123, its gonna hav user email/password
          res.redirect('/u/dashboard');
        } else{
        res.render('login',{error: "Invalid Email or Password!"})
        }
      }
    })
  })

//dashboard

router.get('/dashboard', function(req, res, next) {
  if(req.session && req.session.user){
    User.findOne({email:req.session.user.email}, function(err,user){
      if(!user){
        req.session.reset()
        res.redirect('/login')
      }else{
        res.locals.user = user;
        res.render('dashboard', { title: req.session.user.email });
      }
    })
  }

});

router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/');
})



module.exports = router;
