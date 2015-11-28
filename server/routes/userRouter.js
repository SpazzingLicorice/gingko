var express = require('express');
var requestHandler = require('./../utils/requestHandler');

module.exports = function(passport, isLoggedIn) {
  var router = express.Router();

  // GET a user by id
  router.get('/user/:id', isLoggedIn, function(req, res) {
    var facebook_id = req.params.id.slice(1);

    requestHandler.getUser(facebook_id)
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.error(err);
        res.status(404).send(err);
      });
  });

  return router;

};
