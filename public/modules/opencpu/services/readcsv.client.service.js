'use strict';

angular.module('opencpu').factory('Readcsv', ['$http',
    function($http) {
        return function Readcsv(fileName){
            this.id = _.uniqueId("csv");
            this.fileName = fileName;

            this.readFile = function(){
                //var URL = 'users/all';
                var URL = 'modules/opencpu/data/introduction.json';
                return $http.get(URL);
            }

            this.writeData = function(data){
                console.debug('wrtieData function is invoked');
                console.debug(data);
            }
		};
	}
]);