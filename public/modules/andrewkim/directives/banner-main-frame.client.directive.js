'use strict';

angular.module('andrewkim').directive('bannerMainFrame', [ '$document',
	function($document) {
        return {

            restrict: 'EA',
            transclude: true,
            template:   '<div>' +
                            '<button ng-click="clickBtnFromDirective()">Directive 1-1</button>'+
                            '<div banner-sub-frame></div>'+
                            '<p>{{test}}</p>'+
                            '<div ng-transclude></div>'+
                        '</div>',
            scope: {
                EventHandler: '&eventFunction'
            },
            compile: function(tElem, tAttrs){
                console.log('compile');
                //tElem.addClass('bannerMainFrame');
                console.log(tElem);

                return{
                    pre:function(scope, iElem, iAttrs){
                        //console.log('pre link');
                        //console.log(iElem);
                    },
                    post: function postLink(scope, element, attrs) {

                        //console.log('post link');

                        //setting up the CSS
                        /*
                         element.css({
                         width: '50%',
                         height: 450,
                         left:'100px',
                         backgroundColor: 'red',
                         boxShadow:'10px 10px'
                         });
                         */

                        //element.addClass('bannerMainFrame');
                        //$compile(element)(scope);

                        /*
                         element.on('mousedown', function(evnt){
                         event.preventDefault();
                         $document.on('click', clickBtn);
                         $document.on('doubleclick', clickBtn);
                         });
                         */
                        scope.editMode = false;

                        scope.clickBtnFromDirective = function (){
                            console.log('from clickBtn');
                            //console.log(event);
                            //console.log(element);
                            if(scope.editMode === false) {
                                TweenMax.to(element, 1, {opacity:0.2})
                                scope.editMode = true;
                            }
                            else {
                                TweenMax.to(element, 1, {opacity:1});
                                scope.editMode = false;
                            }

                        }

                        //element.text('this is main frame');

                        scope.$on('Click', function(t){
                            console.log('Clicked');
                            console.log(event);
                            scope.test = 'test';
                        });
                    }
                }
            }

        };
    }
]);