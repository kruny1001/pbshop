'use strict';

// Gdriveapps controller

angular.module('gdriveapps').constant('CONFIG', {
    clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
    apiKey: 'AIzaSyAFtN5UMzS3aYUfCgd6JoixOVZRORkM1zw',
    scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.install'
    ]
});

angular.module('gdriveapps').value('config', {
    clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
    apiKey: 'AIzaSyAFtN5UMzS3aYUfCgd6JoixOVZRORkM1zw',
    scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.install'
    ]});

angular.module('gdriveapps').controller('GdriveappsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Gdriveapps',
	function($scope, $stateParams, $location, Authentication, Gdriveapps ) {
		console.log($scope.authentication);
		// Create new Gdriveapp
		$scope.create = function() {
			// Create new Gdriveapp object
			var gdriveapp = new Gdriveapps ({
				name: this.name
			});

			// Redirect after save
			gdriveapp.$save(function(response) {
				$location.path('gdriveapps/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Gdriveapp
		$scope.remove = function( gdriveapp ) {
			if ( gdriveapp ) { gdriveapp.$remove();

				for (var i in $scope.gdriveapps ) {
					if ($scope.gdriveapps [i] === gdriveapp ) {
						$scope.gdriveapps.splice(i, 1);
					}
				}
			} else {
				$scope.gdriveapp.$remove(function() {
					$location.path('gdriveapps');
				});
			}
		};

		// Update existing Gdriveapp
		$scope.update = function() {
			var gdriveapp = $scope.gdriveapp ;

			gdriveapp.$update(function() {
				$location.path('gdriveapps/' + gdriveapp._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Gdriveapps
		$scope.find = function() {
			$scope.gdriveapps = Gdriveapps.query();
		};

		// Find existing Gdriveapp
		$scope.findOne = function() {
			$scope.gdriveapp = Gdriveapps.get({ 
				gdriveappId: $stateParams.gdriveappId
			});
		};
	}
]);