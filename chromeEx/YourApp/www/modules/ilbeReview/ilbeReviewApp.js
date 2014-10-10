/**
 * Created by KevinSo on 10/10/2014.
 */

'use strict';
angular.module('ilbeReview', []);

angular.module('ilbeReview').provider('ilbeReviewReader',
    function(){
       this.$get = function($q, $http) {
           var self = this;
           return {
               extract: function() {
                   console.log('extractor');
                   var d = $q.defer();
                   $http({
                       method: 'GET',
                       url: 'http://www.ilbe.com/4451558715',
                       cache: true,
                       responseType: 'document'
                   }).success(function (data) {
                       d.resolve(data);
                   }).error(function (err) {
                       d.reject(err);
                   });
                   return d.promise;
               }
           }
       }
    });
angular.module('ilbeReview').controller('ilbeReviewCtrl', ['$scope', 'ilbeReviewReader',
    function($scope, ilbeReviewReader){
        $scope.controllerName = 'ilbeReview.mainCtrl';
        $scope.contents = '';

        ilbeReviewReader.extract().then(function(data){
            console.log(data);
            $scope.articles = $(data).find('#copy_layer_1').find('p, img');
            $scope.contents = $scope.articles.text();
            //$scope.articlesImg = $(data).find('#copy_layer_1').find('img');
            console.log('articles', $scope.articles);
            console.log($scope.articlesImg);
        });

        console.log('mainCtrl-ilbeReview');

    }
]);