(function() {
  'use strict';

  angular.module('app')
  .controller('SearchResultsCtrl', SearchResultsCtrl);

  // if factories are needed, inject here
  SearchResultsCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$http", 'mealsData'];

  function SearchResultsCtrl(multibarFactory, $state, $location, $window, $http, mealsData) {
    var self = this;
    
    self.meals = mealsData.data.map(function(meal) {
      return {
        address: meal.address.join(', '),
        date: meal.date,
        host: meal.host,
        time: meal.time,
        title: meal.title,
        yelpData: JSON.parse(meal.yelpData)
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

