/*
 * Created by Kevin on 2014-10-29.
* */

'use strict';

angular.module('gdriveapps').factory('Googledrive', ['configGdrive',
	function(configGdrive) {
		return {
			createFolder: createFolder,
			findFolder: findFolder,
			getGoogleDriveInfo: getGoogleDriveInfo,
			setupPicker: setupPicker,
			listFolder: listFolder
		};

		function createFolder(FolderName, accessToken){
			var request = gapi.client.request({
				'path': '/drive/v2/files/',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken
				},
				'body':{
					"title" : FolderName,
					"mimeType" : "application/vnd.google-apps.folder"
				}
			});
			request.execute(function(resp) {
				console.log(resp);
			});
		}

		// Search Folder
		function findFolder(callback){
			gapi.client.load('drive', 'v2').then(function(){
				var request = gapi.client.drive.files.list({
					q: "title contains 'URI-'",
					fields: 'items(id\,title)'
				});
				request.then(function(resp){
					//console.log('result File list');
					//console.log(resp);
					callback(resp);
				});
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

		//Google File Picker Platform
		function setupPicker(accessToken, callback){
			var callbackAfterFindFolder = function(resp){
				var folderID = resp.result.items[0].id;
				var picker = new google.picker.PickerBuilder()
					.setOAuthToken(accessToken)
					.setDeveloperKey(configGdrive.developerKey)
					.addView(new google.picker.DocsUploadView().setParent(folderID))
					.addView(new google.picker.DocsView().setParent(folderID))
					.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
					//.enableFeature(google.picker.Feature.NAV_HIDDEN)
					.setCallback(callback)
					.build();
				picker.setVisible(true);
			}
			findFolder(callbackAfterFindFolder);


		}

		function listFolder(){
			gapi.client.load('drive', 'v2').then(function() {

				var request = gapi.client.drive.files.list({
					maxResults:10,
					fields: 'items(id,owners(displayName,emailAddress,isAuthenticatedUser,kind,permissionId),selfLink)'
				});
				request.then(function(resp){
					console.log('result File list');
					console.log(resp)
				});

				var request = gapi.client.drive.files.list({
					maxResults:10,
					fields: 'items(id,owners(displayName,emailAddress,isAuthenticatedUser,kind,permissionId),selfLink)'
				});
				request.then(function(resp){
					console.log('result File list');
					console.log(resp)
				});

			});
		}
	}
]);