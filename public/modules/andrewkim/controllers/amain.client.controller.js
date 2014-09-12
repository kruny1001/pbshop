'use strict';

angular.module('andrewkim').constant('YT_event', {
    PLAY           : 0,
    STOP          : 1,
    PAUSE          : 2,
    STATUS_CHANGE  : 3
});

angular.module('andrewkim').controller('AmainController', ['$scope','$element', '$upload', 'Images', 'YT_event',
	function($scope, $element, $upload, Images, YT_event) {
        $scope.editorOptions = {
            language: 'ru',
            uiColor: '#000000'
        };

        // YouTube Directive Setting Start
        $scope.YT_event = YT_event;

        $scope.playList = [
            {id: 0, videoid: 'YMp8uYvZNZc', name:'Unji and let me go(Remastered Ver.)'},
            {id: 1, videoid: 'DRSFtoEyTio', name:'금요일 밤'},
            {id: 2,videoid: 'YMp8uYvZNZc', name: 'Rapstar'},
            {id: 3, videoid: '91gHDmn3RBw', name: 'Rapstar'},
            {id: 4, videoid: 'AtbS9CXX2WM', name: 'Control the gravity'},
            {id: 5, videoid: 'JwkqhfVkk0I', name: 'Shake that'},
            {id: 6, videoid: 'i7kIF6WGe9U', name: '금요일밤'},
            {id: 7, videoid: 'vYibVU6Wbas', name: '응디시티'}
        ];


        $scope.dd = function(id) {
            if($scope.crntSong.id !== id ) {
                $scope.crntSong = $scope.playList[id];
            }
        };

        $scope.crntSong = $scope.playList[0];

        $scope.yt = {
            width: 235,
            height: 34,
            videoid: 'YMp8uYvZNZc',
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

        $scope.slideActions = [
            {name:'TB', action:'TB'},
            {name:'BT', action:'BT'},
            {name:'LR', action:'RL'},
            {name:'RL', action:'RL'}
        ];


        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'server/upload/url', //upload.php script, node.js route, or servlet url
                    //method: 'POST' or 'PUT',
                    //headers: {'header-key': 'header-value'},
                    //withCredentials: true,
                    data: {myObj: $scope.myModelObj},
                    file: file // or list of files ($files) for html5 only
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                    // customize file formData name ('Content-Disposition'), server side file variable name.
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                    // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                });
                //.error(...)
                //.then(success, error, progress);
                // access or attach event listeners to the underlying XMLHttpRequest.
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})
            }
            /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
             It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        };



        ///////////
        /*
        if (typeof window.FileReader === 'undefined')
            alert('File API & FileReader not supported');

        var dropper = document.getElementById("dropper");
        var results = document.getElementById("results");

        dropper.ondragover = function () { dropper.className = 'hover'; return false; };
        dropper.ondragend = function () { dropper.className = ''; return false; };
        dropper.ondrop = function (e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0],
                reader = new FileReader();
            reader.onload = function(event) {
                fileLoaded(file.name, event.target.result);
            };
            reader.readAsDataURL(file);
            dropper.className = '';
            return false;
        };

        function fileLoaded(filename, dataUri) {

            var div = document.createElement("div");
            div.className = 'item';

            var remove = document.createElement("button");
            remove.className = 'remove';
            remove.innerHTML = 'x';
            remove.onclick = function() {
                if(localStorage) localStorage.removeItem(filename);
                results.removeChild(div);
            };
            div.appendChild(remove);

            var name = document.createElement("div");
            name.innerHTML = filename;
            div.appendChild(name);

            if(/^data:image/.test(dataUri)) {
                var imgDiv = document.createElement("div");
                var img = document.createElement("img");
                img.src = dataUri;
                img.style['max-width'] = '100px';
                img.style['height-width'] = '100px';
                imgDiv.appendChild(img);
                div.appendChild(imgDiv);
            }

            var ta = document.createElement("textarea");
            ta.onclick = function() {
                ta.select();
            };
            ta.value = dataUri;
            div.appendChild(ta);

            results.appendChild(div);
            if(localStorage) localStorage.setItem(filename, dataUri);
        }

        if(localStorage)
            for(var filename in localStorage)
                fileLoaded(filename, localStorage.getItem(filename));
        */


	}
]);