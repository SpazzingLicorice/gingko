(function() {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('app')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {

    var checkUser = function($http) {
      return $http({method: 'GET', url: '/auth/checkuser'});
    };

    $urlRouterProvider.otherwise('home');

    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'multibar': {
            templateUrl: 'app/multibar/multibar.html',
            controller: 'MultibarCtrl',
            controllerAs: 'multibar'
          },
          '@': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home',
          }
        },
        resolve: {
          checkUser: ['$http', checkUser]
        }
      })
      .state('search', {
        url: '/search',
        views: {
          'multibar': {
            templateUrl: 'app/multibar/multibar.html',
            controller: 'MultibarCtrl',
            controllerAs: 'multibar'
          },
          '@': {
            templateUrl: 'app/search/search.html',
            controller: 'SearchCtrl',
            controllerAs: 'vm',
          }
        },
        resolve: {
          checkUser: ['$http', checkUser]
        }
      })
      // TODO: perhaps use URL params '/:username' to grab account details
      .state('user', {
        url: '/user',
        views: {
          'multibar': {
            templateUrl: 'app/multibar/multibar.html',
            controller: 'MultibarCtrl',
            controllerAs: 'multibar'
          },
          '@': {
            templateUrl: 'app/user/user.html',
            controller: 'UserCtrl',
            controllerAs: 'user',
          }
        },
        resolve: {
          checkUser: ['$http', checkUser]
        }
      })
      // When you're linked to a unique id in a meal, we render the page
      .state('meal', {
        url: '/meals/:id',
        views: {
          'multibar': {
            templateUrl: 'app/multibar/multibar.html',
            controller: 'MultibarCtrl',
            controllerAs: 'multibar'
          },
          '@': {
            templateUrl: 'app/meal/meal.html',
            controller: 'MealCtrl',
            controllerAs: 'meal',
          }
        },
        resolve: {
          checkUser: ['$http', checkUser],
          mealsData: ['$http', '$stateParams', function($http, $stateParams) {
            console.log('$stateParams =', $stateParams);
            // console.log(window.location.href.slice.)
            return $http({method: 'GET', url: '/meals/' + $stateParams.id});
          }]
        }
      })
      .state('results', {
        url: '/results',
        views: {
          'multibar': {
            templateUrl: 'app/multibar/multibar.html',
            controller: 'MultibarCtrl',
            controllerAs: 'multibar'
          },
          '@': {
            templateUrl: 'app/searchResults/searchResults.html',
            controller: 'SearchResultsCtrl',
            controllerAs: 'results',
          }
        },
        resolve: {
          checkUser: ['$http', checkUser],
          mealsData: function($http) {
            return $http({method: 'GET', url: '/meals'});
          }
        }
      });
      // TODO: remove above semicolon to add more routes
  }

})();
