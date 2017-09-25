var db = require('../config');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var postSchema = mongoose.Schema({
  title: {type: String, require: true },
  body: {type: String, require: true },
  date: {type: Date, default: Date.now }
});

var BlogPost = mongoose.model('BlogPost', postSchema);

module.exports = BlogPost;
