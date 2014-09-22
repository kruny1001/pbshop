'use strict';

// Banners controller
angular.module('banners').controller('BannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Banners', 'Products',
	function($scope, $stateParams, $location, Authentication, Banners, Products) {
		$scope.authentication = Authentication;
        //////////////// Temp Code
        $scope.products = [
            {
                name:'Product1',
                img:'modules/andrewkim/img/my1.jpg'
            },
            {
                name:'Product2',
                img:'modules/andrewkim/img/my2.jpg'
            },
            {
                name:'Product3',
                img:'modules/andrewkim/img/my3.jpg'
            },
            {
                name:'Product4',
                img:'modules/andrewkim/img/my3.jpg'
            },
            {
                name:'Product5',
                img:'modules/andrewkim/img/my2.jpg'
            },
            {
                name:'Product6',
                img:'modules/andrewkim/img/my1.jpg'
            },
            {
                name:'Product7',
                img:'modules/andrewkim/img/my3.jpg'
            },
            {
                name:'Product8',
                img:'modules/andrewkim/img/my1.jpg'
            },
            {
                name:'Product9',
                img:'modules/andrewkim/img/my2.jpg'
            }
        ];
        $scope.products = null;
        ///////////////
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
            $scope.products= Products.get({
                bannerId: $stateParams.bannerId
            });
        };

        $scope.toCreateProduct = function(){
            $location.path('products/create/'+$stateParams.bannerId);
        };


	}
]);