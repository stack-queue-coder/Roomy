const User = require('../models/user');
const passport = require('passport');
module.exports.profile = function(req, res){
    passport.setAuthenticatedUser(req, res);
    if(req.user.phone == null || req.user.room == null){
        return res.redirect('/users/profile/details/phone');
    }
    User.find({room: req.user.room, block: req.user.block}, (err, users) => {
        if(err){console.log('Error in finding the user in profile');return;}
        // console.log(users);
        return res.render('profile', {
            title: 'Roomy | Profile',
            users: users,
        })
    })
}

module.exports.signUp = function(req, res){
    return res.render('sign-up', {
        title: 'Roomy | Sign Up',
    })
}   

module.exports.logIn = function(req, res){
    return res.render('log-in', {
        title: 'Roomy | Log In',
    })
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    if (!(/@vitstudent.ac.in\s*$/.test(req.body.email))){
        console.log('Invalid email');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('Error in finding the user in signing up');return;}

        if(!user){
            User.create(req.body, (err, user) => {
                if(err){console.log('Error in creating the user in signing up');return;} 
                
                return res.redirect('/users/log-in');
            })
        }
        else{
            console.log('User already exists');
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('Error in finding the user in signing up');return;}
        
        return res.redirect('/users/profile/details/phone');
    })
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}   
