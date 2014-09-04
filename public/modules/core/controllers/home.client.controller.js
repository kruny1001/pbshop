'use strict';


angular.module('core').controller('HomeController', ['$scope', '$element', 'Authentication', 'YT_event',
	function($scope, $element, Authentication, YT_event) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.firstJumbo = 'first-jumbo-content';
        $scope.secondJumbo = 'second-jumbo-content';
        $scope.thirdJumbo = 'third-jumbo-content';
        var texts = $('.core-text-anni');
        var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
        tl.staggerTo(texts, 0.2, {className:"+=superShadow", top:"-=10px", ease:Power1.easeIn}, "0.3", "start")

        // YouTube Directive Setting Start
        $scope.yt = {
            width: 600,
            height: 480,
            videoid: 'M7lc1UVf-VE',
            playerStatus: 'NOT PLAYING'
        };

        $scope.YT_event = YT_event;

        $scope.sendControlEvent = function (ctrlEvent) {
            this.$broadcast(ctrlEvent);
        };

        $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
            $scope.yt.playerStatus = data;
        });
        // YouTube Directive Setting End
	}
]);