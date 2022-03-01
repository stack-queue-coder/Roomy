module.exports.home = (req,res)=>{
    var cnt = 127;
    // console.log(cnt);
    return res.render('home',{
        title: 'Roomy | Home',
        total : cnt
    });
}
