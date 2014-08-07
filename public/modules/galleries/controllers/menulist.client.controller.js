'use strict';

angular.module('galleries').controller('MenulistController', ['$scope',
	function($scope) {
		// Menulist controller controller logic
		// ...
        $scope.menuPic = true;

        $scope.isHidden = false;
        $scope.fadeIt = function() {
            $scope.isHidden = !$scope.isHidden;
        }

        $scope.contents = [
            {
                title:'pic1',
                description: 'avatar1',
                pic:'/modules/galleries/img/avatar-01.svg'
            },
            {
                title:'pic2',
                description: 'avatar2',
                pic:'/modules/galleries/img/avatar-02.svg'
            },
            {
                title:'pic3',
                description: 'avatar3',
                pic:'/modules/galleries/img/avatar-03.svg'
            },
            {
                title:'pic4',
                description: 'avatar4',
                pic:'/modules/galleries/img/avatar-04.svg'
            },
            {
                title:'pic5',
                description: 'avatar5',
                pic:'/modules/galleries/img/avatar-05.svg'
            },
            {
                title:'pic6',
                description: 'avatar6',
                pic:'/modules/galleries/img/avatar-06.svg'
            },
            {
                title:'pic7',
                description: 'avatar',
                pic:'/modules/galleries/img/avatar-07.svg'
            },
            {
                title:'pic8',
                description: 'avatar',
                pic:'/modules/galleries/img/avatar-08.svg'
            }
        ];
	}
]);