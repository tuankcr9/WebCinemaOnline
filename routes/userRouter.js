var express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const updateUser = require('../controllers/validators/updateUser');
const loginUser = require('../controllers/validators/loginUser');
const registerUser = require('../controllers/validators/register');
const recoveryUser = require('../controllers/validators/recoveryUser');
var router = express.Router();

//login by FB, GG
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));
      
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    	failureRedirect: '/login'
	}),
	(req, res) => {
		req.session.user = req.user.profile.displayName;
		res.redirect('/');
	}
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    	failureRedirect: '/login'
	}),
	(req, res) => {
		req.session.user = req.user.profile.displayName;
		res.redirect('/');
	}
);

//router khác
router.get('/logout', userController.logout);

router.get('/login', userController.login);

router.get('/register', userController.register);

router.get('/recovery', userController.recovery);

router.post('/login', loginUser, userController.loginUser);

router.post('/register', registerUser, userController.registerUser);

router.post('/recovery', recoveryUser,userController.rePassword);

router.get('/user/:id', userController.homeUser)

router.post('/user/edit', updateUser,userController.editUser)

router.get('/orderedTicket/:id', userController.getOrderedTicket)
module.exports = router;