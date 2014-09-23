'use strict';

angular.module('slider-editor').controller('SlidereditorController', ['$scope',
	function($scope) {
        $scope.title = 'Slider Editor';
        $scope.showMe=true;
        $scope.initialWidth = 200;
        $scope.initialHeight = 200;
        //var view = angular.element.find('initial-view');
        //TweenLite.to(view, 1, {height:'100px', width:'100px', backgroundColor:'red'});
		$scope.addSlider = function(){
            angular.element.find
        }
        $scope.deleteSlider = function(targetElement){}
	}
]);