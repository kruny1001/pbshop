'use strict';
var ApplicationConfiguration = function () {
    var applicationModuleName = 'mean', applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ], registerModule = function (moduleName) {
        angular.module(moduleName, []), angular.module(applicationModuleName).requires.push(moduleName);
      };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies), angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]), angular.element(document).ready(function () {
  '#_=_' === window.location.hash && (window.location.hash = '#!'), angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
}), ApplicationConfiguration.registerModule('articles'), ApplicationConfiguration.registerModule('brazil2s'), ApplicationConfiguration.registerModule('brazils'), ApplicationConfiguration.registerModule('core'), ApplicationConfiguration.registerModule('galleries'), ApplicationConfiguration.registerModule('user-mgnt'), ApplicationConfiguration.registerModule('users'), angular.module('articles').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?'), Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles'), Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]), angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]), angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication, $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.title = '', this.content = '';
    }, $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles)
          $scope.articles[i] === article && $scope.articles.splice(i, 1);
      } else
        $scope.article.$remove(function () {
          $location.path('articles');
        });
    }, $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.articles = Articles.query();
    }, $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]), angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('brazil2s').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Brazil2s', 'brazil2s', 'dropdown', '/brazil2s(/create)?'), Menus.addSubMenuItem('topbar', 'brazil2s', 'List Brazil2s', 'brazil2s'), Menus.addSubMenuItem('topbar', 'brazil2s', 'New Brazil2', 'brazil2s/create');
  }
]), angular.module('brazil2s').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listBrazil2s', {
      url: '/brazil2s',
      templateUrl: 'modules/brazil2s/views/list-brazil2s.client.view.html'
    }).state('createBrazil2', {
      url: '/brazil2s/create',
      templateUrl: 'modules/brazil2s/views/create-brazil2.client.view.html'
    }).state('viewBrazil2', {
      url: '/brazil2s/:brazil2Id',
      templateUrl: 'modules/brazil2s/views/view-brazil2.client.view.html'
    }).state('editBrazil2', {
      url: '/brazil2s/:brazil2Id/edit',
      templateUrl: 'modules/brazil2s/views/edit-brazil2.client.view.html'
    });
  }
]), angular.module('brazil2s').controller('Brazil2sController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Brazil2s',
  function ($scope, $stateParams, $location, Authentication, Brazil2s) {
    $scope.authentication = Authentication, $scope.create = function () {
      var brazil2 = new Brazil2s({ name: this.name });
      brazil2.$save(function (response) {
        $location.path('brazil2s/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '';
    }, $scope.remove = function (brazil2) {
      if (brazil2) {
        brazil2.$remove();
        for (var i in $scope.brazil2s)
          $scope.brazil2s[i] === brazil2 && $scope.brazil2s.splice(i, 1);
      } else
        $scope.brazil2.$remove(function () {
          $location.path('brazil2s');
        });
    }, $scope.update = function () {
      var brazil2 = $scope.brazil2;
      brazil2.$update(function () {
        $location.path('brazil2s/' + brazil2._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.brazil2s = Brazil2s.query();
    }, $scope.findOne = function () {
      $scope.brazil2 = Brazil2s.get({ brazil2Id: $stateParams.brazil2Id });
    };
  }
]), angular.module('brazil2s').factory('Brazil2s', [
  '$resource',
  function ($resource) {
    return $resource('brazil2s/:brazil2Id', { brazil2Id: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('brazils').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listBrazils', {
      url: '/brazils',
      templateUrl: 'modules/brazils/views/list-brazils.client.view.html'
    }).state('createBrazil', {
      url: '/brazils/create',
      templateUrl: 'modules/brazils/views/create-brazil.client.view.html'
    }).state('viewBrazil', {
      url: '/brazils/:brazilId',
      templateUrl: 'modules/brazils/views/view-brazil.client.view.html'
    }).state('editBrazil', {
      url: '/brazils/:brazilId/edit',
      templateUrl: 'modules/brazils/views/edit-brazil.client.view.html'
    });
  }
]), angular.module('brazils').controller('BrazilsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Brazils',
  function ($scope, $stateParams, $location, Authentication, Brazils) {
    $scope.authentication = Authentication, $scope.create = function () {
      var brazil = new Brazils({ name: this.name });
      brazil.$save(function (response) {
        $location.path('brazils/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '';
    }, $scope.remove = function (brazil) {
      if (brazil) {
        brazil.$remove();
        for (var i in $scope.brazils)
          $scope.brazils[i] === brazil && $scope.brazils.splice(i, 1);
      } else
        $scope.brazil.$remove(function () {
          $location.path('brazils');
        });
    }, $scope.update = function () {
      var brazil = $scope.brazil;
      brazil.$update(function () {
        $location.path('brazils/' + brazil._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.brazils = Brazils.query();
    }, $scope.findOne = function () {
      $scope.brazil = Brazils.get({ brazilId: $stateParams.brazilId });
    };
  }
]), angular.module('brazils').factory('Brazils', [
  '$resource',
  function ($resource) {
    return $resource('brazils/:brazilId', { brazilId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/'), $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]), angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication, $scope.isCollapsed = !1, $scope.menu = Menus.getMenu('topbar'), $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    }, $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = !1;
    });
  }
]), angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    $scope.authentication = Authentication;
  }
]), angular.module('core').service('Menus', [function () {
    this.defaultRoles = ['user'], this.menus = {};
    var shouldRender = function (user) {
      if (!user)
        return this.isPublic;
      for (var userRoleIndex in user.roles)
        for (var roleIndex in this.roles)
          if (this.roles[roleIndex] === user.roles[userRoleIndex])
            return !0;
      return !1;
    };
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId])
          return !0;
        throw new Error('Menu does not exists');
      }
      throw new Error('MenuId was not provided');
    }, this.getMenu = function (menuId) {
      return this.validateMenuExistance(menuId), this.menus[menuId];
    }, this.addMenu = function (menuId, isPublic, roles) {
      return this.menus[menuId] = {
        isPublic: isPublic || !1,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      }, this.menus[menuId];
    }, this.removeMenu = function (menuId) {
      this.validateMenuExistance(menuId), delete this.menus[menuId];
    }, this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      return this.validateMenuExistance(menuId), this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      }), this.menus[menuId];
    }, this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === rootMenuItemURL && this.menus[menuId].items[itemIndex].items.push({
          title: menuItemTitle,
          link: menuItemURL,
          uiRoute: menuItemUIRoute || '/' + menuItemURL,
          isPublic: isPublic || this.menus[menuId].isPublic,
          roles: roles || this.defaultRoles,
          shouldRender: shouldRender
        });
      return this.menus[menuId];
    }, this.removeMenuItem = function (menuId, menuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === menuItemURL && this.menus[menuId].items.splice(itemIndex, 1);
      return this.menus[menuId];
    }, this.removeSubMenuItem = function (menuId, submenuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items)
          this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL && this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
      return this.menus[menuId];
    }, this.addMenu('topbar');
  }]), angular.module('galleries').run([
  'Menus',
  function () {
  }
]), angular.module('galleries').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('test-polymer', {
      url: '/test-polymer',
      templateUrl: 'modules/galleries/views/test-polymer.client.view.html'
    }).state('userlist', {
      url: '/galleries/userlist',
      templateUrl: 'modules/galleries/views/userlist.client.view.html'
    }).state('gview', {
      url: '/galleries/gview',
      templateUrl: 'modules/galleries/views/gview.client.view.html'
    }).state('listGalleries', {
      url: '/galleries',
      templateUrl: 'modules/galleries/views/list-galleries.client.view.html'
    }).state('createGallery', {
      url: '/galleries/create',
      templateUrl: 'modules/galleries/views/create-gallery.client.view.html'
    }).state('viewGallery', {
      url: '/galleries/:galleryId',
      templateUrl: 'modules/galleries/views/view-gallery.client.view.html'
    }).state('editGallery', {
      url: '/galleries/:galleryId/edit',
      templateUrl: 'modules/galleries/views/edit-gallery.client.view.html'
    });
  }
]), angular.module('galleries').controller('GalleriesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Galleries',
  function ($scope, $stateParams, $location, Authentication, Galleries) {
    $scope.authentication = Authentication, $scope.create = function () {
      var gallery = new Galleries({ name: this.name });
      gallery.$save(function (response) {
        $location.path('galleries/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '';
    }, $scope.remove = function (gallery) {
      if (gallery) {
        gallery.$remove();
        for (var i in $scope.galleries)
          $scope.galleries[i] === gallery && $scope.galleries.splice(i, 1);
      } else
        $scope.gallery.$remove(function () {
          $location.path('galleries');
        });
    }, $scope.update = function () {
      var gallery = $scope.gallery;
      gallery.$update(function () {
        $location.path('galleries/' + gallery._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.galleries = Galleries.query();
    }, $scope.findOne = function () {
      $scope.gallery = Galleries.get({ galleryId: $stateParams.galleryId });
    };
  }
]), angular.module('galleries').controller('GviewController', [
  '$scope',
  '$http',
  'YT_event',
  function ($scope, $http, YT_event) {
    $scope.items = [
      {
        id: 0,
        picture: 'http://placehold.it/32x32',
        age: 31,
        name: 'Mathews Goff'
      },
      {
        id: 1,
        picture: 'http://placehold.it/32x32',
        age: 36,
        name: 'Collins Alston'
      },
      {
        id: 2,
        picture: 'http://placehold.it/32x32',
        age: 27,
        name: 'Jasmine Rollins'
      },
      {
        id: 3,
        picture: 'http://placehold.it/32x32',
        age: 32,
        name: 'Julie Jefferson'
      },
      {
        id: 4,
        picture: 'http://placehold.it/32x32',
        age: 23,
        name: 'Wilder King'
      },
      {
        id: 5,
        picture: 'http://placehold.it/32x32',
        age: 23,
        name: 'Stanley Moore'
      },
      {
        id: 6,
        picture: 'http://placehold.it/32x32',
        age: 36,
        name: 'Reynolds Bishop'
      },
      {
        id: 7,
        picture: 'http://placehold.it/32x32',
        age: 26,
        name: 'Bryant Flowers'
      },
      {
        id: 8,
        picture: 'http://placehold.it/32x32',
        age: 38,
        name: 'Jenifer Martinez'
      },
      {
        id: 9,
        picture: 'http://placehold.it/32x32',
        age: 40,
        name: 'Mcguire Pittman'
      },
      {
        id: 10,
        picture: 'http://placehold.it/32x32',
        age: 34,
        name: 'Valdez Hyde'
      },
      {
        id: 11,
        picture: 'http://placehold.it/32x32',
        age: 34,
        name: 'Marla Mayo'
      },
      {
        id: 12,
        picture: 'http://placehold.it/32x32',
        age: 30,
        name: 'Brown Ortega'
      },
      {
        id: 13,
        picture: 'http://placehold.it/32x32',
        age: 32,
        name: 'Jeannette William'
      },
      {
        id: 14,
        picture: 'http://placehold.it/32x32',
        age: 30,
        name: 'Bridges Ashley'
      },
      {
        id: 15,
        picture: 'http://placehold.it/32x32',
        age: 33,
        name: 'Latasha Hewitt'
      },
      {
        id: 16,
        picture: 'http://placehold.it/32x32',
        age: 35,
        name: 'Alma Sawyer'
      },
      {
        id: 17,
        picture: 'http://placehold.it/32x32',
        age: 21,
        name: 'Liz Mcbride'
      },
      {
        id: 18,
        picture: 'http://placehold.it/32x32',
        age: 26,
        name: 'Mcintosh Chandler'
      },
      {
        id: 19,
        picture: 'http://placehold.it/32x32',
        age: 20,
        name: 'Alford Hartman'
      },
      {
        id: 20,
        picture: 'http://placehold.it/32x32',
        age: 29,
        name: 'Tiffany Green'
      },
      {
        id: 21,
        picture: 'http://placehold.it/32x32',
        age: 38,
        name: 'Stafford Riggs'
      },
      {
        id: 22,
        picture: 'http://placehold.it/32x32',
        age: 40,
        name: 'Elinor Chambers'
      },
      {
        id: 23,
        picture: 'http://placehold.it/32x32',
        age: 27,
        name: 'Carly Howard'
      },
      {
        id: 24,
        picture: 'http://placehold.it/32x32',
        age: 27,
        name: 'Rosalind Sanchez'
      },
      {
        id: 25,
        picture: 'http://placehold.it/32x32',
        age: 28,
        name: 'Jaclyn Shelton'
      },
      {
        id: 26,
        picture: 'http://placehold.it/32x32',
        age: 25,
        name: 'Hughes Phelps'
      },
      {
        id: 27,
        picture: 'http://placehold.it/32x32',
        age: 36,
        name: 'Rosetta Barrett'
      },
      {
        id: 28,
        picture: 'http://placehold.it/32x32',
        age: 29,
        name: 'Jarvis Wong'
      },
      {
        id: 29,
        picture: 'http://placehold.it/32x32',
        age: 23,
        name: 'Kerri Pennington'
      }
    ], $scope.description = 'This is the descritpion', $scope.name = 'George & The Dragon', $scope.location = '813 W 50th St Minneapolis, MN 55419', $scope.hours = [
      'Mon\t11:00 am - 10:00 pm',
      'Tue\t11:00 am - 10:00 pm',
      'Wed\t11:00 am - 10:00 pm',
      'Thu\t11:00 am - 10:00 pm',
      'Fri\t11:00 am - 11:00 pm',
      'Sat\t11:00 am - 11:00 pm\tOpen now',
      'Sun\t9:00 am - 2:00 pm'
    ], $scope.menus = 'http://www.ganddpub.com/menus/main.pdf', $scope.introduction = '', $scope.yt = {
      width: 600,
      height: 480,
      videoid: 'M7lc1UVf-VE',
      playerStatus: 'NOT PLAYING'
    }, $scope.YT_event = YT_event, $scope.sendControlEvent = function (ctrlEvent) {
      this.$broadcast(ctrlEvent);
    }, $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      $scope.yt.playerStatus = data;
    }), $scope.onDrag = function (value) {
      $scope.currentRotation = value;
    }, $scope.onDragEnd = function (value) {
      $scope.currentRotation = value, console.log('DRAG_END', value);
    }, $scope.testDraggable = function () {
    };
  }
]), angular.module('galleries').controller('TestpolymerController', [
  '$scope',
  'polymerPost',
  function ($scope, polymerPost) {
    $scope.toggleDialog = function (transition) {
      var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
      dialog.toggle();
    }, $scope.posts = polymerPost.getAllPosts(), $scope.getAllUsers = function () {
      $scope.posts = polymerPost.getAllPosts();
    }, $scope.getFavorites = function () {
      $scope.posts = [], $scope.posts.push(polymerPost.getPost(2));
    }, $scope.clickFavorit = function () {
      console.log('!!');
    }, $scope.testClick = function () {
      console.log('Clicked Button');
    };
  }
]), angular.module('galleries').controller('UserlistController', [
  '$scope',
  'testuserlist',
  'ContactService',
  'Authentication',
  'Listusers',
  function ($scope, testuserlist, ContactService, Authentication, Listusers) {
    $scope.authentication = Authentication, $scope.users = testuserlist.users, $scope.contacts = ContactService.list(), $scope.saveContact = function () {
      ContactService.save($scope.newcontact), $scope.newcontact = {};
    }, $scope.delete = function (id) {
      ContactService.delete(id), $scope.newcontact.id === id && ($scope.newcontact = {});
    }, $scope.edit = function (id) {
      $scope.newcontact = angular.copy(ContactService.get(id));
    }, $scope.find = function () {
      $scope.galleries = Listusers.query();
    };
  }
]), angular.module('galleries').directive('mdraggable', function () {
  return {
    restrict: 'A',
    scope: {
      onDragEnd: '&',
      onDrag: '&'
    },
    link: function (scope, element) {
      Draggable.create(element, {
        type: 'rotation',
        throwProps: !0,
        onDrag: function () {
          scope.rotation = this.rotation, scope.$apply(function () {
            scope.onDrag({ rotation: scope.rotation });
          });
        },
        onDragEnd: function () {
          scope.rotation = this.rotation, scope.$apply(function () {
            scope.onDragEnd({ rotation: scope.rotation });
          });
        },
        snap: function (endValue) {
          return 45 * Math.round(endValue / 45);
        }
      });
    }
  };
}), angular.module('galleries').directive('productDescription', [function () {
    return {
      templateUrl: '/modules/galleries/directives/product-description/product-description.html',
      restrict: 'E'
    };
  }]), angular.module('galleries').directive('quiz', function () {
  return {
    restrict: 'E',
    replace: !0,
    controller: 'TestpolymerController',
    templateUrl: '/modules/galleries/directives/quiz/quiz.html',
    link: function (scope, elem) {
      elem.bind('mouseover', function () {
        elem.css('cursor', 'pointer');
      });
    }
  };
}), angular.module('galleries').directive('watchShop', function () {
  return {
    restrict: 'E',
    replace: !0,
    controller: 'TestpolymerController',
    templateUrl: '/modules/galleries/directives/watch-shop/watch-shop.html',
    link: {
      pre: function () {
      },
      post: function () {
      }
    }
  };
}), angular.module('galleries').constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
}), angular.module('galleries').directive('youtube', [
  '$window',
  'YT_event',
  function ($window, YT_event) {
    return {
      restrict: 'E',
      scope: {
        height: '@',
        width: '@',
        videoid: '@'
      },
      template: '<div></div>',
      link: function (scope, element) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        $window.onYouTubeIframeAPIReady = function () {
          player = new YT.Player(element.children()[0], {
            playerVars: {
              autoplay: 0,
              html5: 1,
              theme: 'light',
              modesbranding: 0,
              color: 'white',
              iv_load_policy: 3,
              showinfo: 1,
              controls: 1
            },
            height: scope.height,
            width: scope.width,
            videoId: scope.videoid,
            events: {
              onStateChange: function (event) {
                var message = {
                    event: YT_event.STATUS_CHANGE,
                    data: ''
                  };
                switch (event.data) {
                case YT.PlayerState.PLAYING:
                  message.data = 'PLAYING';
                  break;
                case YT.PlayerState.ENDED:
                  message.data = 'ENDED';
                  break;
                case YT.PlayerState.UNSTARTED:
                  message.data = 'NOT PLAYING';
                  break;
                case YT.PlayerState.PAUSED:
                  message.data = 'PAUSED';
                }
                scope.$apply(function () {
                  scope.$emit(message.event, message.data);
                });
              }
            }
          });
        }, scope.$watch('height + width', function (newValue, oldValue) {
          newValue !== oldValue && player.setSize(scope.width, scope.height);
        }), scope.$watch('videoid', function (newValue, oldValue) {
          newValue !== oldValue && player.cueVideoById(scope.videoid);
        }), scope.$on(YT_event.STOP, function () {
          player.seekTo(0), player.stopVideo();
        }), scope.$on(YT_event.PLAY, function () {
          player.playVideo();
        }), scope.$on(YT_event.PAUSE, function () {
          player.pauseVideo();
        });
      }
    };
  }
]), angular.module('galleries').service('ContactService', [function () {
    var uid = 1, contacts = [{
          id: 0,
          name: 'Kevin',
          email: 'test@test.com',
          phone: '123-123-1234'
        }];
    this.save = function (contact) {
      if (null === contact.id)
        contact.id = uid++, contacts.push(contact);
      else
        for (var i in contacts)
          contacts[i].id === contact.id && (contacts[i] = contact);
    }, this.get = function (id) {
      for (var i in contacts)
        if (contacts[i].id === id)
          return contacts[i];
    }, this.delete = function (id) {
      for (var i in contacts)
        contacts[i].id === id && contacts.splice(i, 1);
    }, this.list = function () {
      return contacts;
    };
  }]), angular.module('galleries').factory('Galleries', [
  '$resource',
  function ($resource) {
    return $resource('galleries/:galleryId', { galleryId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('galleries').factory('polymerPost', function () {
  function getAllPosts() {
    return posts;
  }
  function getPost(uid) {
    var filtered = _.filter(posts, function (c) {
        return c.uid === uid;
      });
    return filtered[0];
  }
  var posts = [
      {
        uid: 1,
        text: 'Have you heard about the Web Components revolution?',
        username: 'Eric',
        avatar: '/modules/galleries/img/avatar-01.svg',
        favorite: !1
      },
      {
        uid: 2,
        text: 'Loving this Polymer thing.',
        username: 'Rob',
        avatar: '/modules/galleries/img/avatar-02.svg',
        favorite: !1
      },
      {
        uid: 3,
        text: 'So last year...',
        username: 'Dimitri',
        avatar: '/modules/galleries/img/avatar-03.svg',
        favorite: !1
      },
      {
        uid: 4,
        text: 'Pretty sure I came up with that first.',
        username: 'Ada',
        avatar: '/modules/galleries/img/avatar-07.svg',
        favorite: !1
      },
      {
        uid: 5,
        text: 'Yo, I heard you like components, so I put a component in your component.',
        username: 'Grace',
        avatar: '/modules/galleries/img/avatar-08.svg',
        favorite: !1
      },
      {
        uid: 6,
        text: 'Centralize, centrailize.',
        username: 'John',
        avatar: '/modules/galleries/img/avatar-04.svg',
        favorite: !1
      },
      {
        uid: 7,
        text: 'Has anyone seen my cat?',
        username: 'Zelda',
        avatar: '/modules/galleries/img/avatar-06.svg',
        favorite: !1
      },
      {
        uid: 8,
        text: 'Decentralize!',
        username: 'Norbert',
        avatar: '/modules/galleries/img/avatar-05.svg',
        favorite: !1
      }
    ];
  return {
    getAllPosts: getAllPosts,
    getPost: getPost
  };
}), angular.module('galleries').factory('testuserlist', [
  '$resource',
  function () {
    var fac = {};
    return fac.users = [
      'Kevin',
      'CK',
      'Jacob'
    ], fac;
  }
]), angular.module('galleries').factory('Listusers', [
  '$resource',
  function ($resource) {
    return $resource('/galleries', {}, { update: { method: 'GET' } });
  }
]), (window._gsQueue || (window._gsQueue = [])).push(function () {
  window._gsDefine('plugins.ThrowPropsPlugin', [
    'plugins.TweenPlugin',
    'TweenLite',
    'easing.Ease',
    'utils.VelocityTracker'
  ], function (t, e, i, s) {
    var r, n, a, o, l = function () {
        t.call(this, 'throwProps'), this._overwriteProps.length = 0;
      }, h = 999999999999999, u = {
        x: 1,
        y: 1,
        z: 2,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 1,
        rotationZ: 1,
        rotationX: 2,
        rotationY: 2,
        skewX: 1,
        skewY: 1
      }, _ = function (t, e, i, s) {
        for (var r, n, a = e.length, o = 0, l = h; --a > -1;)
          r = e[a], n = r - t, 0 > n && (n = -n), l > n && r >= s && i >= r && (o = a, l = n);
        return e[o];
      }, p = function (t, e, i, s) {
        if ('auto' === t.end)
          return t;
        i = isNaN(i) ? h : i, s = isNaN(s) ? -h : s;
        var r = 'function' == typeof t.end ? t.end(e) : t.end instanceof Array ? _(e, t.end, i, s) : Number(t.end);
        return r > i ? r = i : s > r && (r = s), {
          max: r,
          min: r
        };
      }, c = l.calculateChange = function (t, s, r, n) {
        null == n && (n = 0.05);
        var a = s instanceof i ? s : s ? new i(s) : e.defaultEase;
        return r * n * t / a.getRatio(n);
      }, f = l.calculateDuration = function (t, s, r, n, a) {
        a = a || 0.05;
        var o = n instanceof i ? n : n ? new i(n) : e.defaultEase;
        return Math.abs((s - t) * o.getRatio(a) / r / a);
      }, d = l.calculateTweenDuration = function (t, r, n, a, o) {
        if ('string' == typeof t && (t = e.selector(t)), !t)
          return 0;
        null == n && (n = 10), null == a && (a = 0.2), null == o && (o = 1), t.length && (t = t[0] || t);
        var h, u, _, d, m, g, v, y, w, x, T = 0, b = 9999999999, P = r.throwProps || r, k = r.ease instanceof i ? r.ease : r.ease ? new i(r.ease) : e.defaultEase, S = isNaN(P.checkpoint) ? 0.05 : Number(P.checkpoint), C = isNaN(P.resistance) ? l.defaultResistance : Number(P.resistance);
        for (h in P)
          'resistance' !== h && 'checkpoint' !== h && (u = P[h], 'object' != typeof u && (w = w || s.getByTarget(t), w && w.isTrackingProp(h) ? u = 'number' == typeof u ? { velocity: u } : { velocity: w.getVelocity(h) } : (d = Number(u) || 0, _ = d * C > 0 ? d / C : d / -C)), 'object' == typeof u && (void 0 !== u.velocity && 'number' == typeof u.velocity ? d = Number(u.velocity) || 0 : (w = w || s.getByTarget(t), d = w && w.isTrackingProp(h) ? w.getVelocity(h) : 0), m = isNaN(u.resistance) ? C : Number(u.resistance), _ = d * m > 0 ? d / m : d / -m, g = 'function' == typeof t[h] ? t[h.indexOf('set') || 'function' != typeof t['get' + h.substr(3)] ? h : 'get' + h.substr(3)]() : t[h] || 0, v = g + c(d, k, _, S), void 0 !== u.end && (u = p(u, v, u.max, u.min)), void 0 !== u.max && v > Number(u.max) ? (x = u.unitFactor || 1, y = g > u.max && u.min !== u.max || d * x > -15 && 45 > d * x ? a + 0.1 * (n - a) : f(g, u.max, d, k, S), b > y + o && (b = y + o)) : void 0 !== u.min && Number(u.min) > v && (x = u.unitFactor || 1, y = u.min > g && u.min !== u.max || d * x > -45 && 15 > d * x ? a + 0.1 * (n - a) : f(g, u.min, d, k, S), b > y + o && (b = y + o)), y > T && (T = y)), _ > T && (T = _));
        return T > b && (T = b), T > n ? n : a > T ? a : T;
      }, m = l.prototype = new t('throwProps');
    return m.constructor = l, l.version = '0.9.0', l.API = 2, l._autoCSS = !0, l.defaultResistance = 100, l.track = function (t, e, i) {
      return s.track(t, e, i);
    }, l.untrack = function (t, e) {
      s.untrack(t, e);
    }, l.isTracking = function (t, e) {
      return s.isTracking(t, e);
    }, l.getVelocity = function (t, e) {
      var i = s.getByTarget(t);
      return i ? i.getVelocity(e) : 0 / 0;
    }, l._cssRegister = function () {
      var t = (window.GreenSockGlobals || window).com.greensock.plugins.CSSPlugin;
      if (t) {
        var e = t._internals, i = e._parseToProxy, a = e._setPluginRatio, o = e.CSSPropTween;
        e._registerComplexSpecialProp('throwProps', {
          parser: function (t, e, h, _, p, c) {
            c = new l();
            var f, d, m, g, v, y = {}, w = {}, x = {}, T = {}, b = {};
            n = {};
            for (m in e)
              'resistance' !== m && (d = e[m], 'object' == typeof d ? (void 0 !== d.velocity && 'number' == typeof d.velocity ? y[m] = Number(d.velocity) || 0 : (v = v || s.getByTarget(t), y[m] = v && v.isTrackingProp(m) ? v.getVelocity(m) : 0), void 0 !== d.end && (T[m] = d.end), void 0 !== d.min && (w[m] = d.min), void 0 !== d.max && (x[m] = d.max), void 0 !== d.resistance && (f = !0, b[m] = d.resistance)) : 'number' == typeof d ? y[m] = d : (v = v || s.getByTarget(t), y[m] = v && v.isTrackingProp(m) ? v.getVelocity(m) : d || 0), u[m] && _._enableTransforms(2 === u[m]));
            g = i(t, y, _, p, c), r = g.proxy, y = g.end;
            for (m in r)
              n[m] = {
                velocity: y[m],
                min: w[m],
                max: x[m],
                end: T[m],
                resistance: b[m]
              };
            return null != e.resistance && (n.resistance = e.resistance), p = new o(t, 'throwProps', 0, 0, g.pt, 2), p.plugin = c, p.setRatio = a, p.data = g, c._onInitTween(r, n, _._tween), p;
          }
        });
      }
    }, l.to = function (t, i, s, l, h) {
      i.throwProps || (i = { throwProps: i });
      var u = new e(t, 1, i);
      return u.render(0, !0, !0), u.vars.css ? (u.duration(d(r, {
        throwProps: n,
        ease: i.ease
      }, s, l, h)), u._delay && !u.vars.immediateRender ? u.invalidate() : a._onInitTween(r, o, u), u) : (u.kill(), new e(t, d(t, i, s, l, h), i));
    }, m._onInitTween = function (t, e, i) {
      this.target = t, this._props = [], a = this, o = e;
      var r, n, l, h, u, _, f, d, m, g = i._ease, v = isNaN(e.checkpoint) ? 0.05 : Number(e.checkpoint), y = i._duration, w = 0;
      for (r in e)
        if ('resistance' !== r && 'checkpoint' !== r) {
          if (n = e[r], 'number' == typeof n)
            u = Number(n) || 0;
          else if ('object' != typeof n || isNaN(n.velocity)) {
            if (m = m || s.getByTarget(t), !m || !m.isTrackingProp(r))
              throw 'ERROR: No velocity was defined in the throwProps tween of ' + t + ' property: ' + r;
            u = m.getVelocity(r);
          } else
            u = Number(n.velocity);
          _ = c(u, g, y, v), d = 0, h = 'function' == typeof t[r], l = h ? t[r.indexOf('set') || 'function' != typeof t['get' + r.substr(3)] ? r : 'get' + r.substr(3)]() : t[r], 'object' == typeof n && (f = l + _, void 0 !== n.end && (n = p(n, f, n.max, n.min)), void 0 !== n.max && f > Number(n.max) ? d = n.max - l - _ : void 0 !== n.min && Number(n.min) > f && (d = n.min - l - _)), this._props[w++] = {
            p: r,
            s: l,
            c1: _,
            c2: d,
            f: h,
            r: !1
          }, this._overwriteProps[w] = r;
        }
      return !0;
    }, m._kill = function (e) {
      for (var i = this._props.length; --i > -1;)
        null != e[this._props[i].p] && this._props.splice(i, 1);
      return t.prototype._kill.call(this, e);
    }, m._roundProps = function (t, e) {
      for (var i = this._props, s = i.length; --s > -1;)
        (t[i[s]] || t.throwProps) && (i[s].r = e);
    }, m.setRatio = function (t) {
      for (var e, i, s = this._props.length; --s > -1;)
        e = this._props[s], i = e.s + e.c1 * t + e.c2 * t * t, e.r && (i = 0 | i + (i > 0 ? 0.5 : -0.5)), e.f ? this.target[e.p](i) : this.target[e.p] = i;
    }, t.activate([l]), l;
  }, !0), window._gsDefine('utils.VelocityTracker', ['TweenLite'], function (t) {
    var e, i, s, r, n = /([A-Z])/g, a = {}, o = {
        x: 1,
        y: 1,
        z: 2,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 1,
        rotationZ: 1,
        rotationX: 2,
        rotationY: 2,
        skewX: 1,
        skewY: 1
      }, l = document.defaultView ? document.defaultView.getComputedStyle : function () {
      }, h = function (t, e, i) {
        var s = (t._gsTransform || a)[e];
        return s || 0 === s ? s : (t.style[e] ? s = t.style[e] : (i = i || l(t, null)) ? (t = i.getPropertyValue(e.replace(n, '-$1').toLowerCase()), s = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, s = i[e]), parseFloat(s) || 0);
      }, u = t.ticker, _ = function (t, e, i) {
        this.p = t, this.f = e, this.v1 = this.v2 = 0, this.t1 = this.t2 = u.time, this.css = !1, this.type = '', this._prev = null, i && (this._next = i, i._prev = this);
      }, p = function () {
        var t, i, n = e, a = u.time;
        if (a - s >= 0.03)
          for (r = s, s = a; n;) {
            for (i = n._firstVP; i;)
              t = i.css ? h(n.target, i.p) : i.f ? n.target[i.p]() : n.target[i.p], (t !== i.v1 || a - i.t1 > 0.15) && (i.v2 = i.v1, i.v1 = t, i.t2 = i.t1, i.t1 = a), i = i._next;
            n = n._next;
          }
      }, c = function (t) {
        this._lookup = {}, this.target = t, this.elem = t.style && t.nodeType ? !0 : !1, i || (u.addEventListener('tick', p, null, !1, -100), s = r = u.time, i = !0), e && (this._next = e, e._prev = this), e = this;
      }, f = c.getByTarget = function (t) {
        for (var i = e; i;) {
          if (i.target === t)
            return i;
          i = i._next;
        }
      }, d = c.prototype;
    return d.addProp = function (e, i) {
      if (!this._lookup[e]) {
        var s = this.target, r = 'function' == typeof s[e], n = r ? this._altProp(e) : e, a = this._firstVP;
        this._firstVP = this._lookup[e] = this._lookup[n] = a = new _(n !== e && 0 === e.indexOf('set') ? n : e, r, a), a.css = this.elem && (void 0 !== this.target.style[a.p] || o[a.p]), a.css && o[a.p] && !s._gsTransform && t.set(s, { x: '+=0' }), a.type = i || a.css && 0 === e.indexOf('rotation') ? 'deg' : '', a.v1 = a.v2 = a.css ? h(s, a.p) : r ? s[a.p]() : s[a.p];
      }
    }, d.removeProp = function (t) {
      var e = this._lookup[t];
      e && (e._prev ? e._prev._next = e._next : e === this._firstVP && (this._firstVP = e._next), e._next && (e._next._prev = e._prev), this._lookup[t] = 0, e.f && (this._lookup[this._altProp(t)] = 0));
    }, d.isTrackingProp = function (t) {
      return this._lookup[t] instanceof _;
    }, d.getVelocity = function (t) {
      var e, i, s, r = this._lookup[t], n = this.target;
      if (!r)
        throw 'The velocity of ' + t + ' is not being tracked.';
      return e = r.css ? h(n, r.p) : r.f ? n[r.p]() : n[r.p], i = e - r.v2, ('rad' === r.type || 'deg' === r.type) && (s = 'rad' === r.type ? 2 * Math.PI : 360, i %= s, i !== i % (s / 2) && (i = 0 > i ? i + s : i - s)), i / (u.time - r.t2);
    }, d._altProp = function (t) {
      var e = t.substr(0, 3), i = ('get' === e ? 'set' : 'set' === e ? 'get' : e) + t.substr(3);
      return 'function' == typeof this.target[i] ? i : t;
    }, c.getByTarget = function (t) {
      for (var i = e; i;) {
        if (i.target === t)
          return i;
        i = i._next;
      }
    }, c.track = function (t, e, i) {
      var s = f(t), r = e.split(','), n = r.length;
      for (i = (i || '').split(','), s || (s = new c(t)); --n > -1;)
        s.addProp(r[n], i[n] || i[0]);
      return s;
    }, c.untrack = function (t, i) {
      var s = f(t), r = (i || '').split(','), n = r.length;
      if (s) {
        for (; --n > -1;)
          s.removeProp(r[n]);
        s._firstVP && i || (s._prev ? s._prev._next = s._next : s === e && (e = s._next), s._next && (s._next._prev = s._prev));
      }
    }, c.isTracking = function (t, e) {
      var i = f(t);
      return i ? !e && i._firstVP ? !0 : i.isTrackingProp(e) : !1;
    }, c;
  }, !0);
}), window._gsDefine && window._gsQueue.pop()(), angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              Authentication.user = null, $location.path('signin');
              break;
            case 403:
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]), angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]), angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication, $scope.authentication.user && $location.path('/'), $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user, $scope.user || $location.path('/'), $scope.hasConnectedAdditionalSocialAccounts = function () {
      for (var i in $scope.user.additionalProvidersData)
        return !0;
      return !1;
    }, $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    }, $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null, $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        $scope.success = !0, $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = !0, Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    }, $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null, $http.post('/users/password', $scope.passwordDetails).success(function () {
        $scope.success = !0, $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').factory('Authentication', [function () {
    var _this = this;
    return _this._data = { user: window.user }, _this._data;
  }]), angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);