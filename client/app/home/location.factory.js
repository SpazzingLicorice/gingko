(function() {
  'use strict';

  angular.module('app')
  .factory('locationFactory', locationFactory);

  locationFactory.$inject = [];

  function locationFactory() {
    var services = {
      getLocation : getLocation,
      calcDistance: calcDistance
    };

    return services;

    function getLocation() {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(getNearest, handleError);
      }
      else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function getNearest(position) {
      console.log("Latitude: " + position.coords.latitude +
      "\nLongitude: " + position.coords.longitude +
      "\nAccuraccy: " + position.coords.accuracy);

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };
    }

    function calcDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
      var R = 6378.137; // Radius of earth in KM
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d * 1000; // meters
    }

    function handleError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred.";
          break;
      }
    }
  }
})();
