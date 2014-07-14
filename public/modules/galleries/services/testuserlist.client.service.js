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
