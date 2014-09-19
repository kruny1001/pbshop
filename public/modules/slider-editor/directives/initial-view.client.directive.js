'use strict';

angular.module('slider-editor').animation('.show-hide-animation', function() {

     //the reason why we're using beforeAddClass and removeClass is because we're working
     //around the .ng-hide class (which is added when ng-show evaluates to false). The
     //.ng-hide class sets display:none!important and we want to apply the animation only
     //when the class is removed (removeClass) or before it's added (beforeAddClass).
    return {
         //make sure to call the done() function when the animation is complete.
        beforeAddClass : function(element, className, done) {
            if(className == 'ng-hide') {
                TweenMax.set(element,{ height: 0, onComplete: done });
                //this function is called when the animation ends or is cancelled
                return function() {
                    //remove the style so that the CSS inheritance kicks in
                    element[0].style.height = '';
                }
            } else {
                done();
            }
        },
        // make sure to call the done() function when the animation is complete.
        removeClass : function(element, className, done) {
            if(className == 'ng-hide') {
                //set the height back to zero to make the animation work properly
                var height = element.height();
                element.css('height', 0);

                TweenMax.set(element,{ height: height, onComplete: done });

                //this function is called when the animation ends or is cancelled
                return function() {
                    //remove the style so that the CSS inheritance kicks in
                    element[0].style.height = '';
                }
            } else {
                done();
            }
        }
    }
});

angular.module('slider-editor').directive('initialView', [
	function() {
		return {
			template: '<div class="testClass"></div>',
			restrict: 'E',
            scope:{
                width   :'@widthInit',
                height  :'@heightInit'
            },
			link: function postLink(scope, element, attrs) {
                var targetInitView = element.children();
                TweenLite.defaultEase = Power3.easeInOut;
                TweenLite.set(targetInitView, {height: scope.height, width: scope.width});
                TweenLite.set(targetInitView, {backgroundColor:'white'});
                TweenLite.set(targetInitView, {xPercent:-50, yPercent:0});


                var tl = new TimelineMax({paused:true});
                function setTimeLine(tlVar, event){
                    //from right to left
                    tlVar.set(targetInitView, {xPercent:-50, yPercent:0, delay:2})
                        .from(targetInitView, 1, {xPercent:60, force3D:true})
                        .to(targetInitView, 1, {xPercent:-160, force3D:true, delay:1});
                    return tlVar;
                };

                //tl=setTimeLine(tl, 'd');
                //tl.play();
                //tl.play();
                //tl.stop();


			}
		};
	}
]);