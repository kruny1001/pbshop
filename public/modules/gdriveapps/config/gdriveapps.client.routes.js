'use strict';

//Setting up route
angular.module('gdriveapps').config(['$stateProvider',
	function($stateProvider) {
		// Gdriveapps state routing
		$stateProvider.
		state('listGdriveapps', {
			url: '/gdriveapps',
			templateUrl: 'modules/gdriveapps/views/list-gdriveapps.client.view.html'
		}).
		state('createGdriveapp', {
                url: '/gdriveapps/create',
			templateUrl: 'modules/gdriveapps/views/create-gdriveapp.client.view.html'
		}).
		state('viewGdriveapp', {
			url: '/gdriveapps/:gdriveappId',
			templateUrl: 'modules/gdriveapps/views/view-gdriveapp.client.view.html'
		}).
		state('editGdriveapp', {
			url: '/gdriveapps/:gdriveappId/edit',
			templateUrl: 'modules/gdriveapps/views/edit-gdriveapp.client.view.html'
		})/*.

        state('createFile', {
            url: '/create',
            templateUrl:'modules/gdriveapps/views/create-doc.client.view.html',
            controller: 'CreateDocController'
        }).
        state('installTodo', {
            url: '/install',
            templateUrl:'modules/gdriveapps/views/install-todo.client.view.html',
            controller: 'InstallTodoController'
        }).
        state('todoState',{
            url:'/todos/:fileId/:filter',
            templateUrl:'modules/gdriveapps/views/install-todo.client.view.html',
            controller:'todoController',
            resolve: {
                //realtimeDocument: app.loadFile
            }
        })*/;
	}
]);