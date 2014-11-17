//D:\git\pbshop\public\modules\template\directives\banner-front.client.directive.js
'use strict';

angular.module('template').directive('bannerFront', [
	function() {
		return {
			templateUrl: 'modules/template/directives/banner-front.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                scope.tl = new TimelineMax();
                scope.tl.set("#content2", {autoAlpha: 0, display: 'none' }, "+=0.25")
                    .set("#content", {autoAlpha: 1, display: 'block'})
                    .from("#bannertitle", 0.5, {left:100, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
                    .from("#bannersubtitle", 0.5, {left:-100, autoAlpha:0}, "-=0.25") //add tween 0.25 seconds before previous tween ends
                    .from("#feature", 0.5, {scale:0.5, autoAlpha:0}, "feature") // add feature label at start position of this tween
                    .from("#description", 0.5, {left:100, autoAlpha:0}, "feature+=0.25") // add tween 0.25 seconds after the feature label
                    .staggerFrom("#nav img", 0.5, {scale:0, rotation:-180, autoAlpha:0}, 0.2, "stagger");

                scope.tl2 = new TimelineMax();
                scope.tl2.set("#content", {autoAlpha: 0, display: 'none'}, "+=2")
                    .set("#content2", {autoAlpha: 1, display: 'block'})
                    .from("#bannertitle2", 0.5, {left:100, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
                    .from("#bannersubtitle2", 0.5, {left:-100, autoAlpha:0}, "-=0.25") //add tween 0.25 seconds before previous tween ends
                    .from("#feature2", 0.5, {scale:0.5, autoAlpha:0}, "feature2") // add feature label at start position of this tween
                    .from("#description2", 0.5, {left:100, autoAlpha:0}, "feature2+=0.25") // add tween 0.25 seconds after the feature label
                    .staggerFrom("#nav2 img", 0.5, {scale:0, rotation:-180, autoAlpha:0}, 0.2, "stagger2");

                scope.masterTimeline = new TimelineMax({paused:true});
                scope.masterTimeline = scope.masterTimeline.add(scope.tl).add(scope.tl2)
                    .from("#progress", scope.masterTimeline.duration(), {scaleX:0, transformOrigin:"left center"}, 0);

                scope.setRating = function() {
                    scope.masterTimeline.progress( scope.rating/100);
                    scope.masterTimeline.pause();
                    scope.$digest();
                };


                scope.masterTimeline.eventCallback("onUpdate", updateSlider);
                function updateSlider() {
                    scope.rating = scope.masterTimeline.progress() *100;
                    scope.$digest();
                }

                scope.play = function(){
                    if(scope.masterTimeline.progress() != 1)
                        scope.masterTimeline.play();
                    else
                        scope.masterTimeline.restart();
                };
                scope.prev = function(){
                    if(scope.test.progress() != 1){
                        scope.tl.play();
                        scope.test.play();
                        console.log('not 1');
                    } else {
                        scope.test.restart();
                        console.log('1');
                    }
                };
                scope.next = function(){
                    if(test2.progress() != 1){
                        //carl just changed this again
                        test2.play();
                    } else {
                        //tl.restart();
                        test2.restart();
                    }
                };


                scope.pause = function(){
                    scope.masterTimeline.pause();
                };
                scope.reverse = function(){
                    scope.masterTimeline.reverse();
                };
                scope.resume = function() {
                    scope.masterTimeline.resume();
                };
                scope.restart = function() {
                    scope.masterTimeline.restart();
                }
			}
		};
	}
]);