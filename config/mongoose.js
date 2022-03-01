const mongoose = require('mongoose');
const env = require('./environment'); 

mongoose.connect(`mongodb://localhost/${env.db}`);
// mongoose.connect(`mongodb+srv://developerarya17:Ayush17@cluster0.yeh1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: MongoDB'));

db.once('open', function(){
    console.log('Connected to MongoDB');
});


module.exports = db;

