const db = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

const BlogPost = new Schema({
  title: {type: String, require: true },
  body: {type: String, require: true },
  date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', BlogPost);
