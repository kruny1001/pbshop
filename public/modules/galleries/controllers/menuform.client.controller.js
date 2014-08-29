/**
 * Created by KevinSo on 8/11/2014.
 */

'use strict';

angular.module('galleries').controller('MenuformController', ['$scope','$upload', '$element', function($scope, $upload, $element) {
    $scope.title = 'Form Steps';
    $scope.user = {
        name:'Kevin',
        username: 'kruny1001',
        email: 'test@test.com',
        address: '123 1st st. M 12345'
    }

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }
    };

    $scope.finishedWizard = function() {
      console.debug('End of Quiz');
    };

    $scope.map = {
        center: {
            latitude: 44.9745411,
            longitude: -93.2472289
        },
        zoom: 16
    };

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
                file: file, // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Desposition'), server side file variable name.
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

    $scope.cells= [
        { name: 'NE', id: 1 },
        { name: 'NW', id: 2 },
        { name: 'SE', id: 3 },
        { name: 'SW', id: 4 }
    ];

    /*
    $scope.test1 = function test1(ele){
        console.log(ele);
        //console.log(this);
        TweenMax.to(ele.fromElement, .2, {opacity:0.2});
    };
    $scope.test2 = function test2(ele){
        console.log(ele);
        //console.log(this);
        TweenMax.to(ele.fromElement, .2, {opacity:1});
    }
    */
}]);