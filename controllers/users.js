var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Merchandise = require('../models/merchandise');
var bcrypt = require('bcryptjs');
var csrf = require('csurf');
var shortid = require('shortid');

exports.index = function(req, res, next) {
  res.locals.index = {notloggedin: "Please Login", loggedin: "Logged in and ready to shop"}; //sends so it can be used in views as index.notloggedin/index.loggedin
  if (req.session && req.session.users) {
    res.render('./userViews/loggedin', {title: res.locals.index.loggedin});
  } else {
    res.render('./publicViews/index', {title: res.locals.index.notloggedin});
  }
};

exports.signupGet = function(req, res, next) {
  res.render('./publicViews/signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken()
  });
};

exports.signupPost = function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash});
  user.save(function(err) {
    if (err) {
      res.render('./publicViews/signup', {
        error: "Email Already In Use!",
        csrfToken: req.csrfToken()
      });
    } else {
      console.log("saved");
      req.session.users = user; //alows me to be redirected to dashboard
      res.redirect('/dashboard');
    }
  });

};

exports.loginGet = function(req, res, next) {
  res.render('./publicViews/login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  });
};

exports.loginPost = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!user) {
      res.render('publicViews/login', {
        error: "Invalid Email or Password!",
        csrfToken: req.csrfToken()
      });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.users = user; //set-cookie: session= asdfals123, its gonna hav user email/password sesion was enabled in the middleware.
        res.redirect('/dashboard');
      } else {
        res.render('publicViews/login', {
          error: "Invalid Email or Password!",
          csrfToken: req.csrfToken()
        });
      }
    }
  });
};

//fills the dashboard
exports.dashboardGet = function(req, res, next) {
  if (req.session && req.session.users) {
    User.findOne({
      email: req.session.users.email
    }, function(err, user) {
      if (!user) {
        res.session.reset();
        res.redirect('/login');
      } else {
        Merchandise.find({
          owner: req.session.users._id
        }, function(err, merc) {
          res.locals.user = user;
          res.render('./userViews/dashboard', {
            user: user,
            merc: merc,
            csrfToken: req.csrfToken()
          });
        });
      }
    });
  } else {
    res.redirect('/login');
  }
};

exports.dashboardPost = function(req, res, next) {
  if (req.session && req.session.users) {
    var merchandise = new Merchandise({owner: req.session.users._id, email: req.session.users.email, itemName: req.body.itemName, description: req.body.description, price: req.body.price});
    merchandise.save(function(err) {
      if (err) {
        res.send("Error, please fill everything out");
      } else {
        res.redirect('/listing/' + merchandise._id);

      }
    });
  }
};

exports.logout = function(req, res) {
  req.session.reset();
  res.redirect('/');
};
