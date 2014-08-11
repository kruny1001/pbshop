'use strict';

//Setting up route
angular.module('galleries').config(['$stateProvider',
    function($stateProvider) {
        // Galleries state routing
        $stateProvider.
		state('menulist', {
			url: '/menulist',
			templateUrl: 'modules/galleries/views/menulist.client.view.html'
		}).
        state('menuform', {
            url: '/menulist/menuform',
            templateUrl: 'modules/galleries/views/menuform.client.view.html'
        }).
		state('test-polymer', {
			url: '/test-polymer',
			templateUrl: 'modules/galleries/views/test-polymer.client.view.html'
		}).
		state('userlist', {
			url: '/galleries/userlist',
			templateUrl: 'modules/galleries/views/userlist.client.view.html'
		}).
		state('gview', {
			url: '/galleries/gview',
			templateUrl: 'modules/galleries/views/gview.client.view.html'
		}).
            state('listGalleries', {
                url: '/galleries',
                templateUrl: 'modules/galleries/views/list-galleries.client.view.html'
            }).
            state('createGallery', {
                url: '/galleries/create',
                templateUrl: 'modules/galleries/views/create-gallery.client.view.html'
            }).
            state('viewGallery', {
                url: '/galleries/:galleryId',
                templateUrl: 'modules/galleries/views/view-gallery.client.view.html'
            }).
            state('editGallery', {
                url: '/galleries/:galleryId/edit',
                templateUrl: 'modules/galleries/views/edit-gallery.client.view.html'
            });
    }
]);