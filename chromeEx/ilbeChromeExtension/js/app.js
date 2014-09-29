/**
 * Created by KevinSo on 9/26/2014.
 */

/**
 * Created by KevinSo on 9/26/2014.
 */
'use strict';
var body = '';
var IlbeApp = angular.module('ilbeApp', []);

IlbeApp.config( [
    '$compileProvider', '$httpProvider',
    function( $compileProvider, $httpProvider )
    {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        // Angular -1.2.0-rc2 : /^\s*(https?|ftp|file):|data:image\//
        //var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        //newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)+'|filesystem:chrome-extension:'+'|blob:chrome-extension%3A'+currentImgSrcSanitizationWhitelist.toString().slice(-1);
        //console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        //$compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
]);

/*IlbeApp.factory('myXHRService', function($http){
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
*/

IlbeApp.provider('Weather', function(){
    this.$get = function($q, $http) {
        var self = this;
        return {
            getWeatherForecast: function(url) {
                var d = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://www.ilbe.com/'+url+'',
                    cache: true,
                    responseType: 'document'
                }).success(function(data) {
                    d.resolve(data);
                }).error(function(err) {
                    d.reject(err);
                });
                return d.promise;
            }
        }
    }
});

IlbeApp.controller('MainCtrl', function($scope, $timeout, $http, Weather) {
    // Build the date object
    document.querySelector('webview').
        setUserAgentOverride('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30');

    $scope.date = {};
    $scope.boards= [
      {name:"일베", url:"ilbe"},
      {name:"짤방", url:"jjal"},
      {name:"컴게", url:"4393424350"}
    ];
    $scope.myBoard = $scope.boards[0];
    
    $scope.changeValue =function(newValue) {
      console.log(newValue);
      Weather.getWeatherForecast(newValue.url).then(function(data){
        console.log(data);
        $scope.articles = $(data).find('#bbs_ilbe_0').find('li a');
        $scope.articleBody = $(data).find('.contentBody div');
        body = $scope.articleBody[0];
        console.log($scope.articles);
        console.log($scope.articleBody);
        $scope.contentBody = $scope.articleBody[0];
        //webview.src = $scope.contentBody;
    });
    
      
    }
    
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

    Weather.getWeatherForecast($scope.myBoard.url).then(function(data){
        console.log(data);
        $scope.articles = $(data).find('#bbs_ilbe_0').find('li a');
        console.log($scope.articles);
        var webview=document.querySelector("webview");
        webview.addEventListener('mouseover', function() {
          console.log('over');
          webview.executeScript({ code: "document.body.style.visibility = 'visible'" });
          webview.executeScript({ code: "document.body.style.backgroundColor  = 'white'" });
        });
        webview.addEventListener('mouseout', function() {
          console.log('out');
          webview.executeScript({ code: "document.body.style.visibility = 'hidden'" });
          webview.executeScript({ code: "document.body.style.backgroundColor  = '#444" });
        });

    });
});

