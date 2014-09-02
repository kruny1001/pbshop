/**
 * Created by KevinSo on 8/26/2014.
 */

'use strict';

angular.module('template').directive('fontAnimation', [
    function() {
        return {
            templateUrl: 'modules/template/directives/fontAnimation.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);