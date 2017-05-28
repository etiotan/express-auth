var express = require('express');
var router = express.Router();

var user = require('../controllers/users')
var merchandise = require('../controllers/merchandise')

/* GET home page. */

router.get('/', user.index);

//listings

router.get('/listing',merchandise.listing);
router.get('/listing/:id', merchandise.itemPage)

// signup

router.get('/signup',user.signupGet);
router.post('/signup',user.signupPost);

// Login

router.get('/login', user.loginGet);
router.post('/login', user.loginPost)

//dashboard

router.get('/dashboard', user.dashboardGet);
router.post('/dashboard', user.dashboardPost);
router.get('/logout', user.logout);

//del listing

router.post('/delete/:id', merchandise.deleteListing) //get because we are getting the URL
router.post('/update/:id', merchandise.updateListing)

module.exports = router;
