var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../app/config');
var BlogPost = require('../app/models/post');
var User = require('../app/models/user');

passport.use(User.createStrategy());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.renderPosts = function(req, res) {
  BlogPost.find({}).sort('-date').limit(10).exec(function(err, posts) {
    if (err) { return res.status(500).send(err); }
    res.status(200).send(posts);
  });
};

exports.renderArchive = function(req, res) {
  BlogPost.find({}).sort('-date').skip(10).exec(function(err, posts) {
    if (err) { return res.status(500).send(err); }
    res.status(200).send(posts);
  });
};

exports.createPost = function(req, res) {
  var newPost = new BlogPost ({
    title: req.body.title,
    body: req.body.body
  });
  newPost.save(function(err) {
    if (err) { return res.send(err); }
    console.log('saved');
    res.json({ message: 'saved' });
  });
};

exports.editPost = function(req, res) {
  BlogPost.findById(req.params.post_id, function(err, post) {
    if (err) { return res.send(err); }
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
    if (err) { return res.send(err); }
    res.json({ message: 'post deleted' })
  })
};

exports.signUpForm = function(req, res) {

};

exports.signUpUser = function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) { return res.send(err); }
    passport.authenticate('local')(req, res, function() {
      res.json({ message: 'signup success' })
    });
  });
};

exports.logInUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  passport.authenticate('local')(req, res, function() {
    res.redirect('/');
  });
};

exports.logOutUser = function(req, res) {
  req.logout();
  res.redirect('/');
};
