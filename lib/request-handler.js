var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var db = require('../app/config');
var BlogPost = require('../app/models/post');


exports.renderPosts = function(req, res) {
  BlogPost.find({}).sort('-date').exec(function(err, posts) {
    if (err) { res.status(500).send(err); }
    res.status(200).send(posts);
  });
};

exports.createPost = function(req, res) {
  var newPost = new BlogPost ({
    title: req.body.title,
    body: req.body.body
  });
  newPost.save(function(err) {
    if (err) { console.log(err); }
    console.log('saved');
    res.json({ message: 'saved' });
  });
};

exports.editPost = function(req, res) {
  BlogPost.findById(req.params.post_id, function(err, post) {
    if (err) { res.send(err); }
    (req.body.title) ? post.title = req.body.title : null;
    (req.body.body) ? post.body = req.body.body : null;
    post.save(function(err) {
      if (err) { res.send(err); }
      res.json({ message: 'post updated' });
    });
  });
};

exports.deletePost = function(req, res) {
  BlogPost.findById(req.params.post_id).remove().exec(function(err, post) {
    if (err) { res.send(err); }
    res.json({ message: 'post deleted' })
  })
};
