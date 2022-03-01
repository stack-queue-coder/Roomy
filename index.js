const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('./config/environment');
const app = express();

require('./config/view-helpers')(app);

const port = 8880;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

const path = require('path');

console.log(env.name)
if(env.name == 'development'){
    app.use(sassMiddleware({
        // './assets/scss',
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(env.asset_path));   
console.log(env.asset_path);
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'roomy',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/roomy_development'
    },
    function(err) {
        console.log(err || 'connect-mongodb setup ok');
    })
})); 

app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/main.js'));

app.get('*', function(req, res){
    res.status(404).send("Page not found");
});

app.listen(port, (err) => {
    if(err){
        console.log("Error in running the server");
        return;
    }
    console.log("Server is running on port: ", port);
});