/**
 * Created by Kevin on 2014-10-27.
 */

'use strict';

var CONFIG = {
    clientId: '574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com',
    developerKey: 'AIzaSyDJm_DwVOeyGFn0nscjK3FK6GymBfQC6S4',
    scopes: [
        'https://www.googleapis.com/auth/drive'
    ]
};

angular.module('gdriveapps').value('config', CONFIG);

angular.module('gdriveapps').controller('storage', ['$q', '$rootScope', 'config', function ($q, $rootScope, config) {
        var accessToken;
        function onApiLoad(){
            window.gapi.load('auth', authenticateWithGoogle);
            window.gapi.load('picker');
        }

        function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': config.clientId,
                'scope':['https://www.googleapis.com/auth/drive']
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            if(result && !result.error){
                accessToken = result.access_token;
                console.log(accessToken);
                setupPicker();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
        }

        function setupPicker() {
            var picker = new google.picker.PickerBuilder()
                .setOAuthToken(accessToken)
                .setDeveloperKey(config.developerKey)
                .addView(new google.picker.DocsUploadView())
                .addView(new google.picker.DocsView())
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                //.enableFeature(google.picker.Feature.NAV_HIDDEN)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        }

        function pickerCallback(data) {
            if(data.action == google.picker.Action.PICKED){
                //do something
                alert('URL: ' + data.docs[0].url);
            }else if(data.action ==google.picker.Action.CANCEL){
                alert('goodbye');
            }

        }

        onApiLoad();
    }]
);