var express = require('express');
var requestHandler = require('./../utils/requestHandler');

module.exports = function(dbController, passport, isLoggedIn) {
  var router = express.Router();
  
  // Get all meals
  router.get('/', function(req, res) {
    requestHandler.getMeals()
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.error(err);
        res.status(404).send(err);
      });
  });

  // Get a meal by its id
  router.get('/:id', function(req, res) {
    var meal_id = req.params.id;

    requestHandler.getMeal(meal_id)
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.error(err);
        res.status(404).send(err);
      });
  });

  // Add a new meal to the DB
  router.post('/', function(req, res) {
    var meal = req.body;

    requestHandler.addMeal(meal)
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.error(err);
        res.status(404).send(err);
      });
  });

  // TODO
  // router.post('/join', function(req, res) {
  //   var user = req.body;

  //   requestHandler.joinMeal(user)
  //     .then(function(data) {
  //       res.status(200).send(data);
  //     })
  //     .catch(function(err) {
  //       console.error(err);
  //       res.status(404).send(err);
  //     });
  // });

  return router;

};
