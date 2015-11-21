(function () {
  'use strict';

  angular.module('app')
  .factory('userFactory', userFactory);

  // injecting in $http
  userFactory.$inject = ['$http', '$location'];
  // you must do the same below
  function userFactory($http, $location) {
    var services = {
      getUserInfo: getUserInfo
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
      // });

      //dummy data:
      cb( { name: 'Kyle Cho',
                  job: "Software Engineer",
                  hostrating: "4.5",
                  userrating: "5",
                  hobbies: "Giving pro tips.",
                  favorite_eatery: 'Sarku @ The Westfield',
                  aspirations: "President of 'murica"
                });
    }
  }

})();
