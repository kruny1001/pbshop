'use strict';

angular.module('andrewkim').directive('ddak', [
	function() {
		return {
            templateUrl: 'modules/andrewkim/directives/ddak.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                var
                    $panel1 = $("#panel1"),
                    $panel2 = $("#panel2"),
                    $panel3 = $("#panel3"),
                    $panel1Text = $("#panel1 h1"),
                    $panel2Text = $("#panel2 h2"),
                    $info = $("#info"),
                    $list = $("li"),
                    $orderNow = $("#orderNow");

                var tl = new TimelineMax({delay:0.5, repeat:1, repeatDelay:2});

                tl.from(panel1, 0.5, {autoAlpha:0})
                    .from($panel1Text, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
                    .set($panel2, {top:0}, "+=2")
                    .from($panel2, 0.2, {autoAlpha:0, scale:1.5})
                    .from($panel2Text, 0.2, {top:250}, "+=0.5")
                    .to($panel2Text, 0.2, {top:250}, "+=2")
                    .set($panel3, {top:0}, "final")
                    .from($info, 0.5, {top:250}, "final")
                    .to($panel2, 0.5, {top:-60}, "final")
                    .staggerFrom($list, 0.3, {autoAlpha:0, left:50}, 0.1, "+=0.2")
                    .from($orderNow, 0.5, {scale:0, autoAlpha:0, ease:Back.easeOut});

            }
		};
	}
]);