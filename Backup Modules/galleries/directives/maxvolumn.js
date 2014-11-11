/**
 * Created by KevinSo on 7/31/2014.
 */
'use strict';

angular.module('galleries').directive('mdraggable', function () {

    return {
        restrict: 'A',
        scope: {
            onDragEnd: '&',
            onDrag: '&'
        },

        link: function (scope, element) {
            Draggable.create(element, {
                type: 'rotation',
                //instead of "x,y" or "top,left", we can simply do "rotation" to make the object spinnable!
                // throwProps (ONLY TWEENMAX PREMIUM):
                // enables kinetic-based flicking (continuation of movement, decelerating after releasing the mouse/finger)
                throwProps: true,

                onDrag  : function (){
                    scope.rotation = this.rotation;
                    scope.$apply(function () {
                        scope.onDrag({rotation: scope.rotation});
                    });
                },

                onDragEnd : function (){
                    scope.rotation = this.rotation;
                    scope.$apply(function () {
                        scope.onDragEnd({rotation: scope.rotation});
                    });
                },

                snap:function(endValue) {
                    //this function gets called when the mouse/finger is released
                    // and it plots where rotation should normally end and we can
                    // alter that value and return a new one instead.
                    // This gives us an easy way to apply custom snapping
                    // behavior with any logic we want. In this case,
                    // we'll just make sure the end value snaps to 90-degree
                    // increments but only when the "snap" checkbox is selected.
                    return Math.round(endValue / 45) * 45;
                }

            });
        }

    };

});