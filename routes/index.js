var express = require('express');
var router = express.Router();

var user = require('../controllers/users')


/* GET home page. */
router.get('/', user.index);


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



module.exports = router;
