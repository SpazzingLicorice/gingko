// TODO: Connect meals to real meals
//       Make rotating meals

(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactoryTest', 'homeFactory', '$state', "$location", "$window", 'locationFactory'];

  function HomeCtrl(homeFactoryTest, homeFactory, $state, $location, $window, locationFactory) {
    var self = this;
    self.geolocation = false;
    // Meal suggestions
    self.tables = {
      near: [],
      soon: [],
      value: []
    };

    self.geolocation = locationFactory.getLocation();

    // Set heights of elements
    var rowHeight = (window.innerHeight - 64)/ 2;
    document.getElementById('hero_container').style.height = rowHeight + "px";
    Array.prototype.slice.call(document.getElementsByClassName('card')).forEach(function(el) {
      el.style.height = rowHeight + "px";
    });


    // Set img src for hero image
    document.getElementById('hero_container').style.backgroundImage = "url('http://losangeleslawyersource.com/wp-content/uploads/2013/08/serious-injuries.jpg')";

    // Set img src for suggestions
    document.getElementById('near').style.backgroundImage = "url('http://blenderartists.org/forum/attachment.php?attachmentid=303132&d=1397678638')";
    document.getElementById('value').style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/en/a/a3/Toronto_Propane_Explosion.jpg')";
    document.getElementById('soon').style.backgroundImage = "url('http://images.wisegeek.com/explosion-of-fire.jpg')";


    self.go = function(e, v) {
      console.log('went');
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
        // self.tables = data;
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
