/**
 * Created by Kevin on 2014-10-27.
Developing with the javascript Lib
 https://developers.google.com/api-client-library/javascript/dev/dev_jscript

 */

'use strict';

var CONFIG = {
    clientId: '574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com',
    developerKey: 'AIzaSyBEGA9BOSoo0DF69RNRh9MsMKDxaVlnT_U',
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/plus.me'
    ]
};
angular.module('gdriveapps').value('configGdrive', CONFIG);

angular.module('gdriveapps')
    .controller('storage', ['$scope','$http','$q', 'configGdrive', 'Googledrive', 'GooglePlus', function ($scope, $http, $q, configGdrive, Googledrive, GooglePlus) {
        var accessToken;
        $scope.authName = 'Authorize';
        $scope.isAuth = false;
        $scope.init = function init(){
            window.gapi.load('auth', $scope.authenticateWithGoogle);
            window.gapi.load('picker');
        }
        $scope.authenticateWithGoogle =function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes
            }, handleAuthentication);
        }
        function handleAuthentication(result){
            if(result && !result.error){
                $scope.isAuth = true;
                $scope.authName = 'Deauthorize';
                accessToken = result.access_token;
                //console.log(accessToken);

                /*
                callGooglePlus();
                setFilePicker();
                listFolder();
                getGoogleDriveInfo();
                createFolder();
                */
                createNewAccountFolder();
                setFilePicker();
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
            $scope.$digest();
        }

        function listFolder() {
            Googledrive.listFolder()
        }
/*
        function createFolder(){
            var folderName;
            Googledrive.createFolder(folderName, accessToken);
        }
*/
        function getGoogleDriveInfo(){
            Googledrive.getGoogleDriveInfo();
        }

        /// Custom file Picker Start
        function setFilePicker() {
            var filePicker = document.getElementById('filePicker');

            filePicker.style.display = 'none';

            // Access token has been successfully retrieved, requests can be sent to the API.
            filePicker.style.display = 'block';
            filePicker.onchange = uploadFile;
        }

        function uploadFile(evt) {
            var callback = function(file) {
                console.log('!!File!!');
                console.log(file);
            }
            gapi.client.load('drive', 'v2', function() {
                var file = evt.target.files[0];
                insertFile(file, callback);
            });
        }

        function insertFile(fileData, callback) {
            var boundary = '-------314159265358979323846';
            var delimiter = "\r\n--" + boundary + "\r\n";
            var close_delim = "\r\n--" + boundary + "--";

            var reader = new FileReader();
            reader.readAsBinaryString(fileData);
            reader.onload = function(e) {
                var contentType = fileData.type || 'application/octet-stream';
                var metadata = {
                    'title': fileData.name,
                    'mimeType': contentType,
                    'parents': [{
                        'kind': "drive#fileLink",
                        'id': "0B8FisuvAYPTfN1o1Q0d4T2JLTk0"
                    }]

                };

                var base64Data = btoa(reader.result);
                var multipartRequestBody =
                    delimiter +
                    'Content-Type: application/json\r\n\r\n' +
                    JSON.stringify(metadata) +
                    delimiter +
                    'Content-Type: ' + contentType + '\r\n' +
                    'Content-Transfer-Encoding: base64\r\n' +
                    '\r\n' +
                    base64Data +
                    close_delim;
                console.log(multipartRequestBody);

                var request = gapi.client.request({
                    'path': '/upload/drive/v2/files',
                    'method': 'POST',
                    'params': {'uploadType': 'multipart'},
                    'headers': {
                        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                    },
                    'body': multipartRequestBody});
                if (!callback) {
                    callback = function(file) {
                        console.log(file)
                    };
                }
                request.execute(callback);
            }
        }
        /// Custom file Picker End

        function callGooglePlus(){
            function callback(resp) {
                console.log(resp);
                var heading = document.createElement('h4');
                var image = document.createElement('img');
                image.src = resp.result.image.url;
                heading.appendChild(image);
                heading.appendChild(document.createTextNode(resp.result.displayName));

                document.getElementById('content').appendChild(heading);
            }
            GooglePlus.callGooglePlus(callback);
        }

        // Google PlatForm Service
        $scope.setupPicker = function() {
            function pickerCallback(data) {
                if(data.action == google.picker.Action.PICKED){
                    //do something
                    $scope.files = data.docs;
                    alert('URL: ' + data.docs[0].url);
                    $scope.$digest()
                }else if(data.action ==google.picker.Action.CANCEL){
                    alert('goodbye');
                }
            }
            Googledrive.setupPicker(accessToken, pickerCallback);
        }

        function createNewAccountFolder(){
            //Pre. Get User Information
            //check if there exists an
            // API /users/me (only allow to have)

            var callback = function(resp){
                console.log(resp.result.items.length);
                if(resp.result.items.length == 0){
                    $http.get('users/me')
                        .success(function(response) {
                            console.log(response);
                            var folderName = 'URI-'+response._id;
                            //1. Create A New Folder
                            Googledrive.createFolder(folderName, accessToken);
                            //2. Update User Information
                            //$http.get()
                        });
                }
                else{
                    console.log('there is already exist')
                    $scope.rootGdriveFolderID = resp.result.items[0].id
                    $scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }
    }]
);