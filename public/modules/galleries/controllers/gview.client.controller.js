'use strict';

angular.module('galleries').controller('GviewController', ['$scope','$http','YT_event',
	function($scope, $http, YT_event) {
        $scope.photos = [
            {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
            {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
            {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"}
        ];

        $scope.template =
            '<div deckgrid class="deckgrid" source="photos">'+
                '<div class="a-card">' +
                    '<h1>{{card.title}}</h1>' +
                    '<img src="" data-ng-src="{{card.src}}">'+
                '</div>' +
            '</div>'

        $scope.items = [
            {
                'id': 0,
                'picture': 'http://placehold.it/32x32',
                'age': 31,
                'name': 'Mathews Goff'
            },
            {
                'id': 1,
                'picture': 'http://placehold.it/32x32',
                'age': 36,
                'name': 'Collins Alston'
            },
            {
                'id': 2,
                'picture': 'http://placehold.it/32x32',
                'age': 27,
                'name': 'Jasmine Rollins'
            },
            {
                'id': 3,
                'picture': 'http://placehold.it/32x32',
                'age': 32,
                'name': 'Julie Jefferson'
            },
            {
                'id': 4,
                'picture': 'http://placehold.it/32x32',
                'age': 23,
                'name': 'Wilder King'
            },
            {
                'id': 5,
                'picture': 'http://placehold.it/32x32',
                'age': 23,
                'name': 'Stanley Moore'
            },
            {
                'id': 6,
                'picture': 'http://placehold.it/32x32',
                'age': 36,
                'name': 'Reynolds Bishop'
            },
            {
                'id': 7,
                'picture': 'http://placehold.it/32x32',
                'age': 26,
                'name': 'Bryant Flowers'
            },
            {
                'id': 8,
                'picture': 'http://placehold.it/32x32',
                'age': 38,
                'name': 'Jenifer Martinez'
            },
            {
                'id': 9,
                'picture': 'http://placehold.it/32x32',
                'age': 40,
                'name': 'Mcguire Pittman'
            },
            {
                'id': 10,
                'picture': 'http://placehold.it/32x32',
                'age': 34,
                'name': 'Valdez Hyde'
            },
            {
                'id': 11,
                'picture': 'http://placehold.it/32x32',
                'age': 34,
                'name': 'Marla Mayo'
            },
            {
                'id': 12,
                'picture': 'http://placehold.it/32x32',
                'age': 30,
                'name': 'Brown Ortega'
            },
            {
                'id': 13,
                'picture': 'http://placehold.it/32x32',
                'age': 32,
                'name': 'Jeannette William'
            },
            {
                'id': 14,
                'picture': 'http://placehold.it/32x32',
                'age': 30,
                'name': 'Bridges Ashley'
            },
            {
                'id': 15,
                'picture': 'http://placehold.it/32x32',
                'age': 33,
                'name': 'Latasha Hewitt'
            },
            {
                'id': 16,
                'picture': 'http://placehold.it/32x32',
                'age': 35,
                'name': 'Alma Sawyer'
            },
            {
                'id': 17,
                'picture': 'http://placehold.it/32x32',
                'age': 21,
                'name': 'Liz Mcbride'
            },
            {
                'id': 18,
                'picture': 'http://placehold.it/32x32',
                'age': 26,
                'name': 'Mcintosh Chandler'
            },
            {
                'id': 19,
                'picture': 'http://placehold.it/32x32',
                'age': 20,
                'name': 'Alford Hartman'
            },
            {
                'id': 20,
                'picture': 'http://placehold.it/32x32',
                'age': 29,
                'name': 'Tiffany Green'
            },
            {
                'id': 21,
                'picture': 'http://placehold.it/32x32',
                'age': 38,
                'name': 'Stafford Riggs'
            },
            {
                'id': 22,
                'picture': 'http://placehold.it/32x32',
                'age': 40,
                'name': 'Elinor Chambers'
            },
            {
                'id': 23,
                'picture': 'http://placehold.it/32x32',
                'age': 27,
                'name': 'Carly Howard'
            },
            {
                'id': 24,
                'picture': 'http://placehold.it/32x32',
                'age': 27,
                'name': 'Rosalind Sanchez'
            },
            {
                'id': 25,
                'picture': 'http://placehold.it/32x32',
                'age': 28,
                'name': 'Jaclyn Shelton'
            },
            {
                'id': 26,
                'picture': 'http://placehold.it/32x32',
                'age': 25,
                'name': 'Hughes Phelps'
            },
            {
                'id': 27,
                'picture': 'http://placehold.it/32x32',
                'age': 36,
                'name': 'Rosetta Barrett'
            },
            {
                'id': 28,
                'picture': 'http://placehold.it/32x32',
                'age': 29,
                'name': 'Jarvis Wong'
            },
            {
                'id': 29,
                'picture': 'http://placehold.it/32x32',
                'age': 23,
                'name': 'Kerri Pennington'
            }
        ];

        //Test input sets
        $scope.description = 'This is the descritpion';
        $scope.name = 'George & The Dragon';
        $scope.location = '813 W 50th St Minneapolis, MN 55419';
        $scope.hours = ["Mon	11:00 am - 10:00 pm" ,
                        "Tue	11:00 am - 10:00 pm" ,
                        "Wed	11:00 am - 10:00 pm" ,
                        "Thu	11:00 am - 10:00 pm" ,
                        "Fri	11:00 am - 11:00 pm" ,
                        "Sat	11:00 am - 11:00 pm	Open now",
                        'Sun	9:00 am - 2:00 pm']
        $scope.menus = 'http://www.ganddpub.com/menus/main.pdf';
        $scope.introduction = '';

        $scope.yt = {
            width: 600,
            height: 480,
            videoid: 'M7lc1UVf-VE',
            playerStatus: 'NOT PLAYING'
        };

        $scope.YT_event = YT_event;

        $scope.sendControlEvent = function (ctrlEvent) {
            this.$broadcast(ctrlEvent);
        };

        $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
            $scope.yt.playerStatus = data;
        });

        /**
         * DRAG event handler
         */
        $scope.onDrag = function(value) {
            $scope.currentRotation = value;
        };

        /**
         * DRAG END event handler
         */
        $scope.onDragEnd = function(value) {
            $scope.currentRotation = value;
            console.log ('DRAG_END', value)
        };

        $scope.testDraggable = function(){
        }

        $scope.expandAnimation = function(element) {
            console.log('!!');
            var t1 = new TimelineMax();
            //append a to() tween
            //t1.to(element.currentTarget, 0.5, {width:'50px'});
            //add another sequenced tween (by default, tweens are added to the end of the timeline which makes sequencing simple)
            //t1.to(element.currentTarget, 0.5, {height:'60px', ease:Elastic.easeOut});
            //offset the next tween by 0.75 seconds so there's a gap between the end of the previous tween and this new one
            t1.to(element.currentTarget, 0.2, {opacity:0.5}, '+=0.75');
            //overlap the next tween with the previous one by 0.5 seconds (notice the negative offset at the end)
            //t1.to(element.currentTarget, 0.2, {backgroundColor:'#FF0000'}, '-=0.5');
            //animate 3 elements (e1, e2, and e3) to a rotation of 60 degrees, and stagger their start times by 0.2 seconds
            //t1.staggerTo(element.currentTarget, 1, {rotation:60}, 0.2);
            t1.to(element.currentTarget, 0.2, {left:'20px', repeat:1, yoyo:true});
            t1.to(element.currentTarget, 0.2, {right:'20px', repeat:1, yoyo:true});

            t1.restart();
            //t1.reverse(2.5)
        };
    }
]);