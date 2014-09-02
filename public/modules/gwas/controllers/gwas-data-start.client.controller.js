'use strict';

angular.module('gwas').controller('GwasdatastartController', ['$scope','Gwas',
	function($scope,Gwas) {

        $scope.rowCollection = [
            {firstName: 'Kevin', lastName: 'Son', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
            {firstName: 'Kenny', lastName: 'Park', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
            {firstName: 'Robert', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
        ];

        $scope.removeRow = function removeRow(row) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        }

        $scope.find = function() {
            $scope.Users = Gwas.query();
            //console.log($scope.Users);
        };
	}
]);