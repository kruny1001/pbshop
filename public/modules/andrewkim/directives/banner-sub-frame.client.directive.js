'use strict';

angular.module('andrewkim').directive('bannerSubFrame', [
	function() {
		return {

			template: '<div></div>',
			restrict: 'EA',
			link: function postLink(scope, element, attrs) {
				// Banner sub frame directive logic
				// ...

				element.text('this is the bannerSubFrame directive');
			}
		};
	}
]);