'use strict';

angular.module('galleries').controller('TestpolymerController', ['$scope', 'coursesDataSvc', 'polymerPost',
	function($scope, coursesDataSvc, polymerPost) {
		// Test polymer controller logic
		// ...

        $scope.toggleDialog = function(transition) {
            var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
            dialog.toggle();
        }
        $scope.posts = polymerPost.getAllPosts();
        $scope.courses=coursesDataSvc.getAllCourses();
	}
])
    .factory('polymerPost', function(){
        var posts = [
            {
                "uid": 1,
                "text" : "Have you heard about the Web Components revolution?",
                "username" : "Eric",
                "avatar" : "/modules/galleries/img/avatar-01.svg",
                "favorite": false
            },
            {
                "uid": 2,
                "text" : "Loving this Polymer thing.",
                "username" : "Rob",
                "avatar" : "/modules/galleries/img/avatar-02.svg",
                "favorite": false
            },
            {
                "uid": 3,
                "text" : "So last year...",
                "username" : "Dimitri",
                "avatar" : "/modules/galleries/img/avatar-03.svg",
                "favorite": false
            },
            {
                "uid": 4,
                "text" : "Pretty sure I came up with that first.",
                "username" : "Ada",
                "avatar" : "/modules/galleries/img/avatar-07.svg",
                "favorite": false
            },
            {
                "uid": 5,
                "text" : "Yo, I heard you like components, so I put a component in your component.",
                "username" : "Grace",
                "avatar" : "/modules/galleries/img/avatar-08.svg",
                "favorite": false
            },
            {
                "uid": 6,
                "text" : "Centralize, centrailize.",
                "username" : "John",
                "avatar" : "/modules/galleries/img/avatar-04.svg",
                "favorite": false
            },
            {
                "uid": 7,
                "text" : "Has anyone seen my cat?",
                "username" : "Zelda",
                "avatar" : "/modules/galleries/img/avatar-06.svg",
                "favorite": false
            },
            {
                "uid": 8,
                "text" : "Decentralize!",
                "username" : "Norbert",
                "avatar" : "/modules/galleries/img/avatar-05.svg",
                "favorite": false
            }
        ];

        function getAllPosts(){
            return posts;
        }

        function getPost(id){
            var filtered = _.filter(posts, function(c){
                return c.id === id;
            });
            return filtered[0];
        }

        return {
            getAllPosts:getAllPosts,
            getPost:getPost
        };
    })
    .factory('coursesDataSvc', function(){
        var courses=[
            {
                'id':1,
                'title':'Introduction to Angular JS',
                'rating':4,
                'category':'JavaScript',
                'level':'100',
                'topics':[
                    'What is Angular JS?',
                    'Basics and Data binding',
                    'Building blocks',
                    'Services, Values and Factories',
                    'AJAX and Promises',
                    'Routing'
                ]
            },
            {
                'id':2,
                'title':'Advanced Angular JS',
                'rating':4.5,
                'category':'JavaScript',
                'level':'300',
                'topics':[
                    'Directives',
                    'Animations',
                    'Unit Testing',
                    'End-to-end Testing'
                ]
            },
            {
                'id':3,
                'title':'ASP.NET MVC Fundamentals',
                'rating':4,
                'category':'ASP.NET',
                'level':'200',
                'topics':[
                    'Web forms vs MVC',
                    'Why MVC?',
                    'Model',
                    'View',
                    'Controller',
                    'Going further...'
                ]
            },
            {
                'id':4,
                'title':'ASP.NET in VS 2013',
                'rating':4,
                'category':'ASP.NET',
                'level':'300',
                'topics':[
                    'Overview',
                    'OWIN and Katana',
                    'Updates to Web Forms',
                    'Updates to MVC and Razor Views',
                    'Web API 2 and OData',
                    'Tooling Support'
                ]
            },
            {
                'id':5,
                'title':'Async in C#',
                'rating':4.2,
                'category':'C#',
                'level':'400',
                'topics':[
                    'Introduction',
                    'Evolution of async with C# and .NET',
                    'Task Parallel Library',
                    'Using async and await',
                    'Patterns and Best Practices'
                ]
            },
            {
                'id':6,
                'title':'LINQ',
                'rating':3.8,
                'category':'C#',
                'level':'200',
                'topics':[
                    'C# Language improvements',
                    'Basic LINQ Queries',
                    'Queries in Lambda Expression Syntax',
                    'Deferred and Immediate Execution',
                    'LINQ in Layered Applications',
                    'Expressions and LINQ to Remote'
                ]
            },
            {
                'id':7,
                'title':'SQL Server Fundamentals',
                'rating':4.5,
                'category':'SQL Server',
                'level':'100',
                'topics':[
                    'Overview',
                    'Creating tables and constraints',
                    'Basic CRUD Operations',
                    'Join Queries',
                    'Apply, Merge and CTE',
                    'Transactions',
                    'Query Tuning'
                ]
            },
            {
                'id':8,
                'title':'ASP.NET Web API OData',
                'rating':3.3,
                'category':'ASP.NET',
                'level':'300',
                'topics':[
                    'REST and OData',
                    'OData in Web API using ODataController',
                    'OData using EntitySetController',
                    'Consuming OData Services from .NET and JavaScript clients'
                ]
            },
            {
                'id':9,
                'title':'Trasactions in SQL Server',
                'rating':4.8,
                'category':'SQL Server',
                'level':'400',
                'topics':[
                    'Intro to Transact-SQL',
                    'Basic Transactions',
                    'Transactions in procedures and triggers',
                    'Error Handling',
                    'Transaction best practices'
                ]
            },
            {
                'id':10,
                'title':'Intro to Node.js',
                'rating':3,
                'category':'JavaScript',
                'level':'200',
                'topics':[
                    'What is Node.js?',
                    'Asynchronous actions and Event loop',
                    'Accessing file system',
                    'Accessing Databases',
                    'Unit testing',
                    'Deploying Node.js Apps'
                ]
            }
        ];

        function getAllCourses(){
            return courses;
        }

        function getCourse(id){
            var filtered = _.filter(courses, function(c){
                return c.id === id;
            });
            return filtered[0];
        }

        return {
            getAllCourses:getAllCourses,
            getCourse:getCourse
        };
    });;