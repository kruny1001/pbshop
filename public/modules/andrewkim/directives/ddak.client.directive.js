// Todo:
//
'use strict';

angular.module('andrewkim').constant('Ddak_event', {
    OPEN           : 0,
    CLOSE          : 1,
    PAUSE          : 2,
    STATUS_CHANGE  : 3
});

angular.module('andrewkim').directive('ddak', ['Ddak_event',
	function(Ddak_event) {
		return {
            scope:{
                banner: '@bannerInfo'
            },
            templateUrl: 'modules/andrewkim/directives/ddak.html',
			restrict: 'EA',
            /*
            controller: ['$scope', 'Ddak_event', function($scope, Ddak_event){

                $scope.Ddak_event = Ddak_event;
                $scope.sendControlEvent = function(ctrlEvent){
                    this.$broadcast(ctrlEvent);
                }
                $scope.testVar = 'If you click an Order button, the main frame will be changed to shopping list view';

            }],
             */
			link: function postLink(scope, element, attrs) {
                var
                    panel1 = $('#panel1'),
                    panel2 = $('#panel2'),
                    panel3 = $('#panel3'),
                    panel1Text = $('#panel1 h1'),
                    panel2Text = $('#panel2 h2'),
                    info = $('#info'),
                    list = $('#ddak').find('li'),
                    orderNow = $('#orderNow');

                var tl = new TimelineMax({delay:0.5, repeat:2, repeatDelay:3});
                TweenMax.to($('#banner'),0, {borderRadius:'0px 0px 25px 25px'});
                TweenMax.to(panel1,0,{borderRadius:'0px 0px 25px 25px'});
                TweenMax.to(panel2,0,{borderRadius:'0px 0px 25px 25px'});
                TweenMax.to(panel3,0,{borderRadius:'0px 0px 25px 25px'});
                TweenMax.to(info,0,{borderRadius:'0px 0px 25px 25px'});
                TweenMax.to(orderNow,0,{borderRadius:'25px 25px 25px 25px'});

                tl.from(panel1, 0.5, {autoAlpha:0})
                    .from(panel1Text, 0.5, {scale:0.5, autoAlpha:0, ease:Back.easeOut})
                    .set(panel2, {top:0}, '+=1')
                    .from(panel2, 0.2, {autoAlpha:0, scale:1.5})
                    .from(panel2Text, 0.2, {top:250}, '+=0.5')
                    .to(panel2Text, 0.2, {top:250}, '+=0.5')
                    .set(panel3, {top:0}, 'final')
                    .from(info, 0.5, {top:250}, 'final')
                    .to(panel2, 0.5, {top:-60}, 'final')
                    .staggerFrom(list, 0.3, {autoAlpha:0, left:50}, 0.1, '+=0.2')
                    .from(orderNow, 0.5, {scale:0, autoAlpha:0, ease:Back.easeOut});
                /*
                scope.$on(Ddak_event.OPEN, function() {
                    console.log('scope on');
                    //console.log(element[0]);
                    var tl = new TimelineMax({delay: 0.5});
                    tl.to(element.children(), 1, {autoAlpha: 0})
                        .to(element.children(), 1, {autoAlpha: 1});
                });
                */

                scope.clickBtnFromDirective = function (){
                    console.log('from clickBtn');
                    //console.log(banner);
                    console.log(scope.banner);
                    //console.log(event);
                    //console.log(element);
                    if(scope.editMode === false) {
                        //TweenMax.to(element, 0.5, {autoAlpha:0, display:"none"})
                        scope.editMode = true;
                    }
                    else {
                        TweenMax.to(element, 1, {opacity:1});
                        scope.editMode = false;
                    }

                }
            }
		};
	}
]);