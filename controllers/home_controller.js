const User = require('../models/user');

module.exports.home = (req,res)=>{
    User.count({}, function( err, count){
        if (err) throw err;
//         console.log( "Number of users:", count );
        res.locals.cnt = count;
        return res.render('home',{
            title: 'Roomy | Home',
        });
    });
}
