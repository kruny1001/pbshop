/**
 * Created by KevinSo on 10/6/2014.
 */

'use strict';
productEditor.directive('homeSelectAnni', function () {
    return {
        restrict: 'A',
        scope: {
            type: '@'
        },
        link: function ($scope, element, attrs) {
            TweenLite.set(element, {opacity:0.2});
            element.bind('click', function(){
                TweenLite.to(element, 1, {opacity:0.9});
            });
        }
    }
});
