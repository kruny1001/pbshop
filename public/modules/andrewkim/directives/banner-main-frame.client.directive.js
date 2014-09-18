'use strict';

angular.module('andrewkim').directive('bannerMainFrame', [ '$document',
	function($document) {
        return {

            restrict: 'EA',
            transclude: true,
            template:   '<div ng-transclude>' +'<button ng-click="clickBtnFromDirective()">Directive 1-1</button>'+/*
                            '<button ng-click="clickBtnFromDirective()">Directive 1-1</button>'+
                            '<div banner-sub-frame></div>'+
                            '<p>{{test}}</p>'+
                            '<div ng-transclude></div>'+
                            */
                        '</div>',
            scope: {
                EventHandler: '&eventFunction'
            },
            compile: function(tElem, tAttrs){
                //console.log('compile');
                tElem.addClass('bannerMainFrame');
                //console.log(tElem);

                return{
                    pre:function(scope, iElem, iAttrs){

                        //console.log('pre link');
                        //console.log(iElem);
                    },
                    post: function postLink(scope, element, attrs) {

                        scope.editMode = false;

                        scope.clickBtnFromDirective = function (){
                            console.log('from clickBtn');
                            //console.log(event);
                            //console.log(element);
                            if(scope.editMode === false) {
                                TweenMax.to(element, 0.5, {autoAlpha:0, display:"none"})
                                scope.editMode = true;
                            }
                            else {
                                TweenMax.to(element, 1, {opacity:1.5});
                                scope.editMode = false;
                            }
                        }

                        element.bind('click', function(){
                            console.log('element is clicked');
                            TweenMax.from(element, 0.5, {scale:1.2});
                        })

                        element.bind('mouseover', function(){
                            console.log('mouseover');
                            element.css('cursor', 'pointer');

                        })

                    }
                }
            }

        };
    }
]);