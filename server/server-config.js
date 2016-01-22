/*************************************
            DEPENDENCIES
**************************************/
var express = require('express');
var session = require('express-session');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var facebookStrategy = require('./services/passportStrategies');

// Change session secret based on environment
var sessionSecret = process.env.sessionSecret || 'hackreactor';

/*************************************
            EXPRESS APP
**************************************/
var app = express();
app.use(express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json());
app.use(partials());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/*************************************
            PASSPORT AUTH
**************************************/
var isLoggedIn = require('./services/isLoggedIn');
facebookStrategy(passport);

/*************************************
              ROUTES
**************************************/
var mealsRouter = require('./routes/mealsRouter')(passport, isLoggedIn);
var userRouter = require('./routes/userRouter')(passport, isLoggedIn);
var facebookRouter = require('./routes/facebookRouter')(passport, isLoggedIn);
var yelpRouter = require('./routes/yelpRouter')(passport, isLoggedIn);

app.use('/meals', mealsRouter);
app.use('/user', userRouter);
app.use('/yelp', yelpRouter);
app.use('/auth', facebookRouter);


module.exports = app;
