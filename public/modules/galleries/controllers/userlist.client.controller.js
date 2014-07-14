'use strict';

angular.module('galleries').controller('UserlistController', ['$scope','testuserlist','ContactService',
	function($scope, testuserlist, ContactService) {
        $scope.users = testuserlist.users;

        $scope.contacts = ContactService.list();

        $scope.saveContact = function () {
            ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        }

        $scope.delete = function (id) {

            ContactService.delete(id);
            if ($scope.newcontact.id == id) $scope.newcontact = {};
        }

        $scope.edit = function (id) {
            $scope.newcontact = angular.copy(ContactService.get(id));
        }
	}
]);