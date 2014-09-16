/**
 * Created by KevinSo on 9/16/2014.
 */

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('andrewkim').factory('Banners', ['$resource',
    function($resource) {
        return $resource('banners/:bannerId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
