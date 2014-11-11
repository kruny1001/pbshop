'use strict';

//Setting up route
angular.module('gwas').config(['$stateProvider',
	function($stateProvider) {
		// Gwas state routing
		$stateProvider.
		state('gwas-data-start', {
			url: '/gwas-data/gwas-data-start',
			templateUrl: 'modules/gwas/views/gwas-data-start.client.view.html'
		});
	}
]);