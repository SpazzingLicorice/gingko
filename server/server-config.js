/*************************************
            DEPENDENCIES
**************************************/
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var path = require('path');
var passport = require('passport');
var facebookStrategy = require('./services/passportStrategies');

/*************************************
            EXPRESS APP
**************************************/
var app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/../client')));

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
