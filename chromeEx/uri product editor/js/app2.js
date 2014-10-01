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

