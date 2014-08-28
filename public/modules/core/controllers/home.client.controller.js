'use strict';


angular.module('core').controller('HomeController', ['$scope', '$element', 'Authentication',
	function($scope, $element, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.firstJumbo = 'first-jumbo-content';
        $scope.secondJumbo = 'second-jumbo-content';
        $scope.thirdJumbo = 'third-jumbo-content';
        var texts = $('.core-text-anni');
        var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
        tl.staggerTo(texts, 0.2, {className:"+=superShadow", top:"-=10px", ease:Power1.easeIn}, "0.3", "start")
	}
]);