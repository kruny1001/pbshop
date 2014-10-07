/**
 * Created by KevinSo on 10/6/2014.
 */

'use strict';
productEditor.directive('homeSelectAnni', function ($location, $http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var redirectPath = function(id) {
                scope.$apply(function(){
                    $location.path('/products/'+id);
                });
            }

            element.bind('click', function(){
                // It scare from 0.8 to 1
                var id = element.scope().this.product._id;
                TweenLite.from(element, 0.5, {scale:0.8, ease:Back.easeOut, onComplete:function(){redirectPath(id)}});
            });
        }
    }
});


productEditor.directive('menuItem', function () {
    var controller = function ($scope) {
        $scope.active = false;
    };

    return {
        scope: true,
        controller: controller
    }
});

productEditor.animation('.select-animation', function(){
    return {
        beforeAddClass: function (element, className, done) {
            if (className == 'highlight') {
                TweenLite.to(element, 0.2, {
                    width: '200',
                    color: '#89CD25',
                    borderLeft: '20px solid #89CD25',
                    onComplete: done
                });
            }
            else {
                done();
            }
        },

        beforeRemoveClass: function (element, className, done) {
            if (className == 'highlight') {
                TweenLite.to(element, 0.4, {
                    width: '160',
                    color: '#CCC',
                    borderLeft: '10px solid #333',
                    onComplete: done
                });
            }
            else {
                done();
            }
        }
    };
});

productEditor.directive('expandMenu', function () {
    return {
        restrict: 'A',
        scope: {
            type: '@'
        },
        link: function ($scope, element, attrs) {
            element.bind('mouseenter', function(){
                // It scare from 0.8 to 1
                TweenLite.to(element, 0.8, {opacity:0.4, ease:Back.easeOut}, function(){console.log('Done');});
            });
            element.bind('mouseleave', function(){
                // It scare from 0.8 to 1
                TweenLite.to(element, 0.8, {opacity:1, ease:Back.easeOut}, function(){console.log('Done');});
            });
        }
    }
});

