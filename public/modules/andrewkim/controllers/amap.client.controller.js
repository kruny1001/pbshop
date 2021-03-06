'use strict';

angular.module('andrewkim').controller('AmapController', ['$scope',
	function($scope) {
		// Amap controller logic
		// ...
        $scope.map = {
            center: {
                latitude: 44.8968555,
                longitude: -93.1819971
            },
            zoom: 16
        };
        $scope.marker = {
            id:0,
            title:'Andrew Kim Church',
            coords: {
                latitude: 44.8968555,
                longitude: -93.1819971
            },
            options: { draggable: false }
        }


	}
]);