#YouTube Directive#
##Example##
###Add Dependency to controller### 
    YT_event
###Add Setting to controller###
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
###Add HTML Directive###    
	<h2>YouTube Directive</h2>
    <br />
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

    
	