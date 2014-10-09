/**
 * Created by KevinSo on 10/9/2014.
 */

var productService = angular.module('product.services', []);

productService.factory('ProductServiceEntry', function($resource){
    return $resource('http://kevangular.herokuapp.com/banners/:id', {id: '@_id'}, {});
});

//http://kevangular.herokuapp.com/products/list/
productService.factory('ProductServiceDetailEntry', function($resource){
    return $resource('http://kevangular.herokuapp.com/products/list/:id', {id: '@_id'}, {
        'list':  {
            method:'GET',
            responseType: "json",
            isArray:true
        }
    });
});

productService.controller('ProductTestCtrl', function($scope, ProductServiceEntry) {
    //get() returns a single entry
    var entry = ProductServiceEntry.get({id:$scope.id}, function(){
        console.log(entry);
    });

    //query() returns all the entries
    var entries = ProductServiceEntry.query(function(){
        console.log(entries);
    });

    //You can instantiate resource class
    $scope.entry = new ProductServiceEntry();

    $scope.entry.data = 'some data';

    ProductServiceEntry.save($scope.entry, function(){
        //data saved. do something here.
    }); //saves an entry. Assuming $scope.entry is the Entry obj

});