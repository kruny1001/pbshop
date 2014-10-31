/*
 Directives Talking to Controllers
 https://egghead.io/lessons/angularjs-directives-talking-to-controllers
* */
'use strict';

angular.module('seller-interface').directive('selectImg', [
	function() {
		return {
			restrict: 'A',
			scope:{
				value: '=mySlider',
				index: '@',
				onChangeStatus: '&'
			},
			link: function postLink(scope, element, attrs) {
				var isClicked = false;
				element.bind('click', function(){
					console.log('click');
					if(isClicked){
						TweenLite.to(this, 0.3, {borderColor:"#ffffff"});
						isClicked=false;
						scope.value.selected = false;
						scope.onChangeStatus();
					}
					else{
						TweenLite.to(this, 0.3, {borderColor:"#FF5F49"});
						isClicked=true;
						scope.value.selected = true;
						scope.onChangeStatus();

					}
				});
			}
		};
	}
]);