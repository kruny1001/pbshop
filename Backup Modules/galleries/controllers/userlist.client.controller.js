'use strict';

angular.module('galleries').controller('UserlistController', ['$scope','testuserlist','ContactService','Authentication','Listusers',
	function($scope, testuserlist, ContactService, Authentication, Listusers) {
        $scope.authentication = Authentication;

        $scope.users = testuserlist.users;
        //$scope.galleries = Listusers.query();

        $scope.contacts = ContactService.list();

        $scope.saveContact = function () {
            ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        };

        $scope.delete = function (id) {

            ContactService.delete(id);
            if ($scope.newcontact.id === id) $scope.newcontact = {};
        };

        $scope.edit = function (id) {
            $scope.newcontact = angular.copy(ContactService.get(id));
        };

        // Find a list of Galleries
        $scope.find = function() {
            $scope.galleries = Listusers.query();
        };
	}
]);