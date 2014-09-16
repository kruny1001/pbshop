'use strict';

// Banners controller
angular.module('banners').controller('BannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Banners',
	function($scope, $stateParams, $location, Authentication, Banners ) {
		$scope.authentication = Authentication;

		// Create new Banner
		$scope.create = function() {
			// Create new Banner object
			var banner = new Banners ({
				name: this.name
			});

			// Redirect after save
			banner.$save(function(response) {
				$location.path('banners/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Banner
		$scope.remove = function( banner ) {
			if ( banner ) { banner.$remove();

				for (var i in $scope.banners ) {
					if ($scope.banners [i] === banner ) {
						$scope.banners.splice(i, 1);
					}
				}
			} else {
				$scope.banner.$remove(function() {
					$location.path('banners');
				});
			}
		};

		// Update existing Banner
		$scope.update = function() {
			var banner = $scope.banner ;

			banner.$update(function() {
				$location.path('banners/' + banner._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Banners
		$scope.find = function() {
			$scope.banners = Banners.query();
		};

		// Find existing Banner
		$scope.findOne = function() {
			$scope.banner = Banners.get({ 
				bannerId: $stateParams.bannerId
			});
		};
	}
]);