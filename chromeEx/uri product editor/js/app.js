/**
 * Created by KevinSo on 9/26/2014.
 */

'use strict';
var body = '';
var productEditor = angular.module('productEditor', ['ngRoute', 'ngResource', 'ui.bootstrap', 'gDriveApp']);

productEditor.config( [
    '$compileProvider', '$httpProvider','$routeProvider',
    function( $compileProvider, $httpProvider, $routeProvider)
    {
        //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push(interceptor);

        $routeProvider
            .when('/', {
            templateUrl: 'views/product_editor/product_editor.html',
            controller: 'productEditorCtrl'
            })
            .when('/champ/:id', {
                templateUrl: 'views/product_editor/champ.html',
                controller: 'ChampCtrl',
                controllerAs: 'champ'
            })
            .when('/about', {
                templateUrl: 'views/product_editor/product_about.html',
                controller: 'productEditorCtrl'
            })
            .when('/register', {
                templateUrl: 'views/product_editor/register.html',
                controller: 'registerFormCtrl'
            })
            .when('/identity', {
                templateUrl: 'views/product_editor/identity.html',
                controller: 'IdentityCtrl'
            })
            .when('/gdoc', {
                templateUrl: 'views/product_editor/gdrive.html',
                controller: 'DocsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

//reference
//http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/consuming-restful-apis.html
productEditor.factory('SelectChamp', ['$resource', function($resource) {
    return $resource('http://:url/:action',
        {
            url:'kevangular.herokuapp.com',
            action:'banners'
        },
        {
            'get': { method:'JSONP' }
        });
}]);

productEditor.directive('myChange', function() {
    return function(scope, element) {
        element.bind('click', function() {
            //console.log('click on ',element);
            var list = element[0].parentElement.children
            angular.forEach(list, function(value){
                var allElem = angular.element(value);
                allElem.removeClass('active');
            })
            element.addClass('active');
        });
    };
});

productEditor.controller('TabCtrl', function($scope, $location){

    $scope.tabs = [
        { title:'Home', url:'/', content:'Dynamic content 1' },
        { title:'About', url:'/about', content:'Dynamic content 2'},
        { title:'Settings', url:'/champ/1234', content:'Dynamic content 2'},
        { title:'Register', url:'/register', content:'Dynamic content 2'},
        { title:'Identity', url:'/identity', content:'Dynamic content 2'},
        { title:'GDrive', url:'/gdoc', content:'Dynamic content 2'}
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            alert('You\'ve selected the alert tab!');
        });
    };

    $scope.directToUrl = function(target){
        $location.path(target.tab.url);
    }
});

productEditor.controller('ChampCtrl', function($scope, $http, $routeParams){
    $scope.title = "Loading...";

    $http.get('http://kevangular.herokuapp.com/banners', {responseType: 'json'}).success(function(result) {
        $scope.ads = result;
    });
});

productEditor.controller('mainCtrl', function($scope, $window, $document, $location){
    $scope.closeWindow = function(){
        $window.close();
    }
});
productEditor.controller('productEditorCtrl', function($scope, $window, $document, $location){
    $scope.title='homeView';
    $scope.t = function(location_name){
        $location.path('/'+location_name);
    }
});

productEditor.directive('framesAnni', function(){
    return {
        restrict: 'AE', //E = element, A = attribute, C = class, M = comment
        templateUrl: 'tmpl/frame.html',
        scope: {
            title: '@'
        },
        link: function ($scope, element, attrs) {
            var element1 = element.find('#fCreate');
            var element2 = element.find('#fAdd');
            var element3 = element.find('#fRun');

            element1.bind('click', function(){
                console.log('create clicked');
            });
            element2.bind('click', function(){
                console.log('add clicked');
            });
            element3.bind('click', function(){
                console.log('run clicked');
            });
        }
    }
});

productEditor.directive('smoothButton', function(){
    var linker = function (scope, element, attrs) {
        var path=[{x:0, y:0}, {x:50, y:100}, {x:300, y:20}, {x:400, y:200}, {x:500, y:0}];
        var position = {x:path[0].x, y:path[0].y};
        var tween = TweenMax.to(position, 10, {bezier:path, ease:Linear.easeNone});

        var tl = new TimelineMax({repeat:-1, yoyo:true});
        var body = angular.element.find('h1');
        tl.add(TweenLite.to(element.find('.red'), 0.4, {scaleX:1.8, scaleY:1.8, ease: Power2.easeOut}));
        tl.add(TweenLite.to(element.find('.orange'), 0.4, {scaleX:1.6, scaleY:1.6, ease: Power2.easeOut}), '-=0.2');
        tl.add(TweenLite.to(element.find('.yellow'), 0.4, {scaleX:1.4, scaleY:1.4, ease: Power2.easeOut}), '-=0.2');
        tl.add(TweenLite.to(element, 5, {bezier:{type:'quadratic', values:path}, ease:Linear.easeNone}));
        tl.add(TweenLite.to(body, 6, {colorProps:{setColor:"rgba(77, 10, 10, 0.39)"}, ease:Linear.easeNone}));
        tl.add(TweenLite.to(element, 1, {y:200}, "+=1"));
        tl.add(TweenLite.to(element, 1, {scale:4}, 6));
        tl.stop();
        var dValue = false;

        element.bind('click', function(){
            if(!dValue){tl.play(); dValue = true}
            else{tl.reverse(); dValue = false;}
        });
    };
    return {
        scope: true,
        link: linker,
        template: '<div class="circle red"></div><div class="circle orange"></div><div class="circle yellow"></div><div class="circle grey"></div>'
    }
});
