angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('amber')
    .warnPalette('yellow');
}]);

// Available palettes:
// red, pink, purple, deep-purple,
// indigo, blue, light-blue, cyan,
// teal, green, light-green, lime,
// yellow, amber, orange, deep-orange, brown,
// grey, blue-grey
