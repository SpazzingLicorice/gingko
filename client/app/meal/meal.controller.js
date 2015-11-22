// This controller should handle the unique view of a meal page
// Example: http://localhost.com/#/meal/4 (should show the 4th meal)

(function() {
  'use strict';

  angular.module('app')
    .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['$http', '$location', '$window', 'mealsData', '$stateParams'];

  function MealCtrl($http, $location, $window, Map, mealsData, $stateParams) {

    var self = this;
    self.id = $location.path();
    self.data;
    var map;

    self.activate = function() {
      self.getMeal();
    };

    self.getMeal = function() {
      var path = '/api/in';
      console.log('Getting users from DB, path is: ', path + $location.path());
      return $http({
          method: 'GET',
          url: path + $location.path()
        })
        .then(function(response) {
          console.log(' ******** RESPONSE RETURNED **********');
          console.log('Get users data is here, resp.data: ', response);
          self.data = response.data;

          self.mealsData = response.data.meal;
          self.yelpData = JSON.parse(response.data.meal.yelpData);
          console.log('self.mealsData.meal.yelpData =', JSON.parse(response.data.meal.yelpData));
          console.log(self.data);

          var mapCanvas = document.getElementById('map');
          var myLatLng = {
            lat: self.data.meal.Restaurant.lat,
            lng: self.data.meal.Restaurant.lng
          };
          var mapOptions = {
            center: new google.maps.LatLng(self.data.meal.Restaurant.lat, self.data.meal.Restaurant.lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(mapCanvas, mapOptions);

          var marker = new google.maps.Marker({
            position: myLatLng,
            title: "hello world!"
          });

          marker.setMap(map);


        });
    };

    self.activate();

  }

})();
