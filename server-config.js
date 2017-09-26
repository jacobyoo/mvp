var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var handler = require('./lib/request-handler');

var db = require('./app/config');
var BlogPost = require('./app/models/post');
var User = require('./app/models/user');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/client/public'));
app.use(session({
  secret: 'not so secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// prevent CORS errors

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API running' });
});

app.use('/blog', router);

router.route('/login')
  .post(handler.logInUser);

router.route('/logout')
  .get(handler.logOutUser);

router.route('/signup')
  .get(handler.signUpForm)
  .post(handler.signUpUser);

router.route('/posts')
  .get(handler.renderPosts)
  .post(handler.createPost);

router.route('/posts/archive')
  .get(handler.renderArchive)

router.route('/posts/:post_id')
  .put(handler.editPost)
  .delete(handler.deletePost);



module.exports = app;
