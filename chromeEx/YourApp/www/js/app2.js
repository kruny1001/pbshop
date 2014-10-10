/**
 * Created by KevinSo on 10/1/2014.
 */

'use strict';
var interceptor = function ($q, $location) {
    return {
        request: function (config) {
            //console.log(config);
            return config;
        }
    }
};

productEditor.controller('registerFormCtrl', function($scope, $location){
    $scope.content={};
});

productEditor.controller('IdentityCtrl', function($scope, $location){
    $scope.content={};
    console.log('IdentityCtrl Load');
});


productEditor.directive('logIn', function () {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'
        },
        link: function ($scope, element, attrs) {
            element.bind('click', function(){
                console.log('logIn clicked');

                //changeState(STATE_ACQUIRING_AUTHTOKEN);

                // @corecode_begin getAuthToken
                // @description This is the normal flow for authentication/authorization
                // on Google properties. You need to add the oauth2 client_id and scopes
                // to the app manifest. The interactive param indicates if a new window
                // will be opened when the user is not yet authenticated or not.
                // @see http://developer.chrome.com/apps/app_identity.html
                // @see http://developer.chrome.com/apps/identity.html#method-getAuthToken
                chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
                    if (chrome.runtime.lastError) {
                        console.log(chrome.runtime.lastError);
                        //changeState(STATE_START);
                    } else {
                        console.log('Token acquired:'+token+
                            '. See chrome://identity-internals for details.');
                        //changeState(STATE_AUTHTOKEN_ACQUIRED);
                    }
                });

            });

        } //DOM manipulation
    }
});


//
productEditor.directive('myChange', function() {
    return function(scope, element) {
        element.bind('click', function() {
            var list = element[0].parentElement.children
            angular.forEach(list, function(value){
                var allElem = angular.element(value);
                allElem.removeClass('active');
            })
            element.addClass('active');
        });
    };
});

