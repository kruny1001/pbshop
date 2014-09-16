'use strict';

angular.module('andrewkim').factory('Images', ['$http',
	function($http) {
		return {
			list: function(callback) {
				/*
                $http({
                    method:'GET',
                    url:'/modules/andrewkim/data/main.json'
                    //cache:true
                }).success(function(data){console.log(data);})
                    .error(function(data, status){
                    console.log(data);
                    console.log(status);
                });*/
                return 'ddd';
			}
		};
	}
]);