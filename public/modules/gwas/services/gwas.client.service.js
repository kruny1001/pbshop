/**
 * Created by KevinSo on 8/27/2014.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('gwas').factory('Gwas', ['$resource',
    function($resource) {
        return $resource('users/all/:userID', {
            userID: '@_id'
        }, {
            update: {
                method: 'GET'
            }
        });
    }
]);
