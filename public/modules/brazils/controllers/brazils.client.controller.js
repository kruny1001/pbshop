'use strict';

// Brazils controller
angular.module('brazils').controller('BrazilsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Brazils',
	function($scope, $stateParams, $location, Authentication, Brazils ) {
		$scope.authentication = Authentication;

		// Create new Brazil
		$scope.create = function() {
			// Create new Brazil object
			var brazil = new Brazils ({
				name: this.name
			});

			// Redirect after save
			brazil.$save(function(response) {
				$location.path('brazils/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Brazil
		$scope.remove = function( brazil ) {
			if ( brazil ) { brazil.$remove();

				for (var i in $scope.brazils ) {
					if ($scope.brazils [i] === brazil ) {
						$scope.brazils.splice(i, 1);
					}
				}
			} else {
				$scope.brazil.$remove(function() {
					$location.path('brazils');
				});
			}
		};

		// Update existing Brazil
		$scope.update = function() {
			var brazil = $scope.brazil ;

			brazil.$update(function() {
				$location.path('brazils/' + brazil._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Brazils
		$scope.find = function() {
			$scope.brazils = Brazils.query();
		};

		// Find existing Brazil
		$scope.findOne = function() {
			$scope.brazil = Brazils.get({ 
				brazilId: $stateParams.brazilId
			});
		};
	}
]);