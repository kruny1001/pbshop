/**
 * Created by Kevin on 2014-10-30.
 */

'use strict';

angular.module('seller-interface').directive('selectSection', [
    function() {
        return {
            restrict: 'A',
            scope:{
            },
            link: function postLink(scope, element, attrs) {
                var isClicked = false;
                element.bind('mouseenter', function(){
                    TweenLite.to(this, 0.3, {backgroundColor:"rgb(187, 194, 239)"});
                    console.log('mouse enter');
                });
                element.bind('mouseleave', function(){
                    TweenLite.to(this, 0.3, {backgroundColor:"#F5F5F5"});
                    console.log('mouse leave');
                });

            }
        };
    }
]);