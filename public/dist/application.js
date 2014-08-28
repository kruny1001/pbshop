'use strict';
var ApplicationConfiguration = function () {
    var applicationModuleName = 'mean', applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'google-maps',
        'mgo-angular-wizard',
        'angularFileUpload',
        'smart-table'
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
}), ApplicationConfiguration.registerModule('articles'), ApplicationConfiguration.registerModule('core'), ApplicationConfiguration.registerModule('galleries'), ApplicationConfiguration.registerModule('gwas'), ApplicationConfiguration.registerModule('reviews'), ApplicationConfiguration.registerModule('template'), ApplicationConfiguration.registerModule('users'), angular.module('articles').run([
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
  '$element',
  'Authentication',
  function ($scope, $element, Authentication) {
    $scope.authentication = Authentication, $scope.firstJumbo = 'first-jumbo-content', $scope.secondJumbo = 'second-jumbo-content', $scope.thirdJumbo = 'third-jumbo-content';
    var texts = $('.core-text-anni'), tl = new TimelineMax({
        repeat: 6,
        repeatDelay: 1,
        yoyo: !0
      });
    tl.staggerTo(texts, 0.2, {
      className: '+=superShadow',
      top: '-=10px',
      ease: Power1.easeIn
    }, '0.3', 'start');
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
  function (Menus) {
    Menus.addMenuItem('topbar', 'Galleries', 'galleries', 'dropdown', '/galleries(/create)?'), Menus.addSubMenuItem('topbar', 'galleries', 'List Galleries', 'galleries'), Menus.addSubMenuItem('topbar', 'galleries', 'New Gallery', 'galleries/create');
  }
]), angular.module('galleries').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('menulist', {
      url: '/menulist',
      templateUrl: 'modules/galleries/views/menulist.client.view.html'
    }).state('menuform', {
      url: '/menulist/menuform',
      templateUrl: 'modules/galleries/views/menuform.client.view.html'
    }).state('test-polymer', {
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
    $scope.authentication = Authentication, $scope.examples = [
      {
        name: 'Example One',
        content: '<p style="">Pic 1</p><p style=""><img style="height: 103px; width: 118px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; padding: 2px; top: 0px; left: 0px; float: none;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObpe9xATvc5SpkrWEtGS5ZWlSxmSjHhV3yIE604Arh3aoANOyJPAuGSc" title="" class=""></p><p style="">Pic 2</p><p style=""><img style="height: 130px; width: 117px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; top: 0px; left: 0px; padding: 3px;" src="http://stylonica.com/wp-content/uploads/2014/02/Cute-marshmallow-Wallpapers-HD.jpg" title="" class=""></p><p style=""><br></p><p style=""><br></p><p style=""><br></p><p style=""><br></p>'
      },
      {
        name: 'Example Two',
        content: '<h1>Ut enim consuetudo loquitur, id solum dicitur honestum, quod est populari fama gloriosum.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque contra est, ac dicitis; <b>Quid censes in Latino fore?</b> </p><p>Hic ambiguo ludimur. <a href="http://loripsum.net/" target="_blank">Disserendi artem nullam habuit.</a> <i>At multis se probavit.</i> Reguli reiciendam; </p><p>Quid autem habent admirationis, cum prope accesseris? Peccata paria. <i>Quid de Pythagora?</i> Illi enim inter se dissentiunt. <a href="http://loripsum.net/" target="_blank">Videamus animi partes, quarum est conspectus illustrior;</a> Utilitatis causa amicitia est quaesita. Duo Reges: constructio interrete. </p>'
      }
    ], $scope.create = function () {
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
    }, $scope.expandAnimation = function (element) {
      console.log('!!');
      var t1 = new TimelineMax();
      t1.to(element.currentTarget, 0.2, { opacity: 0.5 }, '+=0.75'), t1.to(element.currentTarget, 0.2, {
        left: '20px',
        repeat: 1,
        yoyo: !0
      }), t1.to(element.currentTarget, 0.2, {
        right: '20px',
        repeat: 1,
        yoyo: !0
      }), t1.restart();
    };
  }
]), angular.module('galleries').controller('MenuformController', [
  '$scope',
  '$upload',
  function ($scope, $upload) {
    $scope.title = 'Form Steps', $scope.user = {
      name: 'Kevin',
      username: 'kruny1001',
      email: 'test@test.com',
      address: '123 1st st. M 12345'
    }, $scope.submitForm = function (isValid) {
      isValid && alert('our form is amazing');
    }, $scope.finishedWizard = function () {
      console.debug('End of Quiz');
    }, $scope.map = {
      center: {
        latitude: 44.9745411,
        longitude: -93.2472289
      },
      zoom: 16
    }, $scope.onFileSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'server/upload/url',
          data: { myObj: $scope.myModelObj },
          file: file
        }).progress(function (evt) {
          console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
        }).success(function (data) {
          console.log(data);
        });
      }
    }, $scope.cells = [
      {
        name: 'NE',
        id: 1
      },
      {
        name: 'NW',
        id: 2
      },
      {
        name: 'SE',
        id: 3
      },
      {
        name: 'SW',
        id: 4
      }
    ];
  }
]), angular.module('galleries').controller('MenulistController', [
  '$scope',
  function ($scope) {
    $scope.menuPic = !0, $scope.isHidden = !1, $scope.fadeIt = function () {
      $scope.isHidden = !$scope.isHidden;
    }, $scope.contents = [
      {
        title: 'Info1',
        description: 'avatar1',
        pic: '/modules/galleries/img/avatar-01.svg',
        location: '',
        Phone: '612-000-0001',
        AverageScore: 5
      },
      {
        title: 'Info2',
        description: 'avatar2',
        pic: '/modules/galleries/img/avatar-02.svg',
        location: '',
        Phone: '612-000-0002',
        AverageScore: 5
      },
      {
        title: 'Info3',
        description: 'avatar3',
        pic: '/modules/galleries/img/avatar-03.svg',
        location: '',
        Phone: '612-000-0003',
        AverageScore: 5
      },
      {
        title: 'Info4',
        description: 'avatar4',
        pic: '/modules/galleries/img/avatar-04.svg',
        location: '',
        Phone: '612-000-0004',
        AverageScore: 5
      },
      {
        title: 'Info5',
        description: 'avatar5',
        pic: '/modules/galleries/img/avatar-05.svg',
        location: '',
        Phone: '612-000-0005',
        AverageScore: 5
      },
      {
        title: 'Info6',
        description: 'avatar6',
        pic: '/modules/galleries/img/avatar-06.svg',
        location: '',
        Phone: '612-000-0006',
        AverageScore: 5
      },
      {
        title: 'Info7',
        description: 'avatar',
        pic: '/modules/galleries/img/avatar-07.svg',
        location: '',
        Phone: '612-000-0007',
        AverageScore: 5
      },
      {
        title: 'Info6',
        description: 'avatar',
        pic: '/modules/galleries/img/avatar-08.svg',
        location: '',
        Phone: '612-000-0008',
        AverageScore: 5
      }
    ];
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
}), angular.module('galleries').directive('hideMe', [
  '$animate',
  function ($animate) {
    return function (scope, element, attrs) {
      scope.$watch(attrs.hideMe, function (newVal) {
        newVal ? $animate.addClass(element, 'fade') : $animate.removeClass(element, 'fade');
      });
    };
  }
]).directive('expandMe', [
  '$animate',
  '$window',
  function ($animate) {
    return function (scope, element, attrs) {
      var page = angular.element(window);
      console.debug(page), scope.$watch(attrs.expandMe, function (newVal) {
        newVal ? ($animate.addClass(element, 'expand'), TweenMax.to(window, 1, {
          scrollTo: { y: element.offset().top - 60 },
          ease: Back.easeOut
        })) : $animate.removeClass(element, 'expand');
      });
    };
  }
]).directive('menulist', [
  '$animate',
  function ($animate) {
    return {
      restrict: 'E',
      scope: {
        source: '=',
        picture: '='
      },
      templateUrl: '/modules/galleries/directives/menulist/menulist.html',
      link: function (scope, element, attr) {
        TweenMax.to(element.children().children(), 0.75, { borderRadius: '0px 20px' }), scope.$watch(attr.hideMe, function (newVal) {
          newVal ? $animate.addClass(element, 'fade') : $animate.removeClass(element, 'fade');
        });
      },
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $scope.isExpanded = !1, $scope.expandIt = function () {
            $scope.isExpanded = !$scope.isExpanded;
          }, $element.bind('click', function (elem) {
            $scope.picture === !0 ? ($scope.picture = !1, TweenMax.to(elem, 2, { opacity: 0.1 })) : ($scope.picture = !0, TweenMax.to(elem, 2, { opacity: 1 })), $scope.$apply();
          });
        }
      ]
    };
  }
]).animation('.fade', function () {
  return {
    addClass: function (element) {
      TweenMax.to(element, 2, {
        rotationY: '+=90',
        ease: Linear.easeNone
      }), TweenMax.to(element, 2, { opacity: 0 });
    },
    removeClass: function (element) {
      TweenMax.to(element, 2, {
        rotationY: '-=90',
        ease: Linear.easeNone
      }), TweenMax.to(element, 2, { opacity: 1 });
    }
  };
}).animation('.expand', function () {
  return {
    addClass: function (element) {
      TweenMax.to(element, 1, { width: '100%' }), TweenMax.to(element, 1, { height: '300%' });
      var imageTag = element.find('img'), spanTag = element.find('span');
      TweenMax.to(imageTag, 1, { opacity: 0.2 }), TweenMax.to(spanTag, 1, { opacity: 0.8 }), TweenMax.to(spanTag, 1, { backgroundColor: '#ffffff' }), TweenMax.to(element, 0.1, { borderRadius: '0px 0px' });
    },
    removeClass: function (element) {
      TweenMax.to(element, 1, { width: '30%' }), TweenMax.to(element, 1, { height: '20%' });
      var imageTag = element.find('img'), spanTag = element.find('span');
      TweenMax.to(imageTag, 1, { opacity: 1 }), TweenMax.to(spanTag, 1, { opacity: 0 }), TweenMax.to(element, 0.1, { borderRadius: '0px 20px' });
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
]), angular.module('galleries').factory('menus', [
  '$resource',
  function ($resource) {
    return $resource('menus/:menuId', { menuId: '@_id' }, { update: { method: 'get' } });
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
]), angular.module('gwas').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('gwas-data-start', {
      url: '/gwas-data/gwas-data-start',
      templateUrl: 'modules/gwas/views/gwas-data-start.client.view.html'
    });
  }
]), angular.module('gwas').controller('GwasdatastartController', [
  '$scope',
  'Gwas',
  function ($scope, Gwas) {
    $scope.rowCollection = [
      {
        firstName: 'Kevin',
        lastName: 'Son',
        birthDate: new Date('1987-05-21'),
        balance: 102,
        email: 'whatever@gmail.com'
      },
      {
        firstName: 'Kenny',
        lastName: 'Park',
        birthDate: new Date('1987-04-25'),
        balance: -2323.22,
        email: 'oufblandou@gmail.com'
      },
      {
        firstName: 'Robert',
        lastName: 'Frere',
        birthDate: new Date('1955-08-27'),
        balance: 42343,
        email: 'raymondef@gmail.com'
      }
    ], $scope.removeRow = function (row) {
      var index = $scope.rowCollection.indexOf(row);
      -1 !== index && $scope.rowCollection.splice(index, 1);
    }, $scope.find = function () {
      $scope.Users = Gwas.query();
    };
  }
]), angular.module('gwas').factory('Gwas', [
  '$resource',
  function ($resource) {
    return $resource('users/all/:userID', { userID: '@_id' }, { update: { method: 'GET' } });
  }
]), angular.module('reviews').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Reviews', 'reviews', 'dropdown', '/reviews(/create)?'), Menus.addSubMenuItem('topbar', 'reviews', 'List Reviews', 'reviews'), Menus.addSubMenuItem('topbar', 'reviews', 'New Review', 'reviews/create');
  }
]), angular.module('reviews').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listReviews', {
      url: '/reviews',
      templateUrl: 'modules/reviews/views/list-reviews.client.view.html'
    }).state('createReview', {
      url: '/reviews/create',
      templateUrl: 'modules/reviews/views/create-review.client.view.html'
    }).state('viewReview', {
      url: '/reviews/:reviewId',
      templateUrl: 'modules/reviews/views/view-review.client.view.html'
    }).state('editReview', {
      url: '/reviews/:reviewId/edit',
      templateUrl: 'modules/reviews/views/edit-review.client.view.html'
    });
  }
]), angular.module('reviews').controller('ReviewsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Reviews',
  function ($scope, $stateParams, $location, Authentication, Reviews) {
    $scope.authentication = Authentication, $scope.create = function () {
      var review = new Reviews({ name: this.name });
      review.$save(function (response) {
        $location.path('reviews/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '';
    }, $scope.remove = function (review) {
      if (review) {
        review.$remove();
        for (var i in $scope.reviews)
          $scope.reviews[i] === review && $scope.reviews.splice(i, 1);
      } else
        $scope.review.$remove(function () {
          $location.path('reviews');
        });
    }, $scope.update = function () {
      var review = $scope.review;
      review.$update(function () {
        $location.path('reviews/' + review._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.reviews = Reviews.query();
    }, $scope.findOne = function () {
      $scope.review = Reviews.get({ reviewId: $stateParams.reviewId });
    };
  }
]), angular.module('reviews').factory('Reviews', [
  '$resource',
  function ($resource) {
    return $resource('reviews/:reviewId', { reviewId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('template').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('test-font-animation', {
      url: '/test-font-animation',
      templateUrl: 'modules/template/views/test-font-animation.client.view.html'
    }).state('draggable', {
      url: '/draggable',
      templateUrl: 'modules/template/views/draggable.client.view.html'
    }).state('set-row-col', {
      url: '/setrowcol',
      templateUrl: 'modules/template/views/set-row-col.client.view.html'
    });
  }
]), angular.module('template').controller('DraggableController', [
  '$scope',
  '$element',
  function () {
    function update() {
      Draggable.create('.box', {
        bounds: container,
        edgeResistance: 0.65,
        type: 'x,y',
        throwProps: !0,
        liveSnap: liveSnap,
        snap: {
          x: function (endValue) {
            return snap || liveSnap ? Math.round(endValue / gridWidth) * gridWidth : endValue;
          },
          y: function (endValue) {
            return snap || liveSnap ? Math.round(endValue / gridHeight) * gridHeight : endValue;
          }
        }
      });
    }
    var i, x, y, snap = angular.element(document.querySelector('#snap')), liveSnap = angular.element(document.querySelector('#liveSnap')), container = angular.element(document.querySelector('#container')), gridWidth = 196, gridHeight = 100, gridRows = 6, gridColumns = 5;
    for (i = 0; gridRows * gridColumns > i; i++)
      y = Math.floor(i / gridColumns) * gridHeight, x = i * gridWidth % (gridColumns * gridWidth);
    TweenLite.set(container, {
      height: gridRows * gridHeight + 1,
      width: gridColumns * gridWidth + 1
    }), TweenLite.set('.box', {
      width: gridWidth,
      height: gridHeight,
      lineHeight: gridHeight + 'px'
    }), update();
  }
]), angular.module('template').controller('SetrowcolController', [
  '$scope',
  function ($scope) {
    $scope.title = 'Set Row and Col';
  }
]), angular.module('template').controller('TestfontanimationController', [
  '$scope',
  function ($scope) {
    $scope.title = 'Set Row and Col';
  }
]), angular.module('template').directive('bannerFront', [function () {
    return {
      templateUrl: 'modules/template/directives/banner-front.html',
      restrict: 'E',
      link: function (scope) {
        function updateSlider() {
        }
        var tl = new TimelineLite({ onUpdate: updateSlider });
        tl.set('#content', { visibility: 'visible' }).from('h1', 0.5, {
          left: 100,
          autoAlpha: 0
        }).from('h2', 0.5, {
          left: -100,
          autoAlpha: 0
        }, '-=0.25').from('#feature', 0.5, {
          scale: 0.5,
          autoAlpha: 0
        }, 'feature').from('#description', 0.5, {
          left: 100,
          autoAlpha: 0
        }, 'feature+=0.25').staggerFrom('#nav img', 0.5, {
          scale: 0,
          rotation: -180,
          autoAlpha: 0
        }, 0.2, 'stagger'), scope.play = function () {
          1 != tl.progress() ? tl.play() : tl.restart();
        }, scope.pause = function () {
          tl.pause();
        }, scope.reverse = function () {
          tl.reverse();
        }, scope.resume = function () {
          tl.resume();
        }, scope.restart = function () {
          tl.restart();
        };
      }
    };
  }]), angular.module('template').directive('fontAnimation', [function () {
    return {
      templateUrl: 'modules/template/directives/fontAnimation.html',
      restrict: 'E',
      link: function () {
      }
    };
  }]);
var module = angular.module('template', []);
if ('undefined' == typeof ngAlohaEditorConfig)
  var ngAlohaEditorConfig = { baseUrl: '' };
Aloha = window.Aloha || {}, Aloha.settings = Aloha.settings || {};
var DirectiveSettings = {
    baseUrl: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib',
    logLevels: {
      error: !0,
      warn: !0,
      info: !1,
      debug: !1
    },
    errorhandling: !1
  };
jQuery.extend(Aloha.settings, DirectiveSettings), module.directive('aloha', [
  '$location',
  '$rootScope',
  function ($location, $rootScope) {
    function preventAngularRouting(elem) {
      Aloha.jQuery(elem).click(function () {
        return !1;
      });
    }
    function replaceAngularLinkClickHandler(elem) {
      preventAngularRouting(elem), Aloha.jQuery(elem).on('click', 'a', function (e) {
        var href = $(this).attr('href');
        (e.metaKey || e.ctrlKey) && ('/' === href.charAt(0) ? ($location.url(href), e.preventDefault()) : window.location.href = href);
      });
    }
    function disableAlohaCtrlClickHandler() {
      Aloha.ready(function () {
        Aloha.bind('aloha-editable-activated', function (event, msg) {
          var editable = msg.editable;
          setTimeout(function () {
            editable.obj.unbind('click.aloha-link.meta-click-link');
          }, 10);
        });
      });
    }
    function alohaElement(element) {
      Aloha.ready(function () {
        Aloha.jQuery(element).aloha();
      });
    }
    var count = 0, fromAloha = !1;
    return disableAlohaCtrlClickHandler(), {
      priority: -1000,
      terminal: !0,
      scope: { alohaContent: '=' },
      link: function (scope, elem) {
        var elementId = '' + count++, uniqeClass = 'angular-aloha-element' + elementId;
        elem[0].classList.add(uniqeClass), elem.data('ng-aloha-element-id', elementId), Aloha.ready(function () {
          scope.$emit('texteditor-js-ready'), elem.hasClass('aloha-editable') || alohaElement(elem), scope.$emit('texteditor-ready', elem), Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent), scope.$watch('alohaContent', function () {
            fromAloha || Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);
          }), Aloha.bind('aloha-selection-changed', function (jQueryEvent, alohaEditable) {
            jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id') && scope.$emit('texteditor-selection-changed', jQueryEvent, alohaEditable);
          }), Aloha.bind('aloha-editable-deactivated', function (jQueryEvent, alohaEditable) {
            jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id') && scope.$emit('texteditor-editable-deactivated', jQueryEvent, alohaEditable);
          }), Aloha.bind('aloha-smart-content-changed', function (jQueryEvent, alohaEditable) {
            fromAloha = !1, jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id') && (scope.alohaContent = alohaEditable.editable.getContents(), fromAloha = !0, $rootScope.$$phase || $rootScope.$apply(), scope.$emit('texteditor-content-changed', jQueryEvent, alohaEditable));
          }), Aloha.bind('aloha-command-executed', function (jQueryEvent, eventArgument) {
            jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id') && scope.$emit('texteditor-command-executed', eventArgument);
          });
        }), replaceAngularLinkClickHandler(elem);
      }
    };
  }
]), angular.module('template').directive('setRowCol', [function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function (scope, element) {
        element.text('this is the setRowCol directive');
      }
    };
  }]), angular.module('users').config([
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