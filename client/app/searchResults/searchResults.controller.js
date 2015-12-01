(function() {
  'use strict';

  angular.module('app')
  .controller('SearchResultsCtrl', SearchResultsCtrl);

  // if factories are needed, inject here
  SearchResultsCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$http", 'mealsData'];

  function SearchResultsCtrl(multibarFactory, $state, $location, $window, $http, mealsData) {
    var self = this;

    self.meals = mealsData.data.map(function(meal, i) {
      return {
        id: ++i,
        address: meal.restaurant.yelpData.location.display_address.join(', '),
        yelpData: meal.restaurant.yelpData,
        image: function() {
          var imgSmall = meal.restaurant.yelpData.image_url;
          var imgLarge = imgSmall.slice(0, imgSmall.length -6) + 'o.jpg';
          return imgLarge;
        }(),
        hostName: meal.host.username,
        hostPicture: meal.host.profilePicture,
        host_id: meal.host.id
      };
    });

    self.renderStars = function(rating) {
      rating *= 2;
      var emptyStars = 10 - rating;
      var stars = [];
      while(rating > 0) {
        if (rating >= 2) { stars.push('star'); }
        else {
          stars.push('star_half');
          rating--;
          break;
        }
        rating -= 2;
      }
      while(emptyStars > 0) {
        if (emptyStars >= 2) { stars.push('star_border'); }
        emptyStars -= 2;
      }

      return stars;
    };

    self.searchQuery = multibarFactory.getQuery();
  }

})();

