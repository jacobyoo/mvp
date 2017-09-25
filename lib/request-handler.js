var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var db = require('../app/config');
var BlogPost = require('../app/models/post');


exports.renderPosts = function(req, res) {
  BlogPost.find({}).exec(function(err, posts) {
    res.status(200).send(posts);
  });
};
