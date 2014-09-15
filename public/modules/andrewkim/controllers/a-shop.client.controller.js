'use strict';

angular.module('andrewkim').controller('AShopController', ['$scope','Customers', 'Products', 'Rental',
	function($scope, Customers, Products, Rental) {
        console.log('Customers, Products and Rental class Testing');
        var products = new Products("Forgetting Sarah Marshall", "regular");
        console.log(products.title);

        var customer = new Customers("Brett");
        var products   = new Products("Forgetting Sarah Marshall", "regular");
        var rental   = new Rental(customer, products, 5);
        console.log(customer.statement());

        var customer = new Customers("Brett");
        var products   = new Products("Forgetting Sarah Marshall", "regular");
        var rental   = new Rental(customer, products, 2);
        console.log(customer.statement());

        var products    = new Products("Forgetting Sarah Marshall", "regular");
        var rental   = new Rental(customer, products, 5);

        console.log(customer.statement());
	}
]);