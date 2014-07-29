/**
 * Created by KevinSo on 7/29/2014.
 *
 * ref: http://blog.oxrud.com/posts/creating-youtube-directive/
 *
 * Files
 * /youtube.client.directive.js
 * /youtube/youtube.html
 *
 * Example
 *
 <youtube width="{{yt.width}}" height="{{yt.height}}" videoid="{{yt.videoid}}"></youtube>
 <br />
 Width:<input type="text" ng-model="yt.width">
 Height:<input type="text" ng-model="yt.height">
 Videoid:<input type="text" ng-model="yt.videoid">

 <br />

 <button ng-click="sendControlEvent(YT_event.PLAY)">Send Play</button>
 <button ng-click="sendControlEvent(YT_event.PAUSE)">Send Pause</button>
 <button ng-click="sendControlEvent(YT_event.STOP)">Send Stop</button>

 <p>Player status is: {{yt.playerStatus}}</p>

 *
 */

'use strict';

angular.module('galleries').constant('YT_event', {
    STOP            : 0,
    PLAY            : 1,
    PAUSE           : 2,
    STATUS_CHANGE   : 3
});

angular.module('galleries').directive('youtube', ['$window','YT_event', function($window, YT_event) {
    return {
        restrict: "E",

        scope: {
            height: "@",
            width: "@",
            videoid: "@"
        },

        template: '<div></div>',

        link: function(scope, element, attrs, $rootScope) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;

            $window.onYouTubeIframeAPIReady = function() {

                player = new YT.Player(element.children()[0], {
                    playerVars: {
                        autoplay: 0,
                        html5: 1,
                        theme: "light",
                        modesbranding: 0,
                        color: "white",
                        iv_load_policy: 3,
                        showinfo: 1,
                        controls: 1
                    },

                    height: scope.height,
                    width: scope.width,
                    videoId: scope.videoid,

                    events: {
                        'onStateChange': function(event) {

                            var message = {
                                event: YT_event.STATUS_CHANGE,
                                data: ""
                            };

                            switch(event.data) {
                                case YT.PlayerState.PLAYING:
                                    message.data = "PLAYING";
                                    break;
                                case YT.PlayerState.ENDED:
                                    message.data = "ENDED";
                                    break;
                                case YT.PlayerState.UNSTARTED:
                                    message.data = "NOT PLAYING";
                                    break;
                                case YT.PlayerState.PAUSED:
                                    message.data = "PAUSED";
                                    break;
                            }

                            scope.$apply(function() {
                                scope.$emit(message.event, message.data);
                            });
                        }
                    }
                });
            };

            scope.$watch('height + width', function(newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }
                player.setSize(scope.width, scope.height);
            });

            scope.$watch('videoid', function(newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }
                player.cueVideoById(scope.videoid);
            });

            scope.$on(YT_event.STOP, function () {
                player.seekTo(0);
                player.stopVideo();
            });

            scope.$on(YT_event.PLAY, function () {
                player.playVideo();
            });

            scope.$on(YT_event.PAUSE, function () {
                player.pauseVideo();
            });

        }
    };
}]);
