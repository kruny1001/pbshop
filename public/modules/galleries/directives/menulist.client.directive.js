/**
 * Created by KevinSo on 8/6/2014.
 */

'use strict';

angular.module('galleries').directive('menulist', [
    function() {
        return {

            restrict: 'E',
            scope:{
                'source' :'='
            },
            templateUrl: '/modules/galleries/directives/menulist/menulist.html',
            link: function postLink(scope, element, attrs) {
             // Product description directive logic
             // ...
            //element.text('this is the productDescription directive');
            }

        };
    }
]);