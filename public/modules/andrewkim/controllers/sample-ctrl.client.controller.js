'use strict';

angular.module('andrewkim').controller('SampleCtrlController', ['$scope', '$firebase',
	function($scope, $firebase) {
		// Sample ctrl controller logic
		// ...
        var ref = new Firebase('https://restapi.firebaseio.com/');

        // create an AngularFile reference to the data
        var sync = $firebase(ref);

        // download the data into a local object
        var syncObject = sync.$asObject();

        //synchronize the object with a three-way data binding
        //click on 'index.html' above to see it used in the DOM!
        syncObject.$bindTo($scope, 'data');
        $scope.data = sync.$asObject();

	}
]);