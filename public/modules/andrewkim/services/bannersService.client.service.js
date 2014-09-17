/**
 * Created by KevinSo on 9/16/2014.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('andrewkim').factory('BannersService', ['$resource',
    function($resource) {
        return $resource('/banners', {
            userID: '@_id'
        }, {
            update: {
                method: 'GET'
            }
        });
    }
]);
