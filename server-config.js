var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');

var handler = require('./lib/request-handler');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.get('/posts', handler.renderPosts);


module.exports = app;
