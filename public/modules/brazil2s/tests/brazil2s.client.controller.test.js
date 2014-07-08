'use strict';

(function() {
	// Brazil2s Controller Spec
	describe('Brazil2s Controller Tests', function() {
		// Initialize global variables
		var Brazil2sController,
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

			// Initialize the Brazil2s controller.
			Brazil2sController = $controller('Brazil2sController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Brazil2 object fetched from XHR', inject(function(Brazil2s) {
			// Create sample Brazil2 using the Brazil2s service
			var sampleBrazil2 = new Brazil2s({
				name: 'New Brazil2'
			});

			// Create a sample Brazil2s array that includes the new Brazil2
			var sampleBrazil2s = [sampleBrazil2];

			// Set GET response
			$httpBackend.expectGET('brazil2s').respond(sampleBrazil2s);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.brazil2s).toEqualData(sampleBrazil2s);
		}));

		it('$scope.findOne() should create an array with one Brazil2 object fetched from XHR using a brazil2Id URL parameter', inject(function(Brazil2s) {
			// Define a sample Brazil2 object
			var sampleBrazil2 = new Brazil2s({
				name: 'New Brazil2'
			});

			// Set the URL parameter
			$stateParams.brazil2Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/brazil2s\/([0-9a-fA-F]{24})$/).respond(sampleBrazil2);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.brazil2).toEqualData(sampleBrazil2);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Brazil2s) {
			// Create a sample Brazil2 object
			var sampleBrazil2PostData = new Brazil2s({
				name: 'New Brazil2'
			});

			// Create a sample Brazil2 response
			var sampleBrazil2Response = new Brazil2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Brazil2'
			});

			// Fixture mock form input values
			scope.name = 'New Brazil2';

			// Set POST response
			$httpBackend.expectPOST('brazil2s', sampleBrazil2PostData).respond(sampleBrazil2Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Brazil2 was created
			expect($location.path()).toBe('/brazil2s/' + sampleBrazil2Response._id);
		}));

		it('$scope.update() should update a valid Brazil2', inject(function(Brazil2s) {
			// Define a sample Brazil2 put data
			var sampleBrazil2PutData = new Brazil2s({
				_id: '525cf20451979dea2c000001',
				name: 'New Brazil2'
			});

			// Mock Brazil2 in scope
			scope.brazil2 = sampleBrazil2PutData;

			// Set PUT response
			$httpBackend.expectPUT(/brazil2s\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/brazil2s/' + sampleBrazil2PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid brazil2Id and remove the Brazil2 from the scope', inject(function(Brazil2s) {
			// Create new Brazil2 object
			var sampleBrazil2 = new Brazil2s({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Brazil2s array and include the Brazil2
			scope.brazil2s = [sampleBrazil2];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/brazil2s\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBrazil2);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.brazil2s.length).toBe(0);
		}));
	});
}());