/**
 * Created by KevinSo on 10/6/2014.
 */
'use strict';

productEditor.directive('mySlideController', ['$swipe',
    function($swipe) {
        return {
            restrict: 'EA',
            link: function(scope, ele, attrs, ctrl) {
                var startX, pointX;
                $swipe.bind(ele, {
                    'start': function(coords) {
                        startX = coords.x;
                        pointX = coords.y;
                    },
                    'move': function(coords) {
                        var delta = coords.x - pointX;

                    },
                    'end': function(coords) {

                    },
                    'cancel': function(coords) {

                    }
                });
            }
        }
    }]);

productEditor.controller("menuCtrl", function($scope){
    $scope.showmenu=false;
    $scope.toggleMenu = function(){
        $scope.showmenu=($scope.showmenu) ? false : true;
    }
});