'use strict';

(function() {
    // Products Controller Spec
    describe('Product and Banner Testing', function() {
        // Initialize global variables
        var ProductsController,
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
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_ ) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;




            // Initialize the Products controller.
            ProductsController = $controller('ProductsController', {
                $scope: scope
            });
        }));

        it('ensure CRUD controller functionalities', function(){
            expect(scope.remove).toBeDefined();
            expect(scope.authentication).toBeTruthy();
        });

        it('$scope.find() should create an array with at least one Product object fetched from XHR',
            inject(function(Products, Banners) {
                // Create sample Product using the Products service
                var sampleProduct = new Products({
                    name: 'New Product',
                    description: 'test',
                    price: 20,
                    imgs: 'Dd',
                    mainimg: 'dd'

                });

                var sampleBanner = new Banners({
                    name: 'New Banner',
                    bannerTag: '<h4>Hello</h4>'
                });

                // Create a sample Products array that includes the new Product
                var sampleBanners = [sampleBanner];
                var sampleProducts = [sampleProduct];

                $httpBackend.expectGET('products').respond(sampleProducts);
                $httpBackend.expectGET('banners').respond(sampleBanners);

                scope.find();
                scope.findBanners();

                $httpBackend.flush();
                // Test scope value

                expect(scope.banners).toEqualData(sampleBanners);
                expect(scope.products).toEqualData(sampleProducts);

                console.log(scope.banners[0]);
                console.log(scope.products);
            })
        );



    });
}());