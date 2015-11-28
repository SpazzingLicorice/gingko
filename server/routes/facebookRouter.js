var express = require('express');
var requestHandler = require('./../utils/requestHandler');

module.exports = function(passport, isLoggedIn) {
  var router = express.Router();

  // Log in with facebook
  router.get('/login', passport.authenticate('facebook', { scope: ['email', 'user_friends'] }));

  // Redirect to home after login success
  router.get('/login/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
    res.redirect('/');
  });

  // Log out of app
  router.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Check if the user is currently logged in
  router.get('/checkuser', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '');
  });

  return router;
};
