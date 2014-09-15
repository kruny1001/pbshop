'use strict';
/*
    //top text animation
* */
angular.module('andrewkim').directive('ganJab', [
    function() {
        return {
            templateUrl: 'modules/andrewkim/directives/ganJab.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                // top text animation
                CSSPlugin.defaultTransformPerspective = 400;
                var playBtn = $('#playBtn'),
                    pauseBtn = $('#pauseBtn'),
                    resumeBtn = $('#resumeBtn'),
                    time = $('#time'),
                    progress = $('#progress'),
                    timeScale = $('#timeScale'),
                    buttons = [playBtn, pauseBtn, resumeBtn],
                    lis = $('#ganJab').find('li');

                var tl = new TimelineLite({delay:0.4});
                TweenLite.set('#demo', {visibility:'visible'});

                tl.from('#timeline_txt', 0.6, {y:-30, opacity:0})
                    .from('#lite_txt', 0.6, {y:30, opacity:0}, '-=0.3')
                    .staggerFrom(lis, 0.2, {y:20, opacity:0}, 0.1)
                    .set(buttons, {opacity:0.2});

            }
        };
    }
]);