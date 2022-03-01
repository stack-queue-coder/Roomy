const User = require('../models/user');
const passport = require('passport');
module.exports.phone = function(req, res){
    passport.setAuthenticatedUser(req, res);
    if(req.user.phone == null){
        return res.render('phone', {
            title: 'Roomy | Phone',
        })
    }
    return res.redirect('/users/profile/details/room');
}

module.exports.room = function(req, res){
    passport.setAuthenticatedUser(req, res);
    if(req.user.room == null){
        return res.render('room', {
            title: 'Roomy | Room'
        })
    }
    return res.redirect('/users/profile');
}

module.exports.userDetails = function(req, res, err){
    passport.setAuthenticatedUser(req, res);
    // if(err){
    //     return res.redirect('/users/profile');
    // }
    if(req.user.phone == null || req.user.room == null){
        return res.redirect('/users/profile');
    }
    return res.render('userDetails', {
        title: 'Roomy | Update User'
    })
}

module.exports.updateUser = function(req, res){
    User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        block: req.body.block,
        room: req.body.room_number
    }, (err, user) => {
        if(err) {
            console.log('Error in updating the user details');
            return res.redirect('back');
        }
        else{
            console.log('User details updated successfully');
            return res.redirect('/users/profile');
        }
    })
}

module.exports.updatePhone = function(req, res){
    User.findByIdAndUpdate(req.user._id, {phone: req.body.phone} ,(err, user) => {
        if(err) {
            console.log('Error in updating the user phone');
            return res.redirect('back');
        }
        else{
            console.log('User phone updated successfully');
            return res.redirect('/users/profile/details/room');
        }
    })
}
module.exports.updateRoom = function(req, res){
    User.findByIdAndUpdate(req.user._id, {block: req.body.block, room: req.body.room_number } ,(err, user) => {
        if(err) {
            console.log('Error in updating the user room');
            return res.redirect('back');
        }
        else{
            console.log('User room updated successfully');
            return res.redirect('/users/profile');
        }
    })
}
