'use strict';

//Setting up route
angular.module('draggable').config(['$stateProvider',
	function($stateProvider) {
		// Draggable state routing
		$stateProvider.
		state('draggable-main', {
			url: '/draggable',
			templateUrl: 'modules/draggable/views/draggable-main.client.view.html'
		});

	}
]);