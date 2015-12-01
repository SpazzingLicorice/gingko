(function() {
  'use strict';

  angular.module('app')
    .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['multibarFactory', '$state', "$location", "$window", "$http", 'mealsData', 'mealFactory'];

  function MealCtrl(multibarFactory, $state, $location, $window, $http, mealsData, mealFactory) {
    var self = this;

    self.joinMeal = function() {
      mealFactory.joinMeal(self.mealId);
    };

    self.activate = function() {
      self.host = mealsData.data.host;
      self.host.gender = _.capitalize(self.host.gender);
      self.meal = mealsData.data.meal;
      self.restaurant = mealsData.data.restaurant;
      self.yelpData = mealsData.data.restaurant.yelpData;
      self.mealId = mealsData.data.meal.id;
      self.meal.title = self.meal.title.split(" ").map(function(item) {
        return _.capitalize(item);
      }).join(" ");
      self.meal.description = _.capitalize(self.meal.description.replace('"', ''));
      self.attendees = mealsData.data.attendees;
      self.yelpData.image_url = self.yelpData.image_url.slice(0, self.yelpData.image_url.length - 7) + '/o.jpg';

      self.formatTime();
      self.drawMap();
      self.getFriends();
      self.getOtherMeals();

      console.log('self.host =', self.host);
      console.log('self.meal =', self.meal);
      console.log('self.restaurant =', self.restaurant);
      console.log('self.yelpData =', self.yelpData);
      console.log('mealsData =', mealsData);

    };

    self.getOtherMeals = function() {
      mealFactory.getOtherMeals()
        .then(function(otherMealData) {
          self.otherMeals = _.map(otherMealData.data, function(otherMeal, i) {
            return {
              id: ++i,
              title: otherMeal.meal.title.split(" ").map(function(item) {
                return _.capitalize(item);
              }).join(" "),
              address: otherMeal.restaurant.yelpData.location.display_address.join(', '),
              yelpData: otherMeal.restaurant.yelpData,
              image_url: otherMeal.restaurant.yelpData.image_url.slice(0, otherMeal.restaurant.yelpData.image_url.length - 6) + '348s.jpg'
            };
          });
        })
        .catch(function(err) {
          console.log("Error in getting other meal.");
        });
    };

    self.drawMap = function() {
      mealFactory.drawMap(Map, self.yelpData.location.coordinate.latitude, self.yelpData.location.coordinate.longitude);
    };

    self.formatTime = function() {
      self.meal.date = new Date(self.meal.date);
      self.host.updatedAt = new Date(self.host.updatedAt);
      var momentDate = moment(self.meal.date);
      var createdAt = self.host.updatedAt;
      self.meal.formattedCreatedAt = moment(createdAt).format('MMM Do');
      self.meal.relativeCreatedAt = moment(createdAt).fromNow();
      self.meal.relativeTime = moment(momentDate).fromNow();

      self.meal.typeOfMeal = mealFactory.getGreetingTime(momentDate);
    };

    self.getFriends = function() {
      self.host.friendsList = self.host.friends.data.reduce(function(acc, current) {
        return acc.concat([current.name]);
      }, []).join(", ");
    };

    self.joinMeal = function() {
      mealFactory.joinMeal(self.mealId)
        .then(function(data) {
          self.joinedSuccessfully = true;
        })
        .error(function(err) {
          console.log("Error in joining.")
        });
    };


    self.activate();

  }

})();
