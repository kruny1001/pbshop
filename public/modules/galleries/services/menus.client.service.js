/**
 * Created by KevinSo on 8/11/2014.
 */
'use strict';

//Galleries service used to communicate Galleries REST endpoints
angular.module('galleries').factory('menus', ['$resource',
    function($resource) {
        return $resource('menus/:menuId', { menuId: '@_id'
        }, {
            update: {
                method: 'get'
            }
        });
    }
]);