'use strict';

angular.module('andrewkim').controller('BannerController', ['$scope',
	function($scope) {
		// Banner controller logic
		// ...
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };
	}
]);