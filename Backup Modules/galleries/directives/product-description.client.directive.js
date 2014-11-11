/*
    History:
        20140716 Create a directive

**/

'use strict';

angular.module('galleries').directive('productDescription', [
	function() {
		return {
            templateUrl: '/modules/galleries/directives/product-description/product-description.html',
			restrict: 'E'
            /*link: function postLink(scope, element, attrs) {
				// Product description directive logic 
				// ...
				element.text('this is the productDescription directive');
			}
			*/
		};
	}
]);