var db = require('./../services/db');
var utils = require('./formatHandler');

/****************************************
              MEAL ROUTES
*****************************************/

// GET to /meals
exports.getMeal = function(meal_id) {
  return db.Meals.find({
      where: {id: meal_id},
      include: [db.Users, db.Restaurants]
    })
    .then(function (meal) {
      var o = utils.formatMeal(meal);
      return o;
    });
};

// GET to /meals:id
exports.getMeals = function() {
  return db.Meals.findAll({
      include: [db.Users, db.Restaurants]
    })
    .then(function (meals) {
      var o = utils.formatMeals(meals);
      return o;
    });
};

// POST to /meals
exports.addMeal = function(req) {
  // Must define host outside of promise chain
  // so it can be referenced in 2nd .then statement.
  var host;

  return db.Users.findOrCreate({
      where: {facebookId: req.facebookId}
    })
    .then(function (user) {
      host = user;

      return db.Restaurants.findOrCreate({
          where: {contact: req.restaurant.phone},
          defaults: utils.formatRestaurant(req.restaurant)
      });
    })
    .then(function (restaurant) {
       return db.Meals.create({
         title: req.title,
         date: req.date,
         description: req.description,
         UserId: host[0].dataValues.id,
         RestaurantId: restaurant[0].dataValues.id,
       });
    })
    .then(function(meal) {
      return meal;
    });
};

/****************************************
              USER ROUTES
*****************************************/

// GET TO /user/:id
exports.getUser = function(facebook_id) {
  return database.Users.find({
      where: { facebookId: facebook_id }
    })
    .then(function(user) {
      return user;
    });
};
