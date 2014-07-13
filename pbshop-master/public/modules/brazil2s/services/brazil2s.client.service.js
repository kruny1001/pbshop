'use strict';

//Brazil2s service used to communicate Brazil2s REST endpoints
angular.module('brazil2s').factory('Brazil2s', ['$resource',
	function($resource) {
		return $resource('brazil2s/:brazil2Id', { brazil2Id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);