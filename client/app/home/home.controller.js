(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactoryTest', '$state', "$location", "$window"];

  function HomeCtrl(homeFactoryTest, $state, $location, $window) {
    var self = this;
    self.tables = []; // Collection of meal objects

    self.go = function(e, v) {
      // console.log(e, v);
    };

    // TODO: Get closest, highest rated, and soonest available meals instead of all of them
    self.getData = function() {
      //call the factory function to get all of the meals
      homeFactoryTest.getMeals()
      .then(function(data) {
        /*
        data = {
          address: Array[3]
            0: "360 Jessie St"
            1: "Union Square"
            2: "San Francisco, CA 94103"
          date: "November 21, 2015"
          description: "Best meal"
          host: "undefined undefined"
          time: "12:00:00 am"
          title: "Foodbruh"
        }
        */
        self.tables = data;
      });
    };

    self.viewTable = function() {
      homeFactoryTest.getEvent(mealID)
      .then(function(data) {
        //this badly written function is to manually route to the meal of id one(written in a last minute panic to try and get it working)
        //it would be better to change the viw using ui-sref? in the view and then from
        //that controller call the function to get the correct data from the database!
        $window.location.href = "/#/meals/1";
      });
    };

    // Initialize tables on page load
    self.getData();
  }
})();
