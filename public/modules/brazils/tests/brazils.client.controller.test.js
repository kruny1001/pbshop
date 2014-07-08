'use strict';

(function() {
	// Brazils Controller Spec
	describe('Brazils Controller Tests', function() {
		// Initialize global variables
		var BrazilsController,
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

			// Initialize the Brazils controller.
			BrazilsController = $controller('BrazilsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Brazil object fetched from XHR', inject(function(Brazils) {
			// Create sample Brazil using the Brazils service
			var sampleBrazil = new Brazils({
				name: 'New Brazil'
			});

			// Create a sample Brazils array that includes the new Brazil
			var sampleBrazils = [sampleBrazil];

			// Set GET response
			$httpBackend.expectGET('brazils').respond(sampleBrazils);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.brazils).toEqualData(sampleBrazils);
		}));

		it('$scope.findOne() should create an array with one Brazil object fetched from XHR using a brazilId URL parameter', inject(function(Brazils) {
			// Define a sample Brazil object
			var sampleBrazil = new Brazils({
				name: 'New Brazil'
			});

			// Set the URL parameter
			$stateParams.brazilId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/brazils\/([0-9a-fA-F]{24})$/).respond(sampleBrazil);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.brazil).toEqualData(sampleBrazil);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Brazils) {
			// Create a sample Brazil object
			var sampleBrazilPostData = new Brazils({
				name: 'New Brazil'
			});

			// Create a sample Brazil response
			var sampleBrazilResponse = new Brazils({
				_id: '525cf20451979dea2c000001',
				name: 'New Brazil'
			});

			// Fixture mock form input values
			scope.name = 'New Brazil';

			// Set POST response
			$httpBackend.expectPOST('brazils', sampleBrazilPostData).respond(sampleBrazilResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Brazil was created
			expect($location.path()).toBe('/brazils/' + sampleBrazilResponse._id);
		}));

		it('$scope.update() should update a valid Brazil', inject(function(Brazils) {
			// Define a sample Brazil put data
			var sampleBrazilPutData = new Brazils({
				_id: '525cf20451979dea2c000001',
				name: 'New Brazil'
			});

			// Mock Brazil in scope
			scope.brazil = sampleBrazilPutData;

			// Set PUT response
			$httpBackend.expectPUT(/brazils\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/brazils/' + sampleBrazilPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid brazilId and remove the Brazil from the scope', inject(function(Brazils) {
			// Create new Brazil object
			var sampleBrazil = new Brazils({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Brazils array and include the Brazil
			scope.brazils = [sampleBrazil];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/brazils\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBrazil);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.brazils.length).toBe(0);
		}));
	});
}());