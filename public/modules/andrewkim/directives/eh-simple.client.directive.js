'use strict';

angular.module('andrewkim').directive('ehSimple', [
    function(){
        return function(scope, element) {
            element.addClass("plain");
        };
    }
]);