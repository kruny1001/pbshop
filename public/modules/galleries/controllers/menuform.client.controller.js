/**
 * Created by KevinSo on 8/11/2014.
 */

'use strict';

angular.module('galleries').controller('MenuformController', ['$scope', function($scope) {
    $scope.title = 'Menu Form';

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }

    };

    $scope.map = {
        center: {
            latitude: 44.9745411,
            longitude: -93.2472289
        },
        zoom: 16
    };
}]);