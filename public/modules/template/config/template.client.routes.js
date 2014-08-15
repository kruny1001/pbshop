'use strict';

//Setting up route
angular.module('template').config(['$stateProvider',
	function($stateProvider) {
		// Template state routing
		$stateProvider.
		state('set-row-col', {
			url: '/setrowcol',
			templateUrl: 'modules/template/views/set-row-col.client.view.html'
		});
	}
]);