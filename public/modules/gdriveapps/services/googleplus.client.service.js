'use strict';

angular.module('gdriveapps').factory('GooglePlus', [
	function() {
		return {
			callGooglePlus: callGooglePlus
		};

		function callGooglePlus(callback) {
			gapi.client.load('plus', 'v1').then(function() {
				// Step 5: Assemble the API request
				var request = gapi.client.plus.people.get({
					'userId': 'me'
				});
				// Step 6: Execute the API request
				request.then(callback, function(reason) {
					console.log('Error: ' + reason.result.error.message);
				});
			});
		}
	}
]);