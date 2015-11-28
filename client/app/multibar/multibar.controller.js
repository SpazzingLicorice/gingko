(function() {
  'use strict';

  angular.module('app')
  .controller('MultibarCtrl', MultibarCtrl);

  // if factories are needed, inject here
  MultibarCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$mdDialog", 'checkUser'];

  function MultibarCtrl(multibarFactory, $state, $location, $window, $mdDialog, checkUser) {
    
    var self = this;
    self.isLoggedIn = false;

    // If there is a user, continue with controller logic.
    // Otherwise, redirect to the home page.
    // user variable will have all information about Facebook
    // Friends, profile picture, etc.
    var user = checkUser.data;
    console.log('user', user);
    if (user !== '') {
      self.isLoggedIn = true;
    }

    self.searchQuery = '';

    self.routes = {
      'Profile': function() {
        $state.go('user');
      },
      'Logout': function() {
        var origin = $window.location.origin;
        $window.location = origin + '/auth/logout';
      }
    };

    self.accountSettings = ['Profile', 'Logout'];

    self.handleLogin = function() {
      var origin = $window.location.origin;
      $window.location = origin + '/auth/login';
    };

    self.handleOption = function(index) {
      var option = self.accountSettings[index];
      self.routes[option]();
    };

    self.displayLogin = function() {
      return self.isLoggedIn === true ? 'Account' : 'Login';
    };

    self.goToResults = function() {
      multibarFactory.setQuery(self.searchQuery);
      document.getElementById('searchInput').blur();

      if ($state.current.name === 'results') {
        $state.reload();
      } else {
        $state.go('results');
      }
      self.searchQuery = '';
    };
  }
})();

