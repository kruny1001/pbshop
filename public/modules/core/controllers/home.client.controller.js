'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.firstJumbo = 'first-jumbo-content';
        $scope.secondJumbo = 'second-jumbo-content';
        $scope.thirdJumbo = 'third-jumbo-content';
	}
]);