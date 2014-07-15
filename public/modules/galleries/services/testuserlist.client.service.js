/**
 * Created by KevinSo on 7/14/2014.
 */
'use strict';

angular.module('galleries').factory('testuserlist', ['$resource',
    function($resource) {
        var fac = {};
        fac.users = ['Kevin', 'CK', 'Jacob'];
        return fac;
    }
]);


//galleries service used for communicating with the articles REST endpoints
angular.module('galleries').factory('Listusers', ['$resource',
    function($resource) {
        return $resource('/galleries', {},
        {
            update: {
                method: 'GET'
            }
        });
    }
]);