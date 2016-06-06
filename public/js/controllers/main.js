angular.module('mirrorController', [])

	.controller('mainController', ['$scope','$http', 'socket', 'moment', function($scope, $http, socket, moment) {

    $scope.weather = {};

    var formatWeatherData = function(weatherData) {
      $scope.weather = weatherData;
      console.log($scope.weather);
    };

		socket.on('topNewsFeedUpdate', function(topNewsFeed) {
      $scope.topNewsFeed = topNewsFeed;
		});

    socket.on('USNewsFeedUpdate', function(USNewsFeed) {
      $scope.USNewsFeed = USNewsFeed;
    });

    socket.on('weatherUpdate', function(weatherData) {
      formatWeatherData(JSON.parse(weatherData));
    });

    // socket.emit('pageLoaded', true);

	}]);