'use strict';

angular.module('seller-interface').controller('ListingProductController', ['$scope','Products','GetPurchaseJWT',
	function($scope, Products, GetPurchaseJWT) {
		$scope.find = function() {
			$scope.products = Products.query();
		};

		$scope.purchaseProduct = function (productID) {
			GetPurchaseJWT.query({ productID: productID }).$promise.then(function (response) {
				console.log(response[0]);
				google.payments.inapp.buy({
					parameters: {},
					jwt: response[0],
					success: function () {
						window.alert('success');
					},
					failure: function () {
						window.alert('failure');
					}
				});
			});
		};
	}
]);