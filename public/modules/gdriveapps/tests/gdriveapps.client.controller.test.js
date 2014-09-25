'use strict';

(function() {
	// Gdriveapps Controller Spec
	describe('Gdriveapps Controller Tests', function() {
		// Initialize global variables
		var GdriveappsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Gdriveapps controller.
			GdriveappsController = $controller('GdriveappsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gdriveapp object fetched from XHR', inject(function(Gdriveapps) {
			// Create sample Gdriveapp using the Gdriveapps service
			var sampleGdriveapp = new Gdriveapps({
				name: 'New Gdriveapp'
			});

			// Create a sample Gdriveapps array that includes the new Gdriveapp
			var sampleGdriveapps = [sampleGdriveapp];

			// Set GET response
			$httpBackend.expectGET('gdriveapps').respond(sampleGdriveapps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gdriveapps).toEqualData(sampleGdriveapps);
		}));

		it('$scope.findOne() should create an array with one Gdriveapp object fetched from XHR using a gdriveappId URL parameter', inject(function(Gdriveapps) {
			// Define a sample Gdriveapp object
			var sampleGdriveapp = new Gdriveapps({
				name: 'New Gdriveapp'
			});

			// Set the URL parameter
			$stateParams.gdriveappId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/gdriveapps\/([0-9a-fA-F]{24})$/).respond(sampleGdriveapp);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gdriveapp).toEqualData(sampleGdriveapp);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Gdriveapps) {
			// Create a sample Gdriveapp object
			var sampleGdriveappPostData = new Gdriveapps({
				name: 'New Gdriveapp'
			});

			// Create a sample Gdriveapp response
			var sampleGdriveappResponse = new Gdriveapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Gdriveapp'
			});

			// Fixture mock form input values
			scope.name = 'New Gdriveapp';

			// Set POST response
			$httpBackend.expectPOST('gdriveapps', sampleGdriveappPostData).respond(sampleGdriveappResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Gdriveapp was created
			expect($location.path()).toBe('/gdriveapps/' + sampleGdriveappResponse._id);
		}));

		it('$scope.update() should update a valid Gdriveapp', inject(function(Gdriveapps) {
			// Define a sample Gdriveapp put data
			var sampleGdriveappPutData = new Gdriveapps({
				_id: '525cf20451979dea2c000001',
				name: 'New Gdriveapp'
			});

			// Mock Gdriveapp in scope
			scope.gdriveapp = sampleGdriveappPutData;

			// Set PUT response
			$httpBackend.expectPUT(/gdriveapps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gdriveapps/' + sampleGdriveappPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gdriveappId and remove the Gdriveapp from the scope', inject(function(Gdriveapps) {
			// Create new Gdriveapp object
			var sampleGdriveapp = new Gdriveapps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Gdriveapps array and include the Gdriveapp
			scope.gdriveapps = [sampleGdriveapp];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/gdriveapps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGdriveapp);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gdriveapps.length).toBe(0);
		}));
	});
}());