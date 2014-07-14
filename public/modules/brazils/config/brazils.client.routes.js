'use strict';

//Setting up route
angular.module('brazils').config(['$stateProvider',
	function($stateProvider) {
		// Brazils state routing
		$stateProvider.
		state('listBrazils', {
			url: '/brazils',
			templateUrl: 'modules/brazils/views/list-brazils.client.view.html'
		}).
		state('createBrazil', {
			url: '/brazils/create',
			templateUrl: 'modules/brazils/views/create-brazil.client.view.html'
		}).
		state('viewBrazil', {
			url: '/brazils/:brazilId',
			templateUrl: 'modules/brazils/views/view-brazil.client.view.html'
		}).
		state('editBrazil', {
			url: '/brazils/:brazilId/edit',
			templateUrl: 'modules/brazils/views/edit-brazil.client.view.html'
		});
	}
]);