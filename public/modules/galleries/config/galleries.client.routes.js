'use strict';

//Setting up route
angular.module('galleries').config(['$stateProvider',
    function($stateProvider) {
        // Galleries state routing
        $stateProvider.
            state('listGalleries', {
                url: '/galleries',
                templateUrl: 'modules/galleries/views/list-galleries.client.view.html'
            }).
            state('testGallery', {
                url: '/galleries/test',
                templateUrl: 'modules/galleries/views/test-gallery.client.view.html'
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