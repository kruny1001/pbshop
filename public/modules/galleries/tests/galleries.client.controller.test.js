'use strict';

(function() {
	// Galleries Controller Spec
	describe('Galleries Controller Tests', function() {
		// Initialize global variables
		var GalleriesController,
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

			// Initialize the Galleries controller.
			GalleriesController = $controller('GalleriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gallery object fetched from XHR', inject(function(Galleries) {
			// Create sample Gallery using the Galleries service
			var sampleGallery = new Galleries({
				name: 'New Gallery'
			});

			// Create a sample Galleries array that includes the new Gallery
			var sampleGalleries = [sampleGallery];

			// Set GET response
			$httpBackend.expectGET('galleries').respond(sampleGalleries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.galleries).toEqualData(sampleGalleries);
		}));

		it('$scope.findOne() should create an array with one Gallery object fetched from XHR using a galleryId URL parameter', inject(function(Galleries) {
			// Define a sample Gallery object
			var sampleGallery = new Galleries({
				name: 'New Gallery'
			});

			// Set the URL parameter
			$stateParams.galleryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/galleries\/([0-9a-fA-F]{24})$/).respond(sampleGallery);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gallery).toEqualData(sampleGallery);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Galleries) {
			// Create a sample Gallery object
			var sampleGalleryPostData = new Galleries({
				name: 'New Gallery'
			});

			// Create a sample Gallery response
			var sampleGalleryResponse = new Galleries({
				_id: '525cf20451979dea2c000001',
				name: 'New Gallery'
			});

			// Fixture mock form input values
			scope.name = 'New Gallery';

			// Set POST response
			$httpBackend.expectPOST('galleries', sampleGalleryPostData).respond(sampleGalleryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Gallery was created
			expect($location.path()).toBe('/galleries/' + sampleGalleryResponse._id);
		}));

		it('$scope.update() should update a valid Gallery', inject(function(Galleries) {
			// Define a sample Gallery put data
			var sampleGalleryPutData = new Galleries({
				_id: '525cf20451979dea2c000001',
				name: 'New Gallery'
			});

			// Mock Gallery in scope
			scope.gallery = sampleGalleryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/galleries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/galleries/' + sampleGalleryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid galleryId and remove the Gallery from the scope', inject(function(Galleries) {
			// Create new Gallery object
			var sampleGallery = new Galleries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Galleries array and include the Gallery
			scope.galleries = [sampleGallery];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/galleries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGallery);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.galleries.length).toBe(0);
		}));
	});
}());