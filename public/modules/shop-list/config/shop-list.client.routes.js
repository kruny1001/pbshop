'use strict';

//Setting up route
angular.module('shop-list').config(['$stateProvider',
	function($stateProvider) {
		// Shop list state routing
		$stateProvider.
		state('products-list', {
			url: '/products-list',
			templateUrl: 'modules/shop-list/views/products-list.client.view.html'
		});
	}
]);