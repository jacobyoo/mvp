var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var db = require('../app/config');
var BlogPost = require('../app/models/post');


exports.renderPosts = function(req, res) {
  BlogPost.find({}).exec(function(err, posts) {
    if (err) { res.status(500).send(err); }
    res.status(200).send(posts);
  });
};

exports.createPost = function(req, res) {
  var newPost = new BlogPost ({
    title: req.body.title,
    body: req.body.body,
  });
  console.log(newPost);
  newPost.save(function(err) {
    if (err) { console.log(err); }
    console.log('saved');
    res.json({ message: 'saved' });
  });
}
