/**
 * Created by KevinSo on 9/26/2014.
 */

'use strict';
var body = '';
var productEditor = angular.module('productEditor', ['ngRoute', 'ngResource', 'ui.bootstrap', 'gDriveApp', 'keyBoardModule']);

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
            templateUrl: 'views/product_editor/product_home.html'
            })
            .when('/champ/:id', {
                templateUrl: 'views/product_editor/champ.html',
                controller: 'ChampCtrl',
                controllerAs: 'champ'
            })
            .when('/setting', {
                templateUrl: 'views/product_editor/product_setting.html',
                controller: 'settingCtrl'
            })
            .when('/editor', {
                templateUrl: 'views/product_editor/product_editor.html',
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
        { title:'Home', url:'/', content:'Dynamic content 1', class:true },
        { title:'Editor', url:'/editor', content:'Dynamic content 2'},
        { title:'Settings', url:'/setting', content:'Dynamic content 2'},
        //{ title:'Settings', url:'/champ/1234', content:'Dynamic content 2'},
        { title:'Register', url:'/register', content:'Dynamic content 2'}

        /* TODO: experimental Implementation
        { title:'Identity', url:'/identity', content:'Dynamic content 2'},
        { title:'GDrive', url:'/gdoc', content:'Dynamic content 2'}
        */
    ];

    $scope.directToUrl = function(target){
        $location.path(target.tab.url);
    }

    $location.path('/editor');
});

productEditor.controller('settingCtrl', function($scope){
    function isLongEnough (pwd) {
        return pwd.length > 4;
    }

    function hasNumbers (pwd) {
        return /[0-9]/.test(pwd);
    }

    function checkPassword (value) {
        if (!value) return;

        $scope.reqs = [];

        if (!isLongEnough(value)) {
            $scope.reqs.push('Too short');
        }

        if (!hasNumbers(value)) {
            $scope.reqs.push('Must include numbers');
        }

        $scope.showReqs = $scope.reqs.length;
    }

    $scope.onChange = function () {
        checkPassword($scope.user.password);
    }
});

productEditor.controller('ChampCtrl', function($scope, $http, $routeParams){
    $scope.title = "Loading...";

    $http.get('http://kevangular.herokuapp.com/banners', {responseType: 'json'}).success(function(result) {
        $scope.ads = result;
    });
});

productEditor.controller('mainCtrl', function($scope, $window, $http){
    $http.get('http://kevangular.herokuapp.com/banners', {responseType: 'json'}).success(function(result) {
        $scope.products = result;
    });

    $scope.closeWindow = function(){
        $window.close();
    }
});
productEditor.controller('productEditorCtrl', function($scope, $window, $document, $location, keyboardManager){
    $scope.title='homeView';
    $scope.t = function(location_name){
        $location.path('/'+location_name);
    }
    var yLocation = 0;

    $scope.init = function(){
        var title = angular.element('#title');
        TweenLite.from(title, 0.5, {scaleX:0, scaleY:0});
    }

    // Bind two callback on a
    keyboardManager.bind('a', function() {
        console.log('Callback a - 00');
    });
    keyboardManager.bind('a', function() {
        console.log('Callback a - 01');
    });
    // Bind ctrl+a
    keyboardManager.bind('shift+space', function() {
        console.log('Callback shift+space');
        yLocation = yLocation + 100;
        var doc = document.documentElement;
        if(yLocation > doc.scrollHeight) yLocation=doc.scrollHeight;
        TweenLite.to($window, 2, {scrollTo:{y: yLocation}, ease: Power2.easeOut});
        console.log(yLocation);
    });
    // Bind ctrl+shift+d
    keyboardManager.bind('alt+shift', function() {
        console.log('Callback all+shift');
        yLocation = yLocation - 100;
        var doc = document.documentElement;
        if(yLocation < 0) yLocation=0;
        TweenLite.to($window, 2, {scrollTo:{y: yLocation}, ease: Power2.easeOut});
        console.log(yLocation);
    });
    // Bind z and disabled input,textarea
    keyboardManager.bind('z', function() {
        console.log('Callback z');
    }, {
        'inputDisabled': true
    });
});

// Editor for GreenShock slide
productEditor.directive('framesAnni', function(){
    return {
        restrict: 'AE', //E = element, A = attribute, C = class, M = comment
        transclude: true,
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

        var tl = new TimelineLite({});
        var body = angular.element.find('h1');
        tl.add(TweenLite.to(element.find('.red'), 0.4, {scaleX:1.8, scaleY:1.8, ease: Power2.easeOut}));
        tl.add(TweenLite.to(element.find('.orange'), 0.4, {scaleX:1.6, scaleY:1.6, ease: Power2.easeOut}), '-=0.2');
        tl.add(TweenLite.to(element.find('.yellow'), 0.4, {scaleX:1.4, scaleY:1.4, ease: Power2.easeOut}), '-=0.2');
        //tl.add(TweenLite.to(element, 5, {bezier:{type:'quadratic', values:path}, ease:Linear.easeNone}));
        //tl.add(TweenLite.to(body, 6, {colorProps:{setColor:"rgba(77, 10, 10, 0.39)"}, ease:Linear.easeNone}));
        //tl.add(TweenLite.to(element, 1, {y:200}, "+=1"));
        //tl.add(TweenLite.to(element, 1, {scale:4}, 6));
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
