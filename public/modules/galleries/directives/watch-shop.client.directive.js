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
        link: function(scope, elem, attrs) {
            /*
             elem.bind('click', function() {
             scope.color = !scope.color;
             if(scope.color)
             elem.css('background-color', 'rgba(255, 153, 54, 0.52)');
             else
             elem.css('background-color', '#ff3c38');

             scope.$apply();
             });
             */
            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
        }
    };
});

