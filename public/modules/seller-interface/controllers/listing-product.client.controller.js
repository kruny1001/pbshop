'use strict';

angular.module('seller-interface').controller('ListingProductController', ['$scope', '$log', '$mdDialog', '$mdToast','Products','GetPurchaseJWT',
	function($scope, $log, $mdDialog, $mdToast, Products, GetPurchaseJWT) {

		$scope.openToast = function($event) {
			$mdToast.show({
				template: '<md-toast>Hello!</md-toast>',
				hideDelay: 3000
			});
		};

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
				$scope.partitioned = partition(result, 3);
				console.log($scope.partitioned);
			});
		};

		$scope.testColumnSystem = function(numberOfColumn){
			$scope.partitioned = partition($scope.products, numberOfColumn);
			$scope.$digest();
		}

		$scope.listItemClick = function($index) {
			var clickedItem = $scope.items[$index];
			$mdBottomSheet.hide(clickedItem);
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
		};

		$scope.dialogAdvanced = function(ev) {
			$log.debug("dialogAdvanced() preparing to show...");
			$mdDialog.show({
				templateUrl: 'modules/seller-interface/views/dialogtest.html',
				targetEvent: ev,
				controller: DialogController,
				onComplete:function(){
					$log.debug("dialogAdvanced() now shown!");
				}
			}).then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
		};

		function DialogController($scope, $mdDialog) {
			$scope.hide = function () {
				$mdDialog.hide();
			};

			$scope.cancel = function () {
				$mdDialog.cancel();
			};

			$scope.answer = function (answer) {
				$mdDialog.hide(answer);
			};
		}
	}
]);