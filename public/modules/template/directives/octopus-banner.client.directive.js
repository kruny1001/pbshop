'use strict';

angular.module('template').directive('octopusBanner', [
	function() {
		return {
			templateUrl: 'modules/template/tmpl/octopusBanner.tmpl.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Octopus banner directive logic
				// ...
				TweenLite.delayedCall(4, startLoading);
				function startLoading(){
					TweenMax.to($('#text'), 5, {opacity: 0, top: "680px"});


				}

				//TweenMax.to($('#container'), 5, {backgroundColor:"white"});
				/**

				TweenMax.to($('#one'), 3, {opacity: 0, top: "300px", repeat: -1, yoyo: true});
				TweenMax.to($('#two'), 3, {opacity: 0, bottom: "300px", repeat: -1, yoyo: true});
				TweenMax.to($('#three'), 4, {opacity: 0, left: "1000px", repeat: -1, yoyo: true});
				TweenMax.to($('#four'), 4, {opacity: 0, right: "1000px", repeat: -1, yoyo: true});
				**/
			}
		};
	}
]);