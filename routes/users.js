const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

console.log('router starting --> users');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.use('/profile/details', require('./details'));
router.get('/sign-up', passport.checkAuthenticationInverse, userController.signUp);
router.get('/log-in', passport.checkAuthenticationInverse, userController.logIn)
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate('local', 
    {failureRedirect: '/users/log-in'}
    ), userController.createSession
);
router.get('/logout', userController.destroySession);

module.exports = router;