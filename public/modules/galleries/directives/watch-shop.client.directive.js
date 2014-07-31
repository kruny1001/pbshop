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
                console.log('pre link function');
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
                console.log(a.items);
            },
            post: function postLink(a,b,c,d) {
                console.log('post link function');
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
            }
            /*
             elem.bind('click', function() {
             scope.color = !scope.color;
             if(scope.color)
             elem.css('background-color', 'rgba(255, 153, 54, 0.52)');
             else
             elem.css('background-color', '#ff3c38');

             scope.$apply();
             });

            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
             */
        }
    };
});

