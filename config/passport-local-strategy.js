const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({email: email}, function(err, user) {
            if(err){
                console.log('Error in finding user ---> passport.js');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid username/password ----> passport');
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, done) {
    // console.log('Inside serializeUser callback', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user ---> passport');
            done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/log-in');
}

passport.checkAuthenticationInverse = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/details/phone');
    }
    return next();
}

passport.setAuthenticatedUser = function(req, res){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
}

module.exports = passport;