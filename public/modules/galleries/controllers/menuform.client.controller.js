/**
 * Created by KevinSo on 8/11/2014.
 */

'use strict';

angular.module('galleries').controller('MenuformController', ['$scope', function($scope) {
    $scope.title = 'Form Steps';
    $scope.user = {
        name:'Kevin',
        username: 'kruny1001',
        email: 'test@test.com',
        address: '123 1st st. M 12345'
    }

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }
    };

    $scope.finishedWizard = function() {
      console.debug('End of Quiz');
    };

    $scope.map = {
        center: {
            latitude: 44.9745411,
            longitude: -93.2472289
        },
        zoom: 16
    };
}]);