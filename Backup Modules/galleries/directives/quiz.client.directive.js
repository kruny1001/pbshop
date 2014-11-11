/**
 * Created by KevinSo on 7/24/2014.
 */

'use strict';

angular.module('galleries').directive('quiz', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/modules/galleries/directives/quiz/quiz.html',
        link: function(scope, elem, attrs) {

            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
        }
    };
});

