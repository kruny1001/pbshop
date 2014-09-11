'use strict';

angular.module('andrewkim').controller('AmainController', ['$scope',
	function($scope) {
        $scope.editorOptions = {
            language: 'ru',
            uiColor: '#000000'
        };

		// Amain controller logic
		// ...
        var contents = $('.well');
        var body = $('body');
       //var tween = new TweenLite(contents, {autoAlpha:0})

        function initCSS() {

        }

        function getIntro() {
            var tl = new TimelineLite();
            tl.from(contents, 1 ,{scale:0.2, autoAlpha:1, ease:Back.easeOut});
        }

        //initCSS();
        getIntro();

	}
]);