'use strict';

angular.module('andrewkim').constant('YT_event', {
    PLAY           : 0,
    STOP          : 1,
    PAUSE          : 2,
    STATUS_CHANGE  : 3
});

angular.module('andrewkim').controller('AmainController', ['$scope','$sce', '$upload', 'Images', 'YT_event', 'Authentication', 'BannersService',
	function($scope, $sce, $upload, Images, YT_event, Authentication, BannersService) {

        $scope.authentication = Authentication;

        // Find a list of Banners
        $scope.find = function() {
            $scope.banners = BannersService.query(
                function(){
                    $scope.banners.forEach(function(data){
                        if(data.bannerTag=="")
                            data.bannerTag = "<div class='core-subtitle'>" + data.name + "</div>";
                    });
                }
            );
        };

        //assign trustAsHtml function
        $scope.trustAsHtml = $sce.trustAsHtml;

        $scope.editorOptions = {
            language: 'ru',
            uiColor: '#000000'
        };

        // YouTube Directive Setting Start
        $scope.YT_event = YT_event;

        // Define Play List
        $scope.playList = [
            {id: 0, videoid: 'YMp8uYvZNZc', name:'Unji and let me go(Remastered Ver.)'},
            {id: 1, videoid: 'DRSFtoEyTio', name:'금요일 밤'},
            {id: 2,videoid: 'YMp8uYvZNZc', name: 'Rapstar'},
            {id: 3, videoid: '91gHDmn3RBw', name: 'Rapstar'},
            {id: 4, videoid: 'AtbS9CXX2WM', name: 'Control the gravity'},
            {id: 5, videoid: 'JwkqhfVkk0I', name: 'Shake that'}//,
            //{id: 6, videoid: 'i7kIF6WGe9U', name: '금요일밤'},
            //{id: 7, videoid: 'vYibVU6Wbas', name: '응디시티'}
        ];

        $scope.selectSong = function(id) {
            if($scope.crntSong.id !== id ) {
                $scope.crntSong = $scope.playList[id];
            }
        };

        $scope.crntSong = $scope.playList[0];

        $scope.yt = {
            width: 235,
            height: 34,
            videoid: 'YMp8uYvTZNZc',
            playerStatus: 'NOT PLAYING'
        };

        $scope.sendControlEvent2 = function (ctrlEvent) {
            this.$broadcast(ctrlEvent);
        };

        $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
            $scope.yt.playerStatus = data;
        });
        // YouTube Directive Setting End

        $scope.image = Images.list(function(image){
            console.log(image);
            //$scope.image = image;
        });

        $scope.clickButton = function(){
            $scope.$emit('Click');
        }

        $scope.editMode = false;

        $scope.clickBtn = function ($event){
            if(!$scope.editMode)
                $scope.editMode = true;
            else
                $scope.editMode = false;
        }
	}
]);
