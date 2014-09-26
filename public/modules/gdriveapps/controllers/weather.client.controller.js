'use strict';

angular.module('gdriveapps').provider('Weather', function() {
    var apiKey = "";
    this.setApiKey = function(key){
        if(key) this.apiKey = key;
    };
    this.$get = function($q, $http){
        var self = this;
        return {
            getWeatherForecast: function(city) {
                var d = $q.defer();
                $http({
                    method: 'GET',
                    url: self.getUrl("forecast", city),
                    cache: true
                }).success(function(data) {
                    // The wunderground API returns the
                    // object that nests the forecasts inside
                    // the forecast.simpleforecast key
                    d.resolve(data.forecast.simpleforecast);
                }).error(function(err) {
                    d.reject(err);
                });
                return d.promise;
            }
        }
    }
    this.getUrl = function(type, ext){
        return "http://api.wunderground.com/api/"+
            this.apiKey + "/" + type + "/p/" +
            ext + '.json';
    }

}).config(function(WeatherProvider){
    WeatherProvider.setApiKey('963b4eccel134894a');
})

angular.module('gdriveapps').controller('WeatherController', ['$scope','$timeout', 'Weather',
	function($scope, $timeout, Weather) {
        $scope.date={};

		var updateTime = function() {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        }

        updateTime();
        //963b4eccel134894a

        $scope.weather = {}
        Weather.getWeatherForecast("CA/San_Francisco")
            .then(function(data){
                $scope.weather.forecast = data;
            });
	}

]);