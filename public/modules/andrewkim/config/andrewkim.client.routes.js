'use strict';

//Setting up route
angular.module('andrewkim').config(['$stateProvider',
	function($stateProvider) {
		// Andrewkim state routing
		$stateProvider.
		state('firebase-example', {
			url: '/firebase-example',
			templateUrl: 'modules/andrewkim/views/firebase-example.client.view.html'
		}).
		state('slider-editor', {
			url: '/slider-editor',
			templateUrl: 'modules/andrewkim/views/slider-editor.client.view.html'
		}).
		state('a-board', {
			url: '/a-board',
			templateUrl: 'modules/andrewkim/views/a-board.client.view.html'
		}).
		state('a-map', {
			url: '/a-map',
			templateUrl: 'modules/andrewkim/views/a-map.client.view.html'
		}).
		state('a-info', {
			url: '/a-info',
			templateUrl: 'modules/andrewkim/views/a-info.client.view.html'
		}).
		state('a-events', {
			url: '/a-events',
			templateUrl: 'modules/andrewkim/views/a-event.client.view.html'
		}).
		state('a-main', {
			url: '/a-main',
			templateUrl: 'modules/andrewkim/views/a-main.client.view.html'
		});
	}
]);