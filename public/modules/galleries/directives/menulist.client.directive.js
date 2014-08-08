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
    .directive("expandMe", function($animate){
        return function(scope, element, attrs) {
            scope.$watch(attrs.expandMe, function(newVal) {
                if (newVal) {
                    $animate.addClass(element, "expand")
                } else {
                    $animate.removeClass(element, "expand")
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
                    'picture':'='
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
                    $scope.isExpanded = false;
                    $scope.expandIt = function() {
                        $scope.isExpanded = !$scope.isExpanded;
                    }

                    console.log($element);

                    $element.bind('click', function(elem){
                        if($scope.picture===true) {
                            $scope.picture = false;
                            TweenMax.to(elem, 2, {opacity:0.1});
                        }
                        else {
                            $scope.picture = true;
                            TweenMax.to(elem, 2, {opacity:1});
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
                TweenMax.to(element, 2, {rotationY:"+=180", ease:Linear.easeNone});
                TweenMax.to(element, 1, {opacity: 0});
            },
            removeClass: function(element, className) {
                TweenMax.to(element, 2, {rotationY:"-=180", ease:Linear.easeNone});
                TweenMax.to(element, 1, {opacity: 1});
            }

        }
    })
    .animation('.expand', function() {
        return{
            addClass: function(element, className) {
                TweenMax.to(element, 1, {left:0});
                TweenMax.to(element, 1, {opacity: 1});
            },
            removeClass: function(element, className) {
                TweenMax.to(element, 1, {left:20});

            }

        }
    })