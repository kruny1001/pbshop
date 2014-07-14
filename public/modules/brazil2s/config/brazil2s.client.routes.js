'use strict';

//Setting up route
angular.module('brazil2s').config(['$stateProvider',
	function($stateProvider) {
		// Brazil2s state routing
		$stateProvider.
		state('listBrazil2s', {
			url: '/brazil2s',
			templateUrl: 'modules/brazil2s/views/list-brazil2s.client.view.html'
		}).
		state('createBrazil2', {
			url: '/brazil2s/create',
			templateUrl: 'modules/brazil2s/views/create-brazil2.client.view.html'
		}).
		state('viewBrazil2', {
			url: '/brazil2s/:brazil2Id',
			templateUrl: 'modules/brazil2s/views/view-brazil2.client.view.html'
		}).
		state('editBrazil2', {
			url: '/brazil2s/:brazil2Id/edit',
			templateUrl: 'modules/brazil2s/views/edit-brazil2.client.view.html'
		});
	}
]);