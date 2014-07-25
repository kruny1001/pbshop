'use strict';

angular.module('galleries').controller('TestpolymerController', ['$scope', 'polymerPost',
	function($scope, polymerPost) {
		// Test polymer controller logic
		// ...

        $scope.toggleDialog = function(transition) {
            var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
            dialog.toggle();
        };

        $scope.posts = polymerPost.getAllPosts();

        $scope.getAllUsers = function(){
            $scope.posts = polymerPost.getAllPosts();
        };

        $scope.getFavorites = function() {
            $scope.posts = [];
            $scope.posts.push(polymerPost.getPost(2));
        };

        $scope.clickFavorit = function(){
          console.log('!!');
        };

        $scope.testClick = function() {
            console.log('Clicked Button');
        }
	}
]);