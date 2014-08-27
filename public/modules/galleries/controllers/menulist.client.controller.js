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
                title:'Info1',
                description: 'avatar1',
                pic:'/modules/galleries/img/avatar-01.svg',
                location:'',
                Phone: '612-000-0001',
                AverageScore: 5
            },
            {
                title:'Info2',
                description: 'avatar2',
                pic:'/modules/galleries/img/avatar-02.svg',
                location:'',
                Phone: '612-000-0002',
                AverageScore: 5
            },
            {
                title:'Info3',
                description: 'avatar3',
                pic:'/modules/galleries/img/avatar-03.svg',
                location:'',
                Phone: '612-000-0003',
                AverageScore: 5
            },
            {
                title:'Info4',
                description: 'avatar4',
                pic:'/modules/galleries/img/avatar-04.svg',
                location:'',
                Phone: '612-000-0004',
                AverageScore: 5
            },
            {
                title:'Info5',
                description: 'avatar5',
                pic:'/modules/galleries/img/avatar-05.svg',
                location:'',
                Phone: '612-000-0005',
                AverageScore: 5
            },
            {
                title:'Info6',
                description: 'avatar6',
                pic:'/modules/galleries/img/avatar-06.svg',
                location:'',
                Phone: '612-000-0006',
                AverageScore: 5
            },
            {
                title:'Info7',
                description: 'avatar',
                pic:'/modules/galleries/img/avatar-07.svg',
                location:'',
                Phone: '612-000-0007',
                AverageScore: 5
            },
            {
                title:'Info6',
                description: 'avatar',
                pic:'/modules/galleries/img/avatar-08.svg',
                location:'',
                Phone: '612-000-0008',
                AverageScore: 5
            }
        ];
	}
]);