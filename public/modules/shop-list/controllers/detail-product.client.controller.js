'use strict';

angular.module('shop-list').controller('DetailProductController', ['$scope','$stateParams','$sce','Products', 'GetPurchaseJWT','Payments',
	function($scope, $stateParams, $sce, Products, GetPurchaseJWT, Payments) {
		var productId=$stateParams.productId;
		$scope.quantity = 1;

		var tabs = [
			{ title: '상세 상품설명',
				content: '<p>R package and code repository</p><p><br/></p><p><a href="http://kruny1001.ocpu.io/pbshop/info">R</a> Package Repository: <a href="http://kruny1001.ocpu.io/pbshop/info">here</a></p><p> Code Repository: <a href="https://github.com/kruny1001/pbshop">here</a></p><p><br/></p><p>Demo web application: <a href="http://kevangular.herokuapp.com/#!/gwas-t1">http://kevangular.herokuapp.com/#!/gwas-t1</a></p><p><br/></p><p><img style="height: 578px;width: 1075px;" src="http://goo.gl/t5cXqX" title="" class=""/><br/></p>'},
			{ title: '반품/배송/교환 문의', content: ''},
			{ title: '상품분석평/상품문의', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
		];

		// Find a Product
		$scope.findOne = function() {
			Products.get({
				productId: productId
			}).$promise.then(
				function(value){
					$scope.product = value;
					tabs[1].content =  $sce.trustAsHtml(value.detailDesc);
				}
			);
		};

		// Tabs Start -----------------------------------------------


		$scope.tabs = tabs;
		$scope.selectedIndex = 1;

		$scope.announceSelected = announceSelected;
		$scope.announceDeselected = announceDeselected;

		$scope.addTab = function (title, view) {
			view = view || title + " Content View";
			tabs.push({ title: title, content: view, disabled: false, style:style});
		};

		$scope.removeTab = function (tab) {
			for (var j = 0; j < tabs.length; j++) {
				if (tab.title == tabs[j].title) {
					$scope.tabs.splice(j, 1);
					break;
				}
			}
		};

		function announceDeselected(tab) {
			$scope.farewell = 'Goodbye ' + tab.title + '!';
		}

		function announceSelected(tab) {
			$scope.greeting = 'Hello ' + tab.title + '!';
		}
		// Tabs End -----------------------------------------------


		$scope.from_one = {
			from_one :'bold data in controller in from_one.js'
		}

		$scope.purchaseProduct = function(productID, quantity){
			console.log(productID);
			console.log(quantity);
			var optdesc= 'quantity is '+ quantity;
			GetPurchaseJWT.query({productID: productID, qty: quantity, optdesc: optdesc}).$promise
				.then(function (response){
					google.payments.inapp.buy({
						parameters: {},
						jwt: response[0],
						success: function(result) {
							//window.alert('success: '+ result);
							//console.log(result.request);
							//console.log(result.response);
							//console.log(result.jwt);
							// Insert Payment History
							createPaymentHistory(result);
						},
						failure: function() {
							window.alert('Your Payment transaction is failed')
						}
					})
				});
		};

		var createPaymentHistory = function (result) {
			// Create new Payment object
			var payment = new Payments({
				name: result.request.name,
				price: Number(result.request.price),
				sellerData: result.request.sellerData,
				description: result.request.description,
				currencyCode: result.request.currencyCode,
				orderID: result.response.orderId
			});
			// Redirect after save
			payment.$save(function (response) {
				//$location.path('payments/' + response._id);
				// Clear form fields
				//$scope.name = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);