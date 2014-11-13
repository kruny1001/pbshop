'use strict';

//Setting up route
angular.module('template').config(['$stateProvider',
	function($stateProvider) {
		// Template state routing
		$stateProvider.
		state('banners-gallery', {
			url: '/banners-gallery',
			templateUrl: 'modules/template/views/banners-gallery.client.view.html'
		}).
		state('test-font-animation', {
			url: '/test-font-animation',
			templateUrl: 'modules/template/views/test-font-animation.client.view.html'
		}).
		state('draggable', {
			url: '/draggable',
			templateUrl: 'modules/template/views/draggable.client.view.html'
		}).
		state('set-row-col', {
			url: '/setrowcol',
			templateUrl: 'modules/template/views/set-row-col.client.view.html'
		});
	}
]);