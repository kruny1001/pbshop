'use strict';

angular.module('andrewkim').directive('bannerMainFrame', [ '$document',
	function($document) {
        return {

            restrict: 'EA',
            transclude: true,
            template: '<div ng-transclude></div>',
            compile: function(tElem, tAttrs){
                console.log('compile');
                tElem.addClass('bannerMainFrame');
                console.log(tElem);

                return{
                    pre:function(scope, iElem, iAttrs){
                        console.log('pre link');
                        console.log(iElem);
                    },
                    post: function postLink(scope, element, attrs) {
                        console.log('post link');

                        //setting up the CSS
                        /*
                         element.css({
                         width: '50%',
                         height: 450,
                         left:"100px",
                         backgroundColor: 'red',
                         boxShadow:"10px 10px"
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

                        scope.clickBtn = function clickBtn(event){
                            console.log('from clickBtn');
                            console.log(event);
                            console.log(element);
                            TweenMax.to(element, 1, {opacity:0.2})
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