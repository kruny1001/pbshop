'use strict';

//Setting up route
angular.module('opencpu').config(['$stateProvider',
	function($stateProvider) {
		// Opencpu state routing
		$stateProvider.
		state('gwas-t1', {
			url: '/gwas-t1',
			templateUrl: 'modules/opencpu/views/gwas-t1.client.view.html'
		});
	}
]);