/**
 * Created by KevinSo on 8/6/2014.
 */

'use strict';

angular.module('galleries')
    .directive("hideMe", function($animate) {
        return function(scope, element, attrs) {
            scope.$watch(attrs.hideMe, function(newVal) {
                if (newVal) {
                    $animate.addClass(element, "fade")
                } else {
                    $animate.removeClass(element, "fade")
                }
            })
        }
    })
    .directive('menulist', ['$animate',
        function($animate) {
            return {
                restrict: 'E',
                scope: {
                    'source': '=',
                    'picture':'=',
                    'hideMe':'&'
                },
                templateUrl: '/modules/galleries/directives/menulist/menulist.html',
                link: function(scope, element, attr, ctrl) {
                    scope.$watch(attr.hideMe, function(newVal) {
                        if (newVal) {
                            $animate.addClass(element, "fade")
                        } else {
                            $animate.removeClass(element, "fade")
                        }
                    })
                },
                controller: function($scope, $element){
                    $element.bind('click', function(elem){
                        if($scope.picture===true) {
                            $scope.picture = false;
                        }
                        else {
                            $scope.picture = true;
                        }
                        $scope.$apply();
                    });
                }
            };
        }
    ])
    .animation('.fade', function() {
        return{
            addClass: function(element, className) {
                TweenMax.to(element, 1, {opacity: 0});
            },
            removeClass: function(element, className) {
                TweenMax.to(element, 1, {opacity: 1});
            }

        }
    })