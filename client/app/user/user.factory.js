(function() {
  'use strict';

  angular.module('app')
    .factory('userFactory', userFactory);

  // injecting in $http
  userFactory.$inject = ['$http', '$location'];
  // you must do the same below
  function userFactory($http, $location) {
    var services = {
      getUserInfo: getUserInfo,
      getFacebookInfo: getFacebookInfo
    };

    return services;

    // getUserInfo();


    function getUserInfo(cb) {
      // var path = '/api/in/users';
      // console.log('Getting users from DB, path is: ', path + $location.path());
      // return $http({
      //   url: path + $location.path(),
      //   method: 'GET'
      // })
      // .then(function(response) {
      //   console.log('Get users data is here, resp.data: ', response.data);
      //   cb(response.data);
      // window.
      // });

      //dummy data:
      cb({
        job: "Software Engineer",
        hostrating: 4.5,
        numhostratings: 57,
        guestrating: 5,
        numguestratings: 23,
        hobbies: "Giving pro tips.",
        favorite_eatery: 'Sarku @ The Westfield',
        aspirations: "President of 'murica"
      });
    }

    // get Facebook data from api/in/user:id, based on the window url
    function getFacebookInfo(cb) {
      var facebookId = window.location.search.slice(1);
      return $http({
          url: '/user/:' + facebookId,
          method: 'GET'
        })
        .then(function(response) {
          console.log('Get users data is here, resp.data: ', response.data);
          cb(response.data);
        });
    }
  }
})();
