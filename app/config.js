var mongoose = require('mongoose');

mongoURI = 'mongodb://localhost/mvpblog';
mongoose.connect(mongoURI, { useMongoClient: true, });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodb connection open');
});

module.exports = db;
