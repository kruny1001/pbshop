'use strict';

angular.module('gdriveapps').controller('HistoryPaymentController', ['$scope','Authentication','Payments','PaymentsBySellerData',
	function($scope, Authentication, Payments, PaymentsBySellerData) {
		$scope.authentication = Authentication;
		console.log($scope.authentication);

		$scope.getPaymentHistory = function() {
			$scope.payments = PaymentsBySellerData.query({sellerData: Authentication.user._id});
		}
	}
]);