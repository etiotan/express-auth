var express = require('express');
var router = express.Router();

var user = require('../controllers/users')

// signup
router.get('/signup',user.signup);
router.post('/signup',user.create);

// Login

router.get('/login', user.loginPage);
router.post('/login', user.login)

//dashboard

router.get('/dashboard', user.dashboard);

router.get('/logout', user.logout);



module.exports = router;
