'use strict';

// Brazil2s controller
angular.module('brazil2s').controller('Brazil2sController', ['$scope', '$stateParams', '$location', 'Authentication', 'Brazil2s',
	function($scope, $stateParams, $location, Authentication, Brazil2s ) {
		$scope.authentication = Authentication;

		// Create new Brazil2
		$scope.create = function() {
			// Create new Brazil2 object
			var brazil2 = new Brazil2s ({
				name: this.name
			});

			// Redirect after save
			brazil2.$save(function(response) {
				$location.path('brazil2s/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Brazil2
		$scope.remove = function( brazil2 ) {
			if ( brazil2 ) { brazil2.$remove();

				for (var i in $scope.brazil2s ) {
					if ($scope.brazil2s [i] === brazil2 ) {
						$scope.brazil2s.splice(i, 1);
					}
				}
			} else {
				$scope.brazil2.$remove(function() {
					$location.path('brazil2s');
				});
			}
		};

		// Update existing Brazil2
		$scope.update = function() {
			var brazil2 = $scope.brazil2 ;

			brazil2.$update(function() {
				$location.path('brazil2s/' + brazil2._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Brazil2s
		$scope.find = function() {
			$scope.brazil2s = Brazil2s.query();
		};

		// Find existing Brazil2
		$scope.findOne = function() {
			$scope.brazil2 = Brazil2s.get({ 
				brazil2Id: $stateParams.brazil2Id
			});
		};
	}
]);