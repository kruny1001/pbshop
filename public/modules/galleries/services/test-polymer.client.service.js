/**
 * Created by KevinSo on 7/24/2014.
 */
'use strict';

angular.module('galleries').factory('polymerPost', function(){
    var posts = [
        {
            'uid': 1,
            'text' : 'Have you heard about the Web Components revolution?',
            'username' : 'Eric',
            'avatar' : '/modules/galleries/img/avatar-01.svg',
            'favorite': false
        },
        {
            'uid': 2,
            'text' : 'Loving this Polymer thing.',
            'username' : 'Rob',
            'avatar' : '/modules/galleries/img/avatar-02.svg',
            'favorite': false
        },
        {
            'uid': 3,
            'text' : 'So last year...',
            'username' : 'Dimitri',
            'avatar' : '/modules/galleries/img/avatar-03.svg',
            'favorite': false
        },
        {
            'uid': 4,
            'text' : 'Pretty sure I came up with that first.',
            'username' : 'Ada',
            'avatar' : '/modules/galleries/img/avatar-07.svg',
            'favorite': false
        },
        {
            'uid': 5,
            'text' : 'Yo, I heard you like components, so I put a component in your component.',
            'username' : 'Grace',
            'avatar' : '/modules/galleries/img/avatar-08.svg',
            'favorite': false
        },
        {
            'uid': 6,
            'text' : 'Centralize, centrailize.',
            'username' : 'John',
            'avatar' : '/modules/galleries/img/avatar-04.svg',
            'favorite': false
        },
        {
            'uid': 7,
            'text' : 'Has anyone seen my cat?',
            'username' : 'Zelda',
            'avatar' : '/modules/galleries/img/avatar-06.svg',
            'favorite': false
        },
        {
            'uid': 8,
            'text' : 'Decentralize!',
            'username' : 'Norbert',
            'avatar' : '/modules/galleries/img/avatar-05.svg',
            'favorite': false
        }
    ];

    function getAllPosts(){
        return posts;
    }

    function getPost(uid){
        var filtered = _.filter(posts, function(c){
            return c.uid === uid;
        });
        return filtered[0];
    }

    return {
        getAllPosts:getAllPosts,
        getPost:getPost
    };
});