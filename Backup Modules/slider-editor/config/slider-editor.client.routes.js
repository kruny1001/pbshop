'use strict';

//Setting up route
angular.module('slider-editor').config(['$stateProvider',
	function($stateProvider) {
		// Slider editor state routing
		$stateProvider.
		state('Slidereditor', {
			url: '/sliderEditor/editor',
			templateUrl: 'modules/slider-editor/views/editor.client.view.html'
		});
	}
]);