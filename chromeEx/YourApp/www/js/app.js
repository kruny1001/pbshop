/**
 * Created by KevinSo on 9/26/2014.
 */

'use strict';

//var body = '';
var productEditor = angular.module('productEditor',['ngRoute', 'ngResource', 'ui.bootstrap',
        'gDriveApp', 'keyBoardModule', 'ngAnimate', 'product.services', 'payment','ilbeReview']);

productEditor.config( [
    '$compileProvider', '$httpProvider','$routeProvider',
    function( $compileProvider, $httpProvider, $routeProvider)
    {
        var oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist();
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
        //$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push(interceptor);

        $routeProvider
            .when('/', {
                templateUrl: 'views/product_editor/product_home.html'
            })
            .when('/products/:id', {
                templateUrl: 'views/product_editor/product_list.html'
                //controller: 'ProductListCtrl'
            })
            .when('/detail/:productId/:id', {
                templateUrl: 'views/product_editor/product_detail.html'
            })
            .when('/setting', {
                templateUrl: 'views/product_editor/product_setting.html'
                //controller: 'settingCtrl'
            })
            .when('/editor', {
                templateUrl: 'views/product_editor/product_editor.html'
                //controller: 'productEditorCtrl'
            })
            .when('/login', {
                templateUrl: 'views/product_editor/login.html'
                //controller: 'registerFormCtrl'
            })
            .when('/identity', {
                templateUrl: 'views/product_editor/identity.html'
                //controller: 'IdentityCtrl'
            })
            .when('/gdoc', {
                templateUrl: 'views/product_editor/gdrive.html'
                //controller: 'DocsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

//reference
//http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/consuming-restful-apis.html
/*
    Example of $resource
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
*/

productEditor.controller('TabCtrl', function($rootScope, $route, $scope, $location, $window){

    // config setting ----------------------------
    $scope.controllerName = 'TabCtrl';
    // End config setting ------------------------

    $scope.tabs = [
        { title:'마켓', url:'/', class:true },
        { title:'카테고리', url:'/editor'},
        //{ title:'세팅', url:'/setting'},
        //{ title:'리뷰', url:'/review'},
        //{ title:'Settings', url:'/champ/1234', content:'Dynamic content 2'},
        { title:'로그인', url:'/login'},
        { title:'Identity', url:'/identity', content:'Dynamic content 2'},
        { title:'GDrive', url:'/gdoc', content:'Dynamic content 2'}
        //{ title:'Identity', url:'/identity', content:'Dynamic content 2'}
        /* TODO: experimental Implementation
        { title:'Identity', url:'/identity', content:'Dynamic content 2'},
        { title:'GDrive', url:'/gdoc', content:'Dynamic content 2'}
        */
    ];
    $scope.history =[];

    $scope.directToUrl = function(target){
        $location.path(target.tab.url);
    }

    $rootScope.$on("$routeChangeSuccess",
        function (event, current, previous, rejection) {
            //console.log($scope, $rootScope, $route, $location);
            $scope.history.push($location.path());
        });

    $scope.backButton = function(){
        var prevPath = $scope.history[$scope.history.length-2];
        $location.path(prevPath);
        //$window.history.back();
    }
    //$location.path('/editor');
});

productEditor.controller('settingCtrl', function($scope){

    // config setting
    $scope.controllerName = 'settingCtrl';
    //

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

// From Home view, click banner
productEditor.controller('ProductListCtrl', function($scope, $http, $routeParams, ProductServiceDetailEntry, ProductServiceDetailListEntry){
    // config setting
    $scope.controllerName = 'ProductListCtrl';
    $scope.products = [];
    $scope.detailProduct = {};
    var entry = ProductServiceDetailEntry.get({id:$routeParams.id}, function(){
        $http.get('http://kevangular.herokuapp.com/' + entry.mainimg, {responseType: 'blob'}).success(function(blob) {
            entry.mainimg = window.URL.createObjectURL(blob);
            $scope.detailProduct = entry;
        })
    });

    // Assign entries
    var entries = ProductServiceDetailListEntry.list({id:$routeParams.id}, function(){
        // this should not be in this moment because of the image need download separately
        //$scope.products = entry;

        angular.forEach(entries, function(value, key){
            $scope.loadImages(value);
        });
    });

    $scope.loadImages = function(product) {
        $http.get('http://kevangular.herokuapp.com/' + product.mainimg, {responseType: 'blob'}).success(function(blob) {
            //console.log('Fetched icon via XHR');
            product.mainimg = window.URL.createObjectURL(blob);
            $scope.products.push(product);
        });
    };

    $scope.visitDetailPage = function() {

    };


});

// Home route(/)
productEditor.controller('mainCtrl', function($scope, $window, ProductServiceEntry){

    //config setting
    $scope.controllerName = 'mainCtrl';

    /*
    //TODO: this is the official implementation
    //call actual API from kevangular.herokuapp.com
    $http.get('http://kevangular.herokuapp.com/banners', {responseType: 'json'}).success(function(result) {
        $scope.products = result;
    });
    */

    // query for app of product records
    var entries = ProductServiceEntry.query(function(){
        $scope.products = entries;
    });

    // Test query by ID ---------------------------------------
    /*
    test for query by ID
    $scope.id = '543605bc5a70b30800277c6e';
    var entry = ProductServiceEntry.get({id:$scope.id}, function(){
    });
    */
    // END Test Query by ID  ----------------------

    $scope.active = false;
    $scope.closeWindow = function(){
        $window.close();
    }

    // Test alarm --------------------------
    /*
    $scope.alarmTest = function (){
        chrome.alarms.create("My First Alarm",{delayInMinutes:0.25,periodInMinutes:0.125 });
        chrome.alarms.get("My First Alarm",function(alarm){
            console.log("Scheduled Time  "+ alarm.scheduledTime);
            console.log("Alarm Name "+alarm.name);
        });
        chrome.alarms.getAll(function(alarms){
            for(i=0;i<alarms.length;i++){
                console.log("Scheduled Time  "+alarms[0].scheduledTime);
                console.log("Alarm Name "+alarms[0].name);
            }
        });
        chrome.alarms.onAlarm.addListener(function(alarm){
            console.log("Alarm Elapsed Name "+alarm.name);
            console.log("This is Over");
            //chrome.alarms.clear("My First Alarm");
            console.log(" Alarms Cleared");

        });
        //chrome.alarms.clear("My First Alarm");
    }

    var options = {
        type: "basic",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "/assets/icons/icon48.png"
    };
    var options2 = {
        type: "list",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "/assets/icons/icon48.png",
        items: [{ title: "Item1", message: "This is item 1."},
            { title: "Item2", message: "This is item 2."},
            { title: "Item3", message: "This is item 3."}]
    }
    var options3 = {
        type: "progress",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "/assets/icons/icon48.png",
        progress: 72
    }



    function crCallback(notID) {
        console.log("Succesfully created " + notID + " notification");
    }
    chrome.notifications.create("id1", options, crCallback);
    chrome.notifications.create("id2", options2, crCallback);
    chrome.notifications.create("id3", options3, crCallback);
    //chrome.notifications.create("id4", options, crCallback);

    window.onload=$scope.alarmTest;
    */
    // END Test alarm ----------------------

    // Google Wallet Test --------------------------------------------
    // TODO: This portion of code should be replaced with other method
    $scope.runDemoButton = function() {
        google.payments.inapp.buy({
            parameters: {},
            jwt: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwODI0MzM2MjAwNzE3N" +
                "DcwMDQ2NiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
                "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxNDEyOTQ3M" +
                "zI3LCJleHAiOjE0MTMwMzM3MjcsInJlcXVlc3QiOnsiY3VycmV" +
                "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIxMy4wMCIsIm5hbWUiO" +
                "iJHb2xkIFN0YXIiLCJzZWxsZXJEYXRhIjoic29tZSBvcGFxdWU" +
                "gZGF0YSIsImRlc2NyaXB0aW9uIjoiQSBzaGluaW5nIGJhZGdlI" +
                "G9mIGRpc3RpbmN0aW9uIn19.mUUuyw6dZ0YT1qxKrcMRayE7_8" +
                "D1E4En3u6hQRePmFc",
            success: function() {
                // Send GMS
                window.alert('success')
            },
            failure: function() {
                window.alert('failure')
            }
        })
    };
    // END Google Wallet Test  ---------------------------------------
});

//
productEditor.controller('productEditorCtrl', function($scope, $window, $document, $location, keyboardManager, googleWallet){

    //config setting
    $scope.controllerName = 'productEditorCtrl';

    //test
    googleWallet.validate();

    $scope.brands = [
        {name:'사과게이',author:'abc1',path:''},
        {name:'화덕게이',author:'abc2',path:''},
        {name:'가구게이',author:'abc3',path:''},
        {name:'명이게이',author:'abc4',path:''}
    ];

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
        //console.log('Callback a - 00');
    });
    keyboardManager.bind('a', function() {
        //console.log('Callback a - 01');
    });
    // Bind ctrl+a
    keyboardManager.bind('shift+space', function() {
        //console.log('Callback shift+space');
        yLocation = yLocation + 100;
        var doc = document.documentElement;
        if(yLocation > doc.scrollHeight) yLocation=doc.scrollHeight;
        TweenLite.to($window, 2, {scrollTo:{y: yLocation}, ease: Power2.easeOut});
        //console.log(yLocation);
    });
    // Bind ctrl+shift+d
    keyboardManager.bind('alt+shift', function() {
        //console.log('Callback all+shift');
        yLocation = yLocation - 100;
        var doc = document.documentElement;
        if(yLocation < 0) yLocation=0;
        TweenLite.to($window, 2, {scrollTo:{y: yLocation}, ease: Power2.easeOut});
        //console.log(yLocation);
    });
    // Bind z and disabled input,textarea
    keyboardManager.bind('z', function() {
        //console.log('Callback z');
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
                //console.log('create clicked');
            });
            element2.bind('click', function(){
                //console.log('add clicked');
            });
            element3.bind('click', function(){
                //console.log('run clicked');
            });
        }
    }
});

//
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
