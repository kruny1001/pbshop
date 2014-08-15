'use strict';

angular.module('template').directive('setRowCol', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Set row col directive logic 
				// ...
				
				element.text('this is the setRowCol directive');
			}
		};
	}
]);