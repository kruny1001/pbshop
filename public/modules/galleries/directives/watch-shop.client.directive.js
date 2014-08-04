/**
 * Created by KevinSo on 7/25/2014.
 */

'use strict';

angular.module('galleries').directive('watchShop', function() {
    return {
        restrict: 'E',
        replace: true,
        controller: 'TestpolymerController',
        templateUrl: '/modules/galleries/directives/watch-shop/watch-shop.html',
        link: {
            pre: function preLink(a,b,c,d) {
                //console.log('pre link function');
            },
            post: function postLink(a,b,c,d) {
                //console.log('post link function');
            }
        }
    };
});

