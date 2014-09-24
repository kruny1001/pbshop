'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies =
        [
            'ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ui.calendar',
            /*'google-maps',*/ 'mgo-angular-wizard', /*'angularFileUpload',*/
            'smart-table', 'ui.ace', 'ngSanitize','textAngular', 'firebase'
        ];

	// Add a new vertical module
	var registerModule = function(moduleName) {
		// Create angular module
		angular.module(moduleName, []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();