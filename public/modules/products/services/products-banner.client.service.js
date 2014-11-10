/**
 * Created by KevinSo on 9/24/2014.
 */

'use strict';

//Products service used to communicate Products REST endpoints
angular.module('products').factory('ProductsBanner', ['$resource', function($resource) {
    return $resource('products/list/:bannerId', {
        bannerId: '@bannerId'
    }, {
        update: {
            method: 'PUT'
        },
        query: {
            method: 'GET',
            isArray: true
        }
    });
}]);

angular.module('products').factory('ProductByUserId', ['$resource', function($resource) {
    return $resource('products/find/:userId', {
        userId: '@userId'
    }, {
        update: {
            method: 'PUT'
        },
        query: {
            method: 'GET',
            isArray: true
        }
    });
}]);