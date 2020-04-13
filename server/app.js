'use strict';
var express = require("express"),
    methods = require('methods'),
    config = require('./config'),
    morgan = require('morgan'),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    cors = require('cors'),
    mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000}));
app.use(bodyParser.json({ limit: '50mb', parameterLimit: 100000}));

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser(config.COOKIE.COOKIE_KEY));
app.use(session({secret: config.COOKIE.COOKIE_KEY, resave: true, saveUninitialized: true}));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/activity-join');
  mongoose.set('debug', true);
}

require('./models/User');
require('./models/Activity');
require('./config/passport');
app.use(require('./routes'));

// เช็คถ้ามีปัญหาให้ส่งไปหน้าแสดง Error.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.all('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Request-Headers","*");
  res.header("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Cache-Control', 'private');
  next();
});

var server = app.listen( config.PORT || 3000, function(){
  console.log(`Server started on port ${server.address().port}`);
});

