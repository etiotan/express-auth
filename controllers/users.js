var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Merchandise = require('../models/merchandise')
var bcrypt = require('bcryptjs');
var csrf = require('csurf')


exports.index = function(req, res, next) {
   if(req.session && req.session.user){
        res.render('loggedin', { title: 'Logged In'});
   }else{
        res.render('index', { title: 'Please Log in First'});
   }
}

exports.listing = function(req, res, next){
  var merchandise = Merchandise.find({},function(err, doc){
    if(err) throw err;
    console.log(doc)
   res.render('listing', { title: 'Listings', merchandise: doc });
  })
}


exports.signupGet = function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken()
  })
}

exports.signupPost = function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash})
  user.save(function(err) {
    if (err) {
      res.render('signup', {error: "Email Already In Use!", csrfToken: req.csrfToken()})
    } else {
      console.log("saved")
      req.session.user = user; //alows me to be redirected to dashboard
      res.redirect('/dashboard')
    }
  })

}

exports.loginGet = function(req, res, next) {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  });
}

exports.loginPost = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!user) {
      res.render('login', {error: "Invalid Email or Password!", csrfToken: req.csrfToken()})
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user; //set-cookie: session= asdfals123, its gonna hav user email/password
        res.redirect('/dashboard');
      } else {
        res.render('login', {error: "Invalid Email or Password!"})
      }
    }
  })
}

exports.dashboardGet = function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({
      email: req.session.user.email
    }, function(err, user) {
      if (!user) {
        res.session.reset()
        res.redirect('/login')
      } else {
        res.locals.user = user
        res.render('dashboard', {user: user, csrfToken: req.csrfToken()});
      }
    })
  }else{
    res.redirect('/login')
  }
}

exports.dashboardPost = function(req, res, next) {
  if (req.session && req.session.user) {
  var merchandise = new Merchandise({email: req.session.user.email, itemName: req.body.itemName, description: req.body.description, price: req.body.price})
  merchandise.save(function(err){
    if(err){
      res.send("Error, please fill everything out")
    }else{
      console.log('listed')
      res.redirect('/')
    }
  })




  }
}

exports.logout = function(req, res) {
  req.session.reset();
  res.redirect('/');
}
