/**
 * Created by KevinSo on 9/26/2014.
 */

/**
 * Created by KevinSo on 9/26/2014.
 */

var IlbeApp = angular.module('ilbeApp', []);

IlbeApp.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        // Angular -1.2.0-rc2 : /^\s*(https?|ftp|file):|data:image\//
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)+'|filesystem:chrome-extension:'+'|blob:chrome-extension%3A'+currentImgSrcSanitizationWhitelist.toString().slice(-1);
        //console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);

        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
]);

IlbeApp.factory('myXHRService', function($http){
    delete $http.defaults.headers.common['X-requested-With'];
    return {
        getData: function(url){
            return $http.jsonp(url).then(
                function(result){
                    return result.data;
                }
            );
        }
    }
});

IlbeApp.provider('Weather', function(){
    this.$get = function($q, $http) {
        var self = this;
        return {
            getWeatherForecast: function() {
                var d = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://www.ilbe.com/jjal/',
                    cache: true
                }).success(function(data) {
                    d.resolve(data);
                }).error(function(err) {
                    d.reject(err);
                });
                return d.promise;
            }
        }
    }
})

IlbeApp.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

IlbeApp.controller('MainCtrl', function($scope, $timeout, $http, Weather, myXHRService) {
    // Build the date object
    $scope.date = {};

    /*
    $http({method: 'GET', url: 'www.google.com', headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}}).success(function(data){
        $scope.article=data;
    });
    */

    /*
     Retrieve.getFirstPageContents('jjal')
     .then(function(data){
     $scope.articles = data;
     });
     */
    // Update function
    var updateTime = function() {
        $scope.date.raw = new Date();
        $timeout(updateTime, 1000);
    }

    // Kick off the update function
    updateTime();

    Weather.getWeatherForecast().then(function(data){
        console.log(data);
        $scope.articles = $(data).find('#bbs_ilbe_0').find('li a');
        console.log($scope.articles);

    });


});
