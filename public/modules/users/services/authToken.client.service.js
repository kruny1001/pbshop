/**
 * Created by Kevin on 2014-10-22.
 */
'use strict';

angular.module('users').factory('AuthTokenFactory', ['$window',
    function AuthTokenFactory($window){
        var store = $window.localStorage;
        var key = 'auth-token-kev';
        return {
            getToken: getToken,
            setToken: setToken
        };

        function getToken() {
            return store.getItem(key);
        }

        function setToken(token){
            if(token){
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        }
}]);