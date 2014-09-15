'use strict';

angular.module('andrewkim').controller('AAniGeneratorController', ['$scope', '$element', 'AniGenerator',
	function($scope, $element, AniGenerator) {
		// A ani generator controller logic
		// ...

        /*
        console.debug('from AAniGeneratorController');
        console.log($element);
        */

        $scope.generateAdDirective = function(){
            var ad = new AniGenerator();
            ad.addMainFrame($element);
        };

        //$scope.generateAdDirective();
	}
]);