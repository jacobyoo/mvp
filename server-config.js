var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');

var handler = require('./lib/request-handler');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/client/public'));


// prevent CORS errors

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!' });
});

app.use('/blog', router);

router.route('/posts')
  .get(handler.renderPosts)
  .post(handler.createPost);



module.exports = app;
