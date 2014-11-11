'use strict';

angular.module('galleries').directive('hoverExpandShrink', [
	function() {
		return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                // Hover expand shrink directive logic
                element.on(
                    'mouseleave', function () {
                        TweenMax.to(element, 0.5, {scale:1, ease:Back.easeOut} )
                    });
                element.on(
                    'mouseenter', function () {
                        //console.log('enter');
                        TweenMax.to(element, 0.5, {scale:1.2, ease:Back.easeOut} )
                    });

            }
        }
	}
]);