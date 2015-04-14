// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('iamhereApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('MainCtrl', ['$scope', '$ionicPlatform', '$cordovaSocialSharing', '$cordovaGeolocation',
    function($scope, $ionicPlatform, $cordovaSocialSharing, $cordovaGeolocation) {
        $scope.lat = {
            value: ''
        };
        $scope.long = {
            value: ''
        };
        $ionicPlatform.ready(function() {
            $scope.nativeShare = function() {
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {
                        $scope.lat.value = position.coords.latitude
                        $scope.long.value = position.coords.longitude
                        var msg = "http://maps.google.com/?q=" + $scope.lat.value + "," + $scope.long.value
                        $cordovaSocialSharing
                            .share(msg); // Share via native share sheet
                    }, function(err) {
                        console.log('something happened')
                    });

            };
        });
    }
])
