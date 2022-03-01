const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile_detailsController = require('../controllers/profile_details_controller');

console.log('router starting --> details');


router.get('/phone',passport.checkAuthentication , profile_detailsController.phone);
router.get('/room',passport.checkAuthentication, profile_detailsController.room);
router.get('/userDetails',passport.checkAuthentication, profile_detailsController.userDetails);

router.post('/updateUser', profile_detailsController.updateUser);
router.post('/updatePhone', profile_detailsController.updatePhone);
router.post('/updateRoom', profile_detailsController.updateRoom);
// router.post('/profile/room', userController.room);


module.exports = router;
