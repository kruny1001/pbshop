'use strict';

// Banners controller
angular.module('banners').controller('BannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Banners', 'Products', 'ProductsBanner',
	function($scope, $stateParams, $location, Authentication, Banners, Products, ProductsBanner) {
		$scope.authentication = Authentication;

		// Create new Banner
		$scope.create = function() {
			// Create new Banner object
			var banner = new Banners ({
				name: this.name,
                bannerTag: this.bannerTag
			});

			// Redirect after save
			banner.$save(function(response) {
				$location.path('banners/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.bannerTag = '';
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

        $scope.findProductOne = function(){
            $scope.banner = Banners.get({
                bannerId: $stateParams.bannerId
            });

            $scope.products= Products.query({
                bannerId: $stateParams.bannerId
            });
        };

        $scope.toCreateProduct = function(){
            $location.path('products/create/'+$stateParams.bannerId);
        };

        // should be changed
        $scope.toEditPoduct = function(){
            $location.path('products/list/'+$stateParams.bannerId);
        };

        $scope.findProductUnderBanner = function() {
            console.log('banner id is '+ $stateParams.bannerId);
            $scope.products = ProductsBanner.query({},{bannerId:$stateParams.bannerId});
        }



	}
]);