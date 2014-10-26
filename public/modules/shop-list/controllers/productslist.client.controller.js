'use strict';

angular.module('shop-list').controller('ProductslistController', ['$scope', '$state','$resource', '$q','Allproducts','AllBanners','GetPurchaseJWT',
	function($scope, $state, $resource, $q, Allproducts, AllBanners, GetPurchaseJWT) {
		$scope.products= [];
		$scope.banners = [];

		// initialization
		$scope.products = Allproducts.query();
		$scope.banners = AllBanners.query();

		$scope.editProducts = function(productID) {
			console.log('Product Edit Button');
			$state.go('editProduct', {productId:productID});
		};

		$scope.deleteProducts = function(productID) {
			console.log('Product Delete Button');
			Allproducts.delete({productID:productID});
			//After deleting a contents, update current contents

			$scope.products = Allproducts.query();
		};

		$scope.zoomIn = function(element){
			//console.log(element.currentTarget);
			TweenLite.to(element.currentTarget, 0.5,{scale:5});
		}

		$scope.zoomOut = function(element){
			//console.log(element.currentTarget);
			TweenLite.to(element.currentTarget, 0.5,{scale:1});
		}

		$scope.purchaseProduct = function(productID){
			GetPurchaseJWT.query({productID: productID}).$promise
				.then(function (response){
					console.log(response[0]);

					google.payments.inapp.buy({
						parameters: {},
						jwt: response[0],
						success: function() { window.alert('success')},
						failure: function() { window.alert('failure')}
					})
				});

		};

		//http://localhost:3000/#!/products/544b060cf50235382250d10a/edit
	}
]);