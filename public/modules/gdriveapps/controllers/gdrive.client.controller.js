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

angular.module('gdriveapps').controller('storage', ['$scope','$q', '$rootScope', 'configGdrive', function ($scope, $q, $rootScope, configGdrive) {
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
                console.log(accessToken);
                callGooglePlus();
                setFilePicker();
                listFolder();
                getGoogleDriveInfo();
                //setupPicker();

                //insertFile();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
            $scope.$digest();
        }

        function listFolder() {
            gapi.client.load('drive', 'v2').then(function() {
                console.log('drive is loaded');
                var request = gapi.client.drive.files.list({
                    maxResults:10,
                    fields: 'items(id,owners(displayName,emailAddress,isAuthenticatedUser,kind,permissionId),selfLink)'
                });
                request.then(function(resp){
                    console.log('result File list');
                    console.log(resp)
                })

            });
        }

        function getGoogleDriveInfo(){
            gapi.client.load('drive', 'v2').then(function() {
                var request = gapi.client.drive.about.get();
                request.execute(function (resp) {
                    console.log('Current user name: ' + resp.name);
                    console.log('Root folder ID: ' + resp.rootFolderId);
                    console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
                    console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
                });
            });
        }

        function setFilePicker() {
            var filePicker = document.getElementById('filePicker');

            filePicker.style.display = 'none';

            // Access token has been successfully retrieved, requests can be sent to the API.
            filePicker.style.display = 'block';
            filePicker.onchange = uploadFile;
        }

        function uploadFile(evt) {
            gapi.client.load('drive', 'v2', function() {
                var file = evt.target.files[0];
                insertFile(file);
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
                    'mimeType': contentType
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

        function callGooglePlus(){
            gapi.client.load('plus', 'v1').then(function() {
                // Step 5: Assemble the API request
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                // Step 6: Execute the API request
                request.then(function(resp) {
                    console.log(resp);
                    var heading = document.createElement('h4');
                    var image = document.createElement('img');
                    image.src = resp.result.image.url;
                    heading.appendChild(image);
                    heading.appendChild(document.createTextNode(resp.result.displayName));

                    document.getElementById('content').appendChild(heading);
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            });
        }

        $scope.setupPicker = function() {
            var picker = new google.picker.PickerBuilder()
                .setOAuthToken(accessToken)
                .setDeveloperKey(configGdrive.developerKey)
                .addView(new google.picker.DocsUploadView())
                .addView(new google.picker.DocsView())
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                //.enableFeature(google.picker.Feature.NAV_HIDDEN)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        }

        function listFilesGDrive(){

        }

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
    }]

);