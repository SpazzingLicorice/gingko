
/*****************************************
        FORMAT UTILITY FUNCTIONS
******************************************/

// Note: 'o' represents the formatted object returned by the function.
exports.formatMeal = function(meal) {
  var _meal = {
    title: meal.dataValues.title,
    date: meal.dataValues.date,
    description: meal.dataValues.description,
  };

  var o = {
    meal: _meal,
    restaurant: meal.Restaurant.dataValues,
    host: meal.User.dataValues
  };

  return o;
};

exports.formatMeals = function(meals) {
  var o = meals.map(function(meal) {
    return exports.formatMeal(meal);
  });

  return o;
};

exports.formatRestaurant = function(restaurant) {
  var o = {
    name: restaurant.name,
    contact: restaurant.phone,
    yelpData: restaurant.yelpData
  };

  return o;
};
