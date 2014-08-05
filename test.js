/**
 * Created by Kevin on 8/5/2014.
 */

angular.module('timesTableApp', [])
angular.module('timesTableApp')
    .controller('mulPageCtrl',function($scope){
        $scope.message = 'Hello World';
    })
    .directive('timesTable', function() {
        return {
            restrict: 'A',
            controller: 'mulPageCtrl',
            transclude: true,
            template: '<div ng-repeat="mytime in myTimesTable" ng-click="click(this)" ctrl_data="message">'+
                '<table style="width:300px">'+
                '<tr>' +
                '<th colspan="3">{{mytime}} Times Table</th>'+
                '</tr>'+
                '<tr>'+
                '<td>times</td>'+
                '<td>Number of multiply</td>'+
                '<td>Result</td>'+
                '</tr>'+
                '<tr ng-repeat="curMultiply in multiply">'+
                '<td>{{mytime}}</td>'+
                '<td>{{curMultiply}}</td>' +
                '<td>{{mul(mytime,curMultiply)}}</td>' +
                '</tr>' +
                '</table>'+
                '<br />'+
                '</div>',
            link: {
                pre: function preLink(a,b,c,d) {
                },
                post: function postLink(a,b,c,d) {
                    a.myTimesTable = [2, 3, 4, 5, 6, 7, 8, 9];
                    a.multiply = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    a.click = function (scope) {
                        console.log('!!');
                        console.log(scope);
                    }
                    a.mul = function(a1,b){
                        return a1*b;
                    }
                }
            }
        };
    });
