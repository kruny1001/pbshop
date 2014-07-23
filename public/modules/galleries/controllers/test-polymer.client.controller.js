'use strict';

angular.module('galleries').controller('TestpolymerController', ['$scope',
	function($scope) {
		// Test polymer controller logic
		// ...

        $scope.toggleDialog = function(transition) {
            var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
            dialog.toggle();
        }
	}
]);