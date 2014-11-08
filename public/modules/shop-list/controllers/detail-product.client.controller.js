'use strict';

angular.module('shop-list').controller('DetailProductController', ['$scope','$stateParams','Products',
	function($scope, $stateParams, Products) {
		var productId=$stateParams.productId;
		console.log($scope.parentId);

		// Find a Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: productId
			});
		};
	}
]);