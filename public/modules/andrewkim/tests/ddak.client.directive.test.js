
'use strict';

(function() {
    // Amain Controller Spec
    describe('Hello World', function() {
        // Initialize global variables
        var scope,
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
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, $templateCache) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;


        }));

        var element;


        beforeEach(inject(function($compile, $rootScope){
            scope = $rootScope.$new();
            element = angular.element('<ddak banner-info={{banner._id}}></ddak>');
            $compile(element)(scope)

            $httpBackend.when('GET', 'modules/andrewkim/directives/ddak.html').respond('success');
            //$httpBackend.whenGET('/modules/andrewkim/directives/ddak.html').passThrough("an template for ddak");
        }))
        it("should equal 4", function() {



            $httpBackend.GET('modules/andrewkim/directives/ddak.html');
            $httpBackend.flush();
            scope.$digest();
            console.log(element.find('#info'));
            //console.log(element.find('.plain'));
            //console.log(element.find('#d1'));
            expect(element.html()).toBe();
        })
    });
}());
