'use strict';

//Setting up route
angular.module('seller-interface').config(['$stateProvider',
	function($stateProvider) {
		// Seller interface state routing
		$stateProvider.
		state('listing-product', {
			url: '/',
			templateUrl: 'modules/seller-interface/views/listing-product.client.view.html'
		});
	}
]);