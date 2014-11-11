'use strict';

angular.module('shop-list').controller('DetailProductController', ['$scope','$stateParams','Products', 'GetPurchaseJWT','Payments',
	function($scope, $stateParams, Products, GetPurchaseJWT, Payments) {
		var productId=$stateParams.productId;
		$scope.quantity = 1;
		// Find a Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: productId
			});
		};

		// Tabs Start -----------------------------------------------
		var tabs = [
			{ title: '상세 상품설명',
				content: '<p>R package and code repository</p><p><br/></p><p><a href="http://kruny1001.ocpu.io/pbshop/info">R</a> Package Repository: <a href="http://kruny1001.ocpu.io/pbshop/info">here</a></p><p> Code Repository: <a href="https://github.com/kruny1001/pbshop">here</a></p><p><br/></p><p>Demo web application: <a href="http://kevangular.herokuapp.com/#!/gwas-t1">http://kevangular.herokuapp.com/#!/gwas-t1</a></p><p><br/></p><p><img style="height: 578px;width: 1075px;" src="http://goo.gl/t5cXqX" title="" class=""/><br/></p>'},
			{ title: '반품/배송/교환 문의', content: '&#10;                        <h1 style="text-align: center;">&#34;헤어트리트먼트의 대세&#34;</h1><h2 style="text-align: center;">헐리웃 스타의 베스트셀러</h2><p><br/></p><p style="text-align: left;">모로칸 오일 트리트먼트 제품의 모로코 남서 지역에서 재배된 &#34;아르간 오일&#34; 이 주성분으로 만들어진 제품들로 천연 토코페롤, 비타민 E, 오메가9, 폴리페놀이 풍부하게 함유되어 있어 세포 구조를 자연스럽게 재생시켜주고 모발의 탄력을 높여주며 윤기와 활력이 없는 모발에 생명력과 광택을 회복시켜 줍니다. 건조한 에어컨 바람으로 부터 수분을 보호하며 장마철 습기로 인해 기름지고 쳐진 머리결을 부드럽고 볼륨감 있게 케어해 줍니다. </p><p style="text-align: left;">염색이나 퍼머시 사용하면 모발의 손상을 막아주고 효과를 더 오래 지속시켜 주며 드라이 시간을 40% 이상 단축 시켜 줍니다. 모로칸 오일의 모든 제품은 동물성 함유물이 배제된 최상의 품질로 모든 제품이 모발에 탄력을 재생시켜주며 화려한 윤기를 더해주는 동시에 유해 산소로부터 뛰어난 방어력으로 세포가 손상되는 것 을 방지하는 효과가 탁월합니다. </p><p style="text-align: left;">스타일링과 케어를 동시에 만독시켜드리는 멀티플 제품들 체험해 보세요!</p><p style="text-align: left;">만족하실뿐만 아니라 매니아가 되실 것 을 확신합니다. </p><p style="text-align: left;"><br/></p><p style="text-align: left;"><br/></p>&#10;'},
			{ title: '상품분석평/상품문의', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
		];

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