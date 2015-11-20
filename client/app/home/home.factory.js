
// (function() {
//   'use strict';

//   angular.module('app')
//   .factory('homeFactory', homeFactory);

//   homeFactory.$inject = ['$http'];

//   function homeFactory($http) {
//     var services = {

//       getMeals : getMeals,
//       getEvent : getEvent

//     };

//     return services;

//     function getEvent (mealID) {
//       return $http({
//       method: 'GET',
//       //hard coded in number(id as the meal id) for the minute need to work out how to get this id
//       //number to be kept with the info displayed on the events page
//       //so that when it is clicked on to show the whole event you know what event to query from the db
//       //this also wants mocking to the meal view
//       url: '/api/in/meals/' + mealID
//       })
//       .then(function (response) {
//         return response.data;
//       });
//     }

//     function getMeals () {
//       return $http({
//       method: 'GET',
//       url: '/api/in/meals'
//       })
//       .then(function (response) {
//         return response.data;
//       });
//     }


//   }

// })();


(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactoryTest', homeFactoryTest);

  homeFactoryTest.$inject = ['$http'];

  function homeFactoryTest($http) {
    var services = {

      getMeals : getMeals,
      getEvent : getEvent

    };

    return services;

    function getEvent (mealID) {
      return $http({
        method: 'GET',
        url: '/api/in/meals/' + mealID,
      })
      .then(function (response) {
        return response.data;
      });
    }

    function getMeals () {
      return $http({
        method: 'GET',
        url: '/api/in/meals'
      })
      .then(function (response) {
        return data;
      });
    }


  }

})();
var numCards = 4;

var data = [];

for(var i = 0; i < numCards; i++) {
  data.push({
    address: [
      "360 Jessie St",
      "Union Square",
      "San Francisco, CA 94103",
    ],
    date: "November 21, 2015",
    description: "Best meal",
    host: "undefined undefined",
    id: i,
    time: "12:00:00 am",
    title: "Foodbruh",
  });
}
