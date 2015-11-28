var express = require('express');
var requestHandler = require('./../utils/requestHandler');

module.exports = function(passport, isLoggedIn) {
  var router = express.Router();
  
  // GET all meals
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

  // GET a meal by its id
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

  // POST a new meal to the DB
  router.post('/', isLoggedIn, function(req, res) {
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

  return router;
};
