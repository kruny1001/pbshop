/**
 * Created by KevinSo on 7/24/2014.
 */
'use strict';

angular.module('galleries').directive('postCard', function() {
    return {
        restrict: 'E',
        replace: true,
        controller: 'TestpolymerController',
        templateUrl: '/modules/galleries/views/post-card.html',
        link: function(scope, controller) {

        }
    };
});