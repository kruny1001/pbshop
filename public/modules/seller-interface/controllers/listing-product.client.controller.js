'use strict';

angular.module('seller-interface').controller('ListingProductController', ['$scope','Products','GetPurchaseJWT',
	function($scope, Products, GetPurchaseJWT) {

		$scope.items = [
			{ name: 'Upload New Image (Google Drive)', icon: 'share' },
			{ name: 'Select Existing Image (Google Drive)', icon: 'upload' },
			{ name: 'Product History (Google Sheets)', icon: 'copy' },
			{ name: 'Print this page (PDF Printer)', icon: 'print' },
		];

		$scope.find = function() {
			$scope.products = Products.query()
			$scope.products.$promise.then(function (result) {
				console.log('Done querying products');
				$scope.partitioned = partition(result, 2);
				console.log($scope.partitioned);
			});

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

		function partition(input, size) {
			var newArr = [];
			for (var i=0; i<input.length; i+=size) {
				newArr.push(input.slice(i, i+size));
			}
			return newArr;
		}
	}
]);