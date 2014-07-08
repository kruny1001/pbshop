'use strict';

//Brazils service used to communicate Brazils REST endpoints
angular.module('brazils').factory('Brazils', ['$resource',
	function($resource) {
		return $resource('brazils/:brazilId', { brazilId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);