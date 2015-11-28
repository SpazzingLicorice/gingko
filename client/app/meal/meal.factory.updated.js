(function() {
	'use strict';

	angular.module('app')
	.factory('MealFactory', MealFactory);

  MealFactory.$inject = ['$http'];

	function MealFactory($http) {
    var services = {
      getMeal: getMeal,
    };

    return services;

    function getMeal(cb) {
      var path = '/'
      .then(function success(response) {
      	cb(response.data);
      }).catch(function error(response) {
      	console.log('Unable to retrieve movies');
      	cb([]);
      });
    }
	}

})();
