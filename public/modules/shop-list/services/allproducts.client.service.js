'use strict';

angular.module('shop-list').factory('Allproducts', ['$resource',
	function($resource) {
		return $resource('products/:productID', {productID: '@_id'});
	}
]);

angular.module('shop-list').factory('AllBanners', ['$resource',
	function($resource) {
		return $resource('banners', {productID: '@_id'});
	}
]);


angular.module('shop-list').factory('GetPurchaseJWT', ['$resource',
	function($resource) {
		return $resource('purchase/gw_test/:productID',
			{productID: '@_id'}, {query: {method:'get', isArray:true}}
		);
	}
]);