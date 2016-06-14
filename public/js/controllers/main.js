angular.module('mirrorController', [])

	.controller('mainController', ['$scope','$http', 'socket', 'moment', '$interval', function($scope, $http, socket, moment, $interval) {

    $scope.weather = {};
    $scope.time = {};

    var formatWeatherData = function(weatherData) {
      $scope.weather = weatherData;
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

    $interval(function() {
      $scope.time.time = moment().format(' h:mm a')
      $scope.time.day = moment().format('dddd');
      $scope.time.date = moment().format('MMMM Do');
    }, 1000);

    // socket.emit('pageLoaded', true);

	}]);