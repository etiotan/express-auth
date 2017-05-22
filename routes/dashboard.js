var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
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
