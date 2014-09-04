'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'mean';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'google-maps',
        'mgo-angular-wizard',
        'angularFileUpload',
        'smart-table',
        'ui.ace',
        'ngSanitize'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('draggable');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('galleries');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('gwas');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('opencpu');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('reviews');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('template');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
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
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$sce',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $sce, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.title = '';
      this.content = '';
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  '$element',
  'Authentication',
  'YT_event',
  function ($scope, $element, Authentication, YT_event) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.firstJumbo = 'first-jumbo-content';
    $scope.secondJumbo = 'second-jumbo-content';
    $scope.thirdJumbo = 'third-jumbo-content';
    var texts = $('.core-text-anni');
    var tl = new TimelineMax({
        repeat: 6,
        repeatDelay: 1,
        yoyo: true
      });
    tl.staggerTo(texts, 0.2, {
      className: '+=superShadow',
      top: '-=10px',
      ease: Power1.easeIn
    }, '0.3', 'start');
    // YouTube Directive Setting Start
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
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      $scope.yt.playerStatus = data;
    });  // YouTube Directive Setting End
  }
]);/**
 * Created by KevinSo on 9/3/2014.
 */
'use strict';
angular.module('core').controller('PlanController', [
  '$scope',
  '$element',
  'Authentication',
  'Getplans',
  function ($scope, $element, Authentication, Getplans) {
    $scope.plans = Getplans;
    $scope.find = function () {
      $scope.plans = Getplans.query();  //$scope.plans.contents = $sce.trustAsHtml($scope.plans.contents);
    };
    $scope.find();  //$scope.plans = [{title: 'test1', body:'content', date:""}];
  }
]);'use strict';
angular.module('core').factory('Getplans', [
  '$resource',
  function ($resource) {
    // Getplans service logic
    // ...
    // Public API
    return $resource('/articles', { userID: '@_id' }, { update: { method: 'GET' } });
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
//Setting up route
angular.module('draggable').config([
  '$stateProvider',
  function ($stateProvider) {
    // Draggable state routing
    $stateProvider.state('draggable-main', {
      url: '/draggable',
      templateUrl: 'modules/draggable/views/draggable-main.client.view.html'
    });
  }
]);'use strict';
angular.module('draggable').controller('DraggableController', [
  '$scope',
  function ($scope) {
    // Controller Logic
    // ...
    var $snap = $('#snap'), $liveSnap = $('#liveSnap'), $container = $('.draggable-container'), gridWidth = 196, gridHeight = 100, gridRows = 6, gridColumns = 5, i, x, y;
    //loop through and create the grid (a div for each cell). Feel free to tweak the variables above
    for (i = 0; i < gridRows * gridColumns; i++) {
      y = Math.floor(i / gridColumns) * gridHeight;
      x = i * gridWidth % (gridColumns * gridWidth);
      $('<div/>').css({
        position: 'absolute',
        border: '1px solid #454545',
        width: gridWidth - 1,
        height: gridHeight - 1,
        top: y,
        left: x
      }).prependTo($container);
    }
    //set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
    TweenLite.set($container, {
      height: gridRows * gridHeight + 1,
      width: gridColumns * gridWidth + 1
    });
    TweenLite.set('.draggable-box', {
      width: gridWidth,
      height: gridHeight,
      lineHeight: gridHeight + 'px'
    });
    //the update() function is what creates the Draggable according to the options selected (snapping).
    function update() {
      var snap = $snap.prop('checked'), liveSnap = $liveSnap.prop('checked');
      Draggable.create('.draggable-box', {
        bounds: $container,
        edgeResistance: 0.65,
        type: 'x,y',
        throwProps: true,
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
    //when the user toggles one of the "snap" modes, make the necessary updates...
    $snap.on('change', applySnap);
    $liveSnap.on('change', applySnap);
    function applySnap() {
      if ($snap.prop('checked') || $liveSnap.prop('checked')) {
        $('.draggable-box').each(function (index, element) {
          TweenLite.to(element, 0.5, {
            x: Math.round(element._gsTransform.x / gridWidth) * gridWidth,
            y: Math.round(element._gsTransform.y / gridHeight) * gridHeight,
            delay: 0.1,
            ease: Power2.easeInOut
          });
        });
      }
      update();
    }
    update();
  }
]);'use strict';
// Configuring the Articles module
angular.module('galleries').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    //Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, [menuItemUIRoute], [isPublic], [roles]);
    Menus.addMenuItem('topbar', 'Galleries', 'galleries', 'dropdown', '/galleries(/create)?');
    //Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, [menuItemUIRoute], [isPublic], [roles]);
    Menus.addSubMenuItem('topbar', 'galleries', 'List Galleries', 'galleries');
    //Menus.addSubMenuItem('topbar', 'galleries', 'View Test', 'galleries/gview');
    Menus.addSubMenuItem('topbar', 'galleries', 'New Gallery', 'galleries/create');
  }
]);'use strict';
//Setting up route
angular.module('galleries').config([
  '$stateProvider',
  function ($stateProvider) {
    // Galleries state routing
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
]);'use strict';
// Galleries controller
angular.module('galleries').controller('GalleriesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Galleries',
  function ($scope, $stateParams, $location, Authentication, Galleries) {
    $scope.authentication = Authentication;
    $scope.examples = [
      {
        name: 'Example One',
        content: '<p style="">Pic 1</p><p style=""><img style="height: 103px; width: 118px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; padding: 2px; top: 0px; left: 0px; float: none;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObpe9xATvc5SpkrWEtGS5ZWlSxmSjHhV3yIE604Arh3aoANOyJPAuGSc" title="" class=""></p><p style="">Pic 2</p><p style=""><img style="height: 130px; width: 117px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; top: 0px; left: 0px; padding: 3px;" src="http://stylonica.com/wp-content/uploads/2014/02/Cute-marshmallow-Wallpapers-HD.jpg" title="" class=""></p><p style=""><br></p><p style=""><br></p><p style=""><br></p><p style=""><br></p>'
      },
      {
        name: 'Example Two',
        content: '<h1>Ut enim consuetudo loquitur, id solum dicitur honestum, quod est populari fama gloriosum.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque contra est, ac dicitis; <b>Quid censes in Latino fore?</b> </p><p>Hic ambiguo ludimur. <a href="http://loripsum.net/" target="_blank">Disserendi artem nullam habuit.</a> <i>At multis se probavit.</i> Reguli reiciendam; </p><p>Quid autem habent admirationis, cum prope accesseris? Peccata paria. <i>Quid de Pythagora?</i> Illi enim inter se dissentiunt. <a href="http://loripsum.net/" target="_blank">Videamus animi partes, quarum est conspectus illustrior;</a> Utilitatis causa amicitia est quaesita. Duo Reges: constructio interrete. </p>'
      }
    ];
    // Create new Gallery
    $scope.create = function () {
      // Create new Gallery object
      var gallery = new Galleries({ name: this.name });
      // Redirect after save
      gallery.$save(function (response) {
        $location.path('galleries/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Gallery
    $scope.remove = function (gallery) {
      if (gallery) {
        gallery.$remove();
        for (var i in $scope.galleries) {
          if ($scope.galleries[i] === gallery) {
            $scope.galleries.splice(i, 1);
          }
        }
      } else {
        $scope.gallery.$remove(function () {
          $location.path('galleries');
        });
      }
    };
    // Update existing Gallery
    $scope.update = function () {
      var gallery = $scope.gallery;
      gallery.$update(function () {
        $location.path('galleries/' + gallery._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Galleries
    $scope.find = function () {
      $scope.galleries = Galleries.query();
    };
    // Find existing Gallery
    $scope.findOne = function () {
      $scope.gallery = Galleries.get({ galleryId: $stateParams.galleryId });
    };
  }
]);'use strict';
angular.module('galleries').controller('GviewController', [
  '$scope',
  '$http',
  'YT_event',
  function ($scope, $http, YT_event) {
    /*
        $scope.photos = [
            {id: 'p1', 'title': 'A nice day!', src: 'http://lorempixel.com/300/400/'},
            {id: 'p2', 'title': 'Puh!', src: 'http://lorempixel.com/300/400/sports'},
            {id: 'p3', 'title': 'What a club!', src: 'http://lorempixel.com/300/400/nightlife'}
        ];

        $scope.template =
            '<div deckgrid class='deckgrid' source='photos'>'+
                '<div class="a-card">' +
                    '<h1>{{card.title}}</h1>' +
                    '<img src="" data-ng-src="{{card.src}}">'+
                '</div>' +
            '</div>'
        */
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
    $scope.hours = [
      'Mon\t11:00 am - 10:00 pm',
      'Tue\t11:00 am - 10:00 pm',
      'Wed\t11:00 am - 10:00 pm',
      'Thu\t11:00 am - 10:00 pm',
      'Fri\t11:00 am - 11:00 pm',
      'Sat\t11:00 am - 11:00 pm\tOpen now',
      'Sun\t9:00 am - 2:00 pm'
    ];
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
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      $scope.yt.playerStatus = data;
    });
    /**
         * DRAG event handler
         */
    $scope.onDrag = function (value) {
      $scope.currentRotation = value;
    };
    /**
         * DRAG END event handler
         */
    $scope.onDragEnd = function (value) {
      $scope.currentRotation = value;
      console.log('DRAG_END', value);
    };
    $scope.testDraggable = function () {
    };
    $scope.expandAnimation = function (element) {
      console.log('!!');
      var t1 = new TimelineMax();
      //append a to() tween
      //t1.to(element.currentTarget, 0.5, {width:'50px'});
      //add another sequenced tween (by default, tweens are added to the end of the timeline which makes sequencing simple)
      //t1.to(element.currentTarget, 0.5, {height:'60px', ease:Elastic.easeOut});
      //offset the next tween by 0.75 seconds so there's a gap between the end of the previous tween and this new one
      t1.to(element.currentTarget, 0.2, { opacity: 0.5 }, '+=0.75');
      //overlap the next tween with the previous one by 0.5 seconds (notice the negative offset at the end)
      //t1.to(element.currentTarget, 0.2, {backgroundColor:'#FF0000'}, '-=0.5');
      //animate 3 elements (e1, e2, and e3) to a rotation of 60 degrees, and stagger their start times by 0.2 seconds
      //t1.staggerTo(element.currentTarget, 1, {rotation:60}, 0.2);
      t1.to(element.currentTarget, 0.2, {
        left: '20px',
        repeat: 1,
        yoyo: true
      });
      t1.to(element.currentTarget, 0.2, {
        right: '20px',
        repeat: 1,
        yoyo: true
      });
      t1.restart();  //t1.reverse(2.5)
    };
  }
]);/**
 * Created by KevinSo on 8/11/2014.
 */
'use strict';
angular.module('galleries').controller('MenuformController', [
  '$scope',
  '$upload',
  '$element',
  function ($scope, $upload, $element) {
    $scope.title = 'Form Steps';
    $scope.user = {
      name: 'Kevin',
      username: 'kruny1001',
      email: 'test@test.com',
      address: '123 1st st. M 12345'
    };
    // function to submit the form after all validation has occurred
    $scope.submitForm = function (isValid) {
      // check to make sure the form is completely valid
      if (isValid) {
        alert('our form is amazing');
      }
    };
    $scope.finishedWizard = function () {
      console.debug('End of Quiz');
    };
    $scope.map = {
      center: {
        latitude: 44.9745411,
        longitude: -93.2472289
      },
      zoom: 16
    };
    $scope.onFileSelect = function ($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'server/upload/url',
          data: { myObj: $scope.myModelObj },
          file: file
        }).progress(function (evt) {
          console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });  //.error(...)
             //.then(success, error, progress);
             // access or attach event listeners to the underlying XMLHttpRequest.
             //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }  /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
         It could also be used to monitor the progress of a normal http post/put request with large data*/
         // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };
    $scope.cells = [
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
    ];  /*
    $scope.test1 = function test1(ele){
        console.log(ele);
        //console.log(this);
        TweenMax.to(ele.fromElement, .2, {opacity:0.2});
    };
    $scope.test2 = function test2(ele){
        console.log(ele);
        //console.log(this);
        TweenMax.to(ele.fromElement, .2, {opacity:1});
    }
    */
  }
]);'use strict';
angular.module('galleries').controller('MenulistController', [
  '$scope',
  function ($scope) {
    // Menulist controller controller logic
    // ...
    $scope.menuPic = true;
    $scope.isHidden = false;
    $scope.fadeIt = function () {
      $scope.isHidden = !$scope.isHidden;
    };
    $scope.contents = [
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
    ];  /*
        var preloader = new GSPreloader({
            radius:42,
            dotSize:15,
            dotCount:10,
            colors:["#61AC27","#555","purple","#FF6600"], //have as many or as few colors as you want.
            boxOpacity:0.2,
            boxBorder:"1px solid #AAA",
            animationOffset: 1.8, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
        });

        //open the preloader
        preloader.active(true);

        //for testing: click the window to toggle open/close the preloader
        document.onclick = document.ontouchstart = function() {
            preloader.active( !preloader.active() );
        };

        //this is the whole preloader class/function
        function GSPreloader(options) {
            options = options || {};
            var parent = options.parent || document.body,
                element = this.element = document.createElement("div"),
                radius = options.radius || 42,
                dotSize = options.dotSize || 15,
                animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
                createDot = function(rotation) {
                    var dot = document.createElement("div");
                    element.appendChild(dot);
                    TweenLite.set(dot, {width:dotSize, height:dotSize, transformOrigin:(-radius + "px 0px"), x: radius, backgroundColor:colors[colors.length-1], borderRadius:"50%", force3D:true, position:"absolute", rotation:rotation});
                    dot.className = options.dotClass || "preloader-dot";
                    return dot;
                },
                i = options.dotCount || 10,
                rotationIncrement = 360 / i,
                colors = options.colors || ["#61AC27","black"],
                animation = new TimelineLite({paused:true}),
                dots = [],
                isActive = false,
                box = document.createElement("div"),
                tl, dot, closingAnimation, j;
            colors.push(colors.shift());

            //setup background box
            TweenLite.set(box, {width: radius * 2 + 70, height: radius * 2 + 70, borderRadius:"14px", backgroundColor:options.boxColor || "white", border: options.boxBorder || "1px solid #AAA", position:"absolute", xPercent:-50, yPercent:-50, opacity:((options.boxOpacity != null) ? options.boxOpacity : 0.3)});
            box.className = options.boxClass || "preloader-box";
            element.appendChild(box);

            parent.appendChild(element);
            TweenLite.set(element, {position:"fixed", top:"45%", left:"50%", perspective:600, overflow:"visible", zIndex:2000});
            animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);
            while (--i > -1) {
                dot = createDot(i * rotationIncrement);
                dots.unshift(dot);
                animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
                //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
                tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
                for (j = 0; j < colors.length; j++) {
                    tl.to(dot, 2.5, {rotation:"-=360", ease:Power2.easeInOut}, j * 2.9)
                        .to(dot, 1.2, {skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut}, 1.6 + 2.9 * j);
                }
                //stagger its placement into the master timeline
                animation.add(tl, i * 0.07);
            }
            if (TweenLite.render) {
                TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
            }

            //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
            this.active = function(show) {
                if (!arguments.length) {
                    return isActive;
                }
                if (isActive != show) {
                    isActive = show;
                    if (closingAnimation) {
                        closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
                    }
                    if (isActive) {
                        element.style.visibility = "visible";
                        TweenLite.set([element, box], {rotation:0});
                        animation.play(animationOffset);
                    } else {
                        closingAnimation = new TimelineLite();
                        if (animation.time() < animationOffset + 0.3) {
                            animation.pause();
                            closingAnimation.to(element, 1, {rotation:-360, ease:Power1.easeInOut}).to(box, 1, {rotation:360, ease:Power1.easeInOut}, 0);
                        }
                        closingAnimation.staggerTo(dots, 0.3, {scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0).to(box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0).call(function() { animation.pause(); closingAnimation = null; }).set(element, {visibility:"hidden"});
                    }
                }
                return this;
            };
        }
        */
  }
]);'use strict';
angular.module('galleries').controller('TestpolymerController', [
  '$scope',
  'polymerPost',
  function ($scope, polymerPost) {
    // Test polymer controller logic
    // ...
    $scope.toggleDialog = function (transition) {
      var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
      dialog.toggle();
    };
    $scope.posts = polymerPost.getAllPosts();
    $scope.getAllUsers = function () {
      $scope.posts = polymerPost.getAllPosts();
    };
    $scope.getFavorites = function () {
      $scope.posts = [];
      $scope.posts.push(polymerPost.getPost(2));
    };
    $scope.clickFavorit = function () {
      console.log('!!');
    };
    $scope.testClick = function () {
      console.log('Clicked Button');
    };
  }
]);'use strict';
angular.module('galleries').controller('UserlistController', [
  '$scope',
  'testuserlist',
  'ContactService',
  'Authentication',
  'Listusers',
  function ($scope, testuserlist, ContactService, Authentication, Listusers) {
    $scope.authentication = Authentication;
    $scope.users = testuserlist.users;
    //$scope.galleries = Listusers.query();
    $scope.contacts = ContactService.list();
    $scope.saveContact = function () {
      ContactService.save($scope.newcontact);
      $scope.newcontact = {};
    };
    $scope.delete = function (id) {
      ContactService.delete(id);
      if ($scope.newcontact.id === id)
        $scope.newcontact = {};
    };
    $scope.edit = function (id) {
      $scope.newcontact = angular.copy(ContactService.get(id));
    };
    // Find a list of Galleries
    $scope.find = function () {
      $scope.galleries = Listusers.query();
    };
  }
]);'use strict';
angular.module('galleries').directive('hoverExpandShrink', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // Hover expand shrink directive logic
        element.on('mouseleave', function () {
          TweenMax.to(element, 0.5, {
            scale: 1,
            ease: Back.easeOut
          });
        });
        element.on('mouseenter', function () {
          //console.log('enter');
          TweenMax.to(element, 0.5, {
            scale: 1.2,
            ease: Back.easeOut
          });
        });
      }
    };
  }]);/**
 * Created by KevinSo on 7/31/2014.
 */
'use strict';
angular.module('galleries').directive('mdraggable', function () {
  return {
    restrict: 'A',
    scope: {
      onDragEnd: '&',
      onDrag: '&'
    },
    link: function (scope, element) {
      Draggable.create(element, {
        type: 'rotation',
        throwProps: true,
        onDrag: function () {
          scope.rotation = this.rotation;
          scope.$apply(function () {
            scope.onDrag({ rotation: scope.rotation });
          });
        },
        onDragEnd: function () {
          scope.rotation = this.rotation;
          scope.$apply(function () {
            scope.onDragEnd({ rotation: scope.rotation });
          });
        },
        snap: function (endValue) {
          //this function gets called when the mouse/finger is released
          // and it plots where rotation should normally end and we can
          // alter that value and return a new one instead.
          // This gives us an easy way to apply custom snapping
          // behavior with any logic we want. In this case,
          // we'll just make sure the end value snaps to 90-degree
          // increments but only when the "snap" checkbox is selected.
          return Math.round(endValue / 45) * 45;
        }
      });
    }
  };
});/**
 * Created by KevinSo on 8/6/2014.
 */
'use strict';
angular.module('galleries').directive('hideMe', [
  '$animate',
  function ($animate) {
    return function (scope, element, attrs) {
      scope.$watch(attrs.hideMe, function (newVal) {
        if (newVal) {
          $animate.addClass(element, 'fade');
        } else {
          $animate.removeClass(element, 'fade');
        }
      });
    };
  }
]).directive('expandMe', [
  '$animate',
  '$window',
  function ($animate, $window) {
    return function (scope, element, attrs) {
      var page = angular.element(window);
      console.debug(page);
      scope.$watch(attrs.expandMe, function (newVal) {
        if (newVal) {
          $animate.addClass(element, 'expand');
          //ScrollTo Y close to a targeting content
          TweenMax.to(window, 1, {
            scrollTo: { y: element.offset().top - 60 },
            ease: Back.easeOut
          });  //window.scrollTo();
        } else {
          $animate.removeClass(element, 'expand');
        }
      });
    };
  }
]).directive('menulist', [
  '$animate',
  function ($animate) {
    return {
      restrict: 'E',
      scope: {
        'source': '=',
        'picture': '='
      },
      templateUrl: '/modules/galleries/directives/menulist/menulist.html',
      link: function (scope, element, attr, ctrl) {
        TweenMax.to(element.children().children(), 0.75, { borderRadius: '0px 20px' });
        scope.$watch(attr.hideMe, function (newVal) {
          if (newVal) {
            $animate.addClass(element, 'fade');
          } else {
            $animate.removeClass(element, 'fade');
          }
        });
      },
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $scope.isExpanded = false;
          $scope.expandIt = function () {
            $scope.isExpanded = !$scope.isExpanded;
          };
          $element.bind('click', function (elem) {
            if ($scope.picture === true) {
              $scope.picture = false;
              TweenMax.to(elem, 2, { opacity: 0.1 });
            } else {
              $scope.picture = true;
              TweenMax.to(elem, 2, { opacity: 1 });
            }
            $scope.$apply();
          });
        }
      ]
    };
  }
]).animation('.fade', function () {
  return {
    addClass: function (element, className) {
      TweenMax.to(element, 2, {
        rotationY: '+=90',
        ease: Linear.easeNone
      });
      TweenMax.to(element, 2, { opacity: 0 });
    },
    removeClass: function (element, className) {
      TweenMax.to(element, 2, {
        rotationY: '-=90',
        ease: Linear.easeNone
      });
      TweenMax.to(element, 2, { opacity: 1 });
    }
  };
}).animation('.expand', function () {
  return {
    addClass: function (element, className) {
      TweenMax.to(element, 1, { width: '100%' });
      TweenMax.to(element, 1, { height: '300%' });
      var imageTag = element.find('img');
      var spanTag = element.find('span');
      TweenMax.to(imageTag, 1, { opacity: 0.2 });
      TweenMax.to(spanTag, 1, { opacity: 0.8 });
      TweenMax.to(spanTag, 1, { backgroundColor: '#ffffff' });
      TweenMax.to(element, 0.1, { borderRadius: '0px 0px' });  //TweenMax.to(element, 1, {opacity: 1});
    },
    removeClass: function (element, className) {
      TweenMax.to(element, 1, { width: '30%' });
      TweenMax.to(element, 1, { height: '20%' });
      var imageTag = element.find('img');
      var spanTag = element.find('span');
      TweenMax.to(imageTag, 1, { opacity: 1 });
      TweenMax.to(spanTag, 1, { opacity: 0 });
      TweenMax.to(element, 0.1, { borderRadius: '0px 20px' });
    }
  };
});/*
'use strict';

// This is the test of MongoDB with Mongoose

//
// Preamble
var http = require ('http');	     // For serving a basic web page.
var mongoose = require ('mongoose'); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: { type: String, trim: true }
    },
    age: { type: Number, min: 0}
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var PUser = mongoose.model('PowerUsers', userSchema);

// Clear out old data
PUser.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});

// Creating one user.
var johndoe = new PUser ({
    name: { first: 'John', last: '  Doe   ' },
    age: 25
});

// Saving it to the database.  
johndoe.save(function (err) {if (err) console.log ('Error on save!');});

// Creating more users manually
var janedoe = new PUser ({
    name: { first: 'Jane', last: 'Doe' },
    age: 65
});
janedoe.save(function (err) {if (err) console.log ('Error on save!');});

// Creating more users manually
var alicesmith = new PUser ({
    name: { first: 'Alice', last: 'Smith' },
    age: 45
});
alicesmith.save(function (err) {if (err) console.log ('Error on save!');});


// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

// Create a rudimentary http server.  (Note, a real web application
// would use a complete web framework and router like express.js). 
// This is effectively the main interaction loop for the application. 
// As new http requests arrive, the callback function gets invoked.
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    createWebpage(req, res);
    findPerson(req, res);
}).listen(theport);

function createWebpage (req, res) {
    // Let's find all the documents
    PUser.find({}).exec(function(err, result) {
        if (!err) {
            res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
            // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
            var query = PUser.find({'name.last': 'Doe'}); // (ok in this example, it's all entries)
            query.where('age').gt(64);
            query.exec(function(err, result) {
                if (!err) {
                    res.end(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
                    //console.log(result);
                } else {
                    res.end('Error in second query. ' + err)
                }
            });

            //console.log(result);

        } else {
            res.end('Error in first query. ' + err)
        };
    });
}

function findPerson(req, res){
    var query = PUser.findOne({'name.last': 'Doe'});

    //selecting the 'name' and 'age' fields
    query.select('name age');
    query.exec(function(err, person){
        if(err) return handleError(err);
        console.log('%s %s is a %s.', person.name.first, person.name.last, person.age)
    });


}

// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');
//
// House keeping.

//
// The rudimentary HTML content in three pieces.
var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';

var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="http://github.com/mongolab/hello-mongoose">github.com</a> </i></center>';

*/
/*
    History:
        20140716 Create a directive

**/
'use strict';
angular.module('galleries').directive('productDescription', [function () {
    return {
      templateUrl: '/modules/galleries/directives/product-description/product-description.html',
      restrict: 'E'
    };
  }]);/**
 * Created by KevinSo on 7/24/2014.
 */
'use strict';
angular.module('galleries').directive('quiz', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/modules/galleries/directives/quiz/quiz.html',
    link: function (scope, elem, attrs) {
      elem.bind('mouseover', function () {
        elem.css('cursor', 'pointer');
      });
    }
  };
});/**
 * Created by KevinSo on 7/25/2014.
 */
'use strict';
angular.module('galleries').directive('watchShop', function () {
  return {
    restrict: 'E',
    replace: true,
    controller: 'TestpolymerController',
    templateUrl: '/modules/galleries/directives/watch-shop/watch-shop.html',
    link: {
      pre: function preLink(a, b, c, d) {
      },
      post: function postLink(a, b, c, d) {
      }
    }
  };
});/**
 * Created by KevinSo on 7/29/2014.
 *
 * ref: http://blog.oxrud.com/posts/creating-youtube-directive/
 *
 * Files
 * /youtube.client.directive.js
 * /youtube/youtube.html
 *
 * Example
 *
 <youtube width="{{yt.width}}" height="{{yt.height}}" videoid="{{yt.videoid}}"></youtube>
 <br />
 Width:<input type="text" ng-model="yt.width">
 Height:<input type="text" ng-model="yt.height">
 Videoid:<input type="text" ng-model="yt.videoid">

 <br />

 <button ng-click="sendControlEvent(YT_event.PLAY)">Send Play</button>
 <button ng-click="sendControlEvent(YT_event.PAUSE)">Send Pause</button>
 <button ng-click="sendControlEvent(YT_event.STOP)">Send Stop</button>

 <p>Player status is: {{yt.playerStatus}}</p>

 *
 */
'use strict';
angular.module('galleries').constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});
angular.module('galleries').directive('youtube', [
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
      link: function (scope, element, attrs, $rootScope) {
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
              'onStateChange': function (event) {
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
                  break;
                }
                scope.$apply(function () {
                  scope.$emit(message.event, message.data);
                });
              }
            }
          });
        };
        scope.$watch('height + width', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          player.setSize(scope.width, scope.height);
        });
        scope.$watch('videoid', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          player.cueVideoById(scope.videoid);
        });
        scope.$on(YT_event.STOP, function () {
          player.seekTo(0);
          player.stopVideo();
        });
        scope.$on(YT_event.PLAY, function () {
          player.playVideo();
        });
        scope.$on(YT_event.PAUSE, function () {
          player.pauseVideo();
        });
      }
    };
  }
]);'use strict';
angular.module('galleries').service('ContactService', [function () {
    //to create unique contact id
    var uid = 1;
    var contacts = [{
          id: 0,
          'name': 'Kevin',
          'email': 'test@test.com',
          'phone': '123-123-1234'
        }];
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
      if (contact.id === null) {
        contact.id = uid++;
        contacts.push(contact);
      } else {
        for (var i in contacts) {
          if (contacts[i].id === contact.id) {
            contacts[i] = contact;
          }
        }
      }
    };
    this.get = function (id) {
      for (var i in contacts) {
        if (contacts[i].id === id) {
          return contacts[i];
        }
      }
    };
    this.delete = function (id) {
      for (var i in contacts) {
        if (contacts[i].id === id) {
          contacts.splice(i, 1);
        }
      }
    };
    this.list = function () {
      return contacts;
    };
  }]);'use strict';
//Galleries service used to communicate Galleries REST endpoints
angular.module('galleries').factory('Galleries', [
  '$resource',
  function ($resource) {
    return $resource('galleries/:galleryId', { galleryId: '@_id' }, { update: { method: 'PUT' } });
  }
]);/**
 * Created by KevinSo on 8/11/2014.
 */
'use strict';
//Galleries service used to communicate Galleries REST endpoints
angular.module('galleries').factory('menus', [
  '$resource',
  function ($resource) {
    return $resource('menus/:menuId', { menuId: '@_id' }, { update: { method: 'get' } });
  }
]);/**
 * Created by KevinSo on 7/24/2014.
 */
'use strict';
angular.module('galleries').factory('polymerPost', function () {
  var posts = [
      {
        'uid': 1,
        'text': 'Have you heard about the Web Components revolution?',
        'username': 'Eric',
        'avatar': '/modules/galleries/img/avatar-01.svg',
        'favorite': false
      },
      {
        'uid': 2,
        'text': 'Loving this Polymer thing.',
        'username': 'Rob',
        'avatar': '/modules/galleries/img/avatar-02.svg',
        'favorite': false
      },
      {
        'uid': 3,
        'text': 'So last year...',
        'username': 'Dimitri',
        'avatar': '/modules/galleries/img/avatar-03.svg',
        'favorite': false
      },
      {
        'uid': 4,
        'text': 'Pretty sure I came up with that first.',
        'username': 'Ada',
        'avatar': '/modules/galleries/img/avatar-07.svg',
        'favorite': false
      },
      {
        'uid': 5,
        'text': 'Yo, I heard you like components, so I put a component in your component.',
        'username': 'Grace',
        'avatar': '/modules/galleries/img/avatar-08.svg',
        'favorite': false
      },
      {
        'uid': 6,
        'text': 'Centralize, centrailize.',
        'username': 'John',
        'avatar': '/modules/galleries/img/avatar-04.svg',
        'favorite': false
      },
      {
        'uid': 7,
        'text': 'Has anyone seen my cat?',
        'username': 'Zelda',
        'avatar': '/modules/galleries/img/avatar-06.svg',
        'favorite': false
      },
      {
        'uid': 8,
        'text': 'Decentralize!',
        'username': 'Norbert',
        'avatar': '/modules/galleries/img/avatar-05.svg',
        'favorite': false
      }
    ];
  function getAllPosts() {
    return posts;
  }
  function getPost(uid) {
    var filtered = _.filter(posts, function (c) {
        return c.uid === uid;
      });
    return filtered[0];
  }
  return {
    getAllPosts: getAllPosts,
    getPost: getPost
  };
});/**
 * Created by KevinSo on 7/14/2014.
 */
'use strict';
angular.module('galleries').factory('testuserlist', [
  '$resource',
  function ($resource) {
    var fac = {};
    fac.users = [
      'Kevin',
      'CK',
      'Jacob'
    ];
    return fac;
  }
]);
//galleries service used for communicating with the articles REST endpoints
angular.module('galleries').factory('Listusers', [
  '$resource',
  function ($resource) {
    return $resource('/galleries', {}, { update: { method: 'GET' } });
  }
]);/*!
 * VERSION: 0.9.0
 * DATE: 2013-10-21
 * JavaScript (also available in ActionScript 3 and 2)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * ThrowPropsPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/*
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("plugins.ThrowPropsPlugin",["plugins.TweenPlugin","TweenLite","easing.Ease","utils.VelocityTracker"],function(t,e,i,s){var r,n,a,o,l=function(){t.call(this,"throwProps"),this._overwriteProps.length=0},h=999999999999999,u={x:1,y:1,z:2,scale:1,scaleX:1,scaleY:1,rotation:1,rotationZ:1,rotationX:2,rotationY:2,skewX:1,skewY:1},_=function(t,e,i,s){for(var r,n,a=e.length,o=0,l=h;--a>-1;)r=e[a],n=r-t,0>n&&(n=-n),l>n&&r>=s&&i>=r&&(o=a,l=n);return e[o]},p=function(t,e,i,s){if("auto"===t.end)return t;i=isNaN(i)?h:i,s=isNaN(s)?-h:s;var r="function"==typeof t.end?t.end(e):t.end instanceof Array?_(e,t.end,i,s):Number(t.end);return r>i?r=i:s>r&&(r=s),{max:r,min:r}},c=l.calculateChange=function(t,s,r,n){null==n&&(n=.05);var a=s instanceof i?s:s?new i(s):e.defaultEase;return r*n*t/a.getRatio(n)},f=l.calculateDuration=function(t,s,r,n,a){a=a||.05;var o=n instanceof i?n:n?new i(n):e.defaultEase;return Math.abs((s-t)*o.getRatio(a)/r/a)},d=l.calculateTweenDuration=function(t,r,n,a,o){if("string"==typeof t&&(t=e.selector(t)),!t)return 0;null==n&&(n=10),null==a&&(a=.2),null==o&&(o=1),t.length&&(t=t[0]||t);var h,u,_,d,m,g,v,y,w,x,T=0,b=9999999999,P=r.throwProps||r,k=r.ease instanceof i?r.ease:r.ease?new i(r.ease):e.defaultEase,S=isNaN(P.checkpoint)?.05:Number(P.checkpoint),C=isNaN(P.resistance)?l.defaultResistance:Number(P.resistance);for(h in P)"resistance"!==h&&"checkpoint"!==h&&(u=P[h],"object"!=typeof u&&(w=w||s.getByTarget(t),w&&w.isTrackingProp(h)?u="number"==typeof u?{velocity:u}:{velocity:w.getVelocity(h)}:(d=Number(u)||0,_=d*C>0?d/C:d/-C)),"object"==typeof u&&(void 0!==u.velocity&&"number"==typeof u.velocity?d=Number(u.velocity)||0:(w=w||s.getByTarget(t),d=w&&w.isTrackingProp(h)?w.getVelocity(h):0),m=isNaN(u.resistance)?C:Number(u.resistance),_=d*m>0?d/m:d/-m,g="function"==typeof t[h]?t[h.indexOf("set")||"function"!=typeof t["get"+h.substr(3)]?h:"get"+h.substr(3)]():t[h]||0,v=g+c(d,k,_,S),void 0!==u.end&&(u=p(u,v,u.max,u.min)),void 0!==u.max&&v>Number(u.max)?(x=u.unitFactor||1,y=g>u.max&&u.min!==u.max||d*x>-15&&45>d*x?a+.1*(n-a):f(g,u.max,d,k,S),b>y+o&&(b=y+o)):void 0!==u.min&&Number(u.min)>v&&(x=u.unitFactor||1,y=u.min>g&&u.min!==u.max||d*x>-45&&15>d*x?a+.1*(n-a):f(g,u.min,d,k,S),b>y+o&&(b=y+o)),y>T&&(T=y)),_>T&&(T=_));return T>b&&(T=b),T>n?n:a>T?a:T},m=l.prototype=new t("throwProps");return m.constructor=l,l.version="0.9.0",l.API=2,l._autoCSS=!0,l.defaultResistance=100,l.track=function(t,e,i){return s.track(t,e,i)},l.untrack=function(t,e){s.untrack(t,e)},l.isTracking=function(t,e){return s.isTracking(t,e)},l.getVelocity=function(t,e){var i=s.getByTarget(t);return i?i.getVelocity(e):0/0},l._cssRegister=function(){var t=(window.GreenSockGlobals||window).com.greensock.plugins.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,a=e._setPluginRatio,o=e.CSSPropTween;e._registerComplexSpecialProp("throwProps",{parser:function(t,e,h,_,p,c){c=new l;var f,d,m,g,v,y={},w={},x={},T={},b={};n={};for(m in e)"resistance"!==m&&(d=e[m],"object"==typeof d?(void 0!==d.velocity&&"number"==typeof d.velocity?y[m]=Number(d.velocity)||0:(v=v||s.getByTarget(t),y[m]=v&&v.isTrackingProp(m)?v.getVelocity(m):0),void 0!==d.end&&(T[m]=d.end),void 0!==d.min&&(w[m]=d.min),void 0!==d.max&&(x[m]=d.max),void 0!==d.resistance&&(f=!0,b[m]=d.resistance)):"number"==typeof d?y[m]=d:(v=v||s.getByTarget(t),y[m]=v&&v.isTrackingProp(m)?v.getVelocity(m):d||0),u[m]&&_._enableTransforms(2===u[m]));g=i(t,y,_,p,c),r=g.proxy,y=g.end;for(m in r)n[m]={velocity:y[m],min:w[m],max:x[m],end:T[m],resistance:b[m]};return null!=e.resistance&&(n.resistance=e.resistance),p=new o(t,"throwProps",0,0,g.pt,2),p.plugin=c,p.setRatio=a,p.data=g,c._onInitTween(r,n,_._tween),p}})}},l.to=function(t,i,s,l,h){i.throwProps||(i={throwProps:i});var u=new e(t,1,i);return u.render(0,!0,!0),u.vars.css?(u.duration(d(r,{throwProps:n,ease:i.ease},s,l,h)),u._delay&&!u.vars.immediateRender?u.invalidate():a._onInitTween(r,o,u),u):(u.kill(),new e(t,d(t,i,s,l,h),i))},m._onInitTween=function(t,e,i){this.target=t,this._props=[],a=this,o=e;var r,n,l,h,u,_,f,d,m,g=i._ease,v=isNaN(e.checkpoint)?.05:Number(e.checkpoint),y=i._duration,w=0;for(r in e)if("resistance"!==r&&"checkpoint"!==r){if(n=e[r],"number"==typeof n)u=Number(n)||0;else if("object"!=typeof n||isNaN(n.velocity)){if(m=m||s.getByTarget(t),!m||!m.isTrackingProp(r))throw"ERROR: No velocity was defined in the throwProps tween of "+t+" property: "+r;u=m.getVelocity(r)}else u=Number(n.velocity);_=c(u,g,y,v),d=0,h="function"==typeof t[r],l=h?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():t[r],"object"==typeof n&&(f=l+_,void 0!==n.end&&(n=p(n,f,n.max,n.min)),void 0!==n.max&&f>Number(n.max)?d=n.max-l-_:void 0!==n.min&&Number(n.min)>f&&(d=n.min-l-_)),this._props[w++]={p:r,s:l,c1:_,c2:d,f:h,r:!1},this._overwriteProps[w]=r}return!0},m._kill=function(e){for(var i=this._props.length;--i>-1;)null!=e[this._props[i].p]&&this._props.splice(i,1);return t.prototype._kill.call(this,e)},m._roundProps=function(t,e){for(var i=this._props,s=i.length;--s>-1;)(t[i[s]]||t.throwProps)&&(i[s].r=e)},m.setRatio=function(t){for(var e,i,s=this._props.length;--s>-1;)e=this._props[s],i=e.s+e.c1*t+e.c2*t*t,e.r&&(i=0|i+(i>0?.5:-.5)),e.f?this.target[e.p](i):this.target[e.p]=i},t.activate([l]),l},!0),window._gsDefine("utils.VelocityTracker",["TweenLite"],function(t){var e,i,s,r,n=/([A-Z])/g,a={},o={x:1,y:1,z:2,scale:1,scaleX:1,scaleY:1,rotation:1,rotationZ:1,rotationX:2,rotationY:2,skewX:1,skewY:1},l=document.defaultView?document.defaultView.getComputedStyle:function(){},h=function(t,e,i){var s=(t._gsTransform||a)[e];return s||0===s?s:(t.style[e]?s=t.style[e]:(i=i||l(t,null))?(t=i.getPropertyValue(e.replace(n,"-$1").toLowerCase()),s=t||i.length?t:i[e]):t.currentStyle&&(i=t.currentStyle,s=i[e]),parseFloat(s)||0)},u=t.ticker,_=function(t,e,i){this.p=t,this.f=e,this.v1=this.v2=0,this.t1=this.t2=u.time,this.css=!1,this.type="",this._prev=null,i&&(this._next=i,i._prev=this)},p=function(){var t,i,n=e,a=u.time;if(a-s>=.03)for(r=s,s=a;n;){for(i=n._firstVP;i;)t=i.css?h(n.target,i.p):i.f?n.target[i.p]():n.target[i.p],(t!==i.v1||a-i.t1>.15)&&(i.v2=i.v1,i.v1=t,i.t2=i.t1,i.t1=a),i=i._next;n=n._next}},c=function(t){this._lookup={},this.target=t,this.elem=t.style&&t.nodeType?!0:!1,i||(u.addEventListener("tick",p,null,!1,-100),s=r=u.time,i=!0),e&&(this._next=e,e._prev=this),e=this},f=c.getByTarget=function(t){for(var i=e;i;){if(i.target===t)return i;i=i._next}},d=c.prototype;return d.addProp=function(e,i){if(!this._lookup[e]){var s=this.target,r="function"==typeof s[e],n=r?this._altProp(e):e,a=this._firstVP;this._firstVP=this._lookup[e]=this._lookup[n]=a=new _(n!==e&&0===e.indexOf("set")?n:e,r,a),a.css=this.elem&&(void 0!==this.target.style[a.p]||o[a.p]),a.css&&o[a.p]&&!s._gsTransform&&t.set(s,{x:"+=0"}),a.type=i||a.css&&0===e.indexOf("rotation")?"deg":"",a.v1=a.v2=a.css?h(s,a.p):r?s[a.p]():s[a.p]}},d.removeProp=function(t){var e=this._lookup[t];e&&(e._prev?e._prev._next=e._next:e===this._firstVP&&(this._firstVP=e._next),e._next&&(e._next._prev=e._prev),this._lookup[t]=0,e.f&&(this._lookup[this._altProp(t)]=0))},d.isTrackingProp=function(t){return this._lookup[t]instanceof _},d.getVelocity=function(t){var e,i,s,r=this._lookup[t],n=this.target;if(!r)throw"The velocity of "+t+" is not being tracked.";return e=r.css?h(n,r.p):r.f?n[r.p]():n[r.p],i=e-r.v2,("rad"===r.type||"deg"===r.type)&&(s="rad"===r.type?2*Math.PI:360,i%=s,i!==i%(s/2)&&(i=0>i?i+s:i-s)),i/(u.time-r.t2)},d._altProp=function(t){var e=t.substr(0,3),i=("get"===e?"set":"set"===e?"get":e)+t.substr(3);return"function"==typeof this.target[i]?i:t},c.getByTarget=function(t){for(var i=e;i;){if(i.target===t)return i;i=i._next}},c.track=function(t,e,i){var s=f(t),r=e.split(","),n=r.length;for(i=(i||"").split(","),s||(s=new c(t));--n>-1;)s.addProp(r[n],i[n]||i[0]);return s},c.untrack=function(t,i){var s=f(t),r=(i||"").split(","),n=r.length;if(s){for(;--n>-1;)s.removeProp(r[n]);s._firstVP&&i||(s._prev?s._prev._next=s._next:s===e&&(e=s._next),s._next&&(s._next._prev=s._prev))}},c.isTracking=function(t,e){var i=f(t);return i?!e&&i._firstVP?!0:i.isTrackingProp(e):!1},c},!0)}),window._gsDefine&&window._gsQueue.pop()();
*/
'use strict';
//Setting up route
angular.module('gwas').config([
  '$stateProvider',
  function ($stateProvider) {
    // Gwas state routing
    $stateProvider.state('gwas-data-start', {
      url: '/gwas-data/gwas-data-start',
      templateUrl: 'modules/gwas/views/gwas-data-start.client.view.html'
    });
  }
]);'use strict';
angular.module('gwas').controller('GwasdatastartController', [
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
    ];
    $scope.removeRow = function removeRow(row) {
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
        $scope.rowCollection.splice(index, 1);
      }
    };
    $scope.find = function () {
      $scope.Users = Gwas.query();  //console.log($scope.Users);
    };
  }
]);/**
 * Created by KevinSo on 8/27/2014.
 */
'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('gwas').factory('Gwas', [
  '$resource',
  function ($resource) {
    return $resource('users/all/:userID', { userID: '@_id' }, { update: { method: 'GET' } });
  }
]);'use strict';
// Opencpu module config
angular.module('opencpu').run([
  'Menus',
  function (Menus) {
  }
]);'use strict';
//Setting up route
angular.module('opencpu').config([
  '$stateProvider',
  function ($stateProvider) {
    // Opencpu state routing
    $stateProvider.state('gwas-t1', {
      url: '/gwas-t1',
      templateUrl: 'modules/opencpu/views/gwas-t1.client.view.html'
    });
  }
]);/*
 http://ramnathv.github.io/rCharts/

*/
'use strict';
ocpu.seturl('//ramnathv.ocpu.io/rCharts/R');
angular.module('opencpu').controller('GwasT1Controller', [
  '$scope',
  function ($scope) {
    // ace editor Setting
    $scope.aceOptions = {
      theme: 'solarized_dark',
      mode: 'r',
      useWrapMode: true
    };
    //ex1
    $scope.example1 = 'library(rCharts)\n' + 'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' + 'nPlot(Freq ~ Hair, group = "Eye", data = hair_eye_male, type = "multiBarChart")';
    //ex2
    $scope.example2 = 'library(rCharts)\n' + 'data(economics, package = "ggplot2")\n' + 'econ <- transform(economics, date = as.character(date))\n' + 'mPlot(x = "date", y = c("psavert", "uempmed"), type = "Line", data = econ, pointSize = 0, lineWidth = 1)';
    //ex3
    $scope.example3 = '';
    $scope.makeChart = function (num, example) {
      console.log(num);
      console.log(example);
      var req = ocpu.call('make_chart', { text: example }, function (session) {
          $('#output' + num).attr('src', session.getLoc() + 'files/output.html');
        }).fail(function (text) {
          alert('Error: ' + req.responseText);
        });
    };
    $scope.makeChart(1, $scope.example1);
    $scope.makeChart(2, $scope.example2);
    $scope.makeChart(3, $scope.example3);
  }
]);'use strict';
// Configuring the Articles module
angular.module('reviews').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Reviews', 'reviews', 'dropdown', '/reviews(/create)?');
    Menus.addSubMenuItem('topbar', 'reviews', 'List Reviews', 'reviews');
    Menus.addSubMenuItem('topbar', 'reviews', 'New Review', 'reviews/create');
  }
]);'use strict';
//Setting up route
angular.module('reviews').config([
  '$stateProvider',
  function ($stateProvider) {
    // Reviews state routing
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
]);'use strict';
// Reviews controller
angular.module('reviews').controller('ReviewsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Reviews',
  function ($scope, $stateParams, $location, Authentication, Reviews) {
    $scope.authentication = Authentication;
    // Create new Review
    $scope.create = function () {
      // Create new Review object
      var review = new Reviews({ name: this.name });
      // Redirect after save
      review.$save(function (response) {
        $location.path('reviews/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Review
    $scope.remove = function (review) {
      if (review) {
        review.$remove();
        for (var i in $scope.reviews) {
          if ($scope.reviews[i] === review) {
            $scope.reviews.splice(i, 1);
          }
        }
      } else {
        $scope.review.$remove(function () {
          $location.path('reviews');
        });
      }
    };
    // Update existing Review
    $scope.update = function () {
      var review = $scope.review;
      review.$update(function () {
        $location.path('reviews/' + review._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Reviews
    $scope.find = function () {
      $scope.reviews = Reviews.query();
    };
    // Find existing Review
    $scope.findOne = function () {
      $scope.review = Reviews.get({ reviewId: $stateParams.reviewId });
    };
  }
]);'use strict';
//Reviews service used to communicate Reviews REST endpoints
angular.module('reviews').factory('Reviews', [
  '$resource',
  function ($resource) {
    return $resource('reviews/:reviewId', { reviewId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('template').config([
  '$stateProvider',
  function ($stateProvider) {
    // Template state routing
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
]);'use strict';
angular.module('template').controller('DraggableController', [
  '$scope',
  '$element',
  function ($scope, $element) {
    var snap = angular.element(document.querySelector('#snap')), liveSnap = angular.element(document.querySelector('#liveSnap')), container = angular.element(document.querySelector('#container')), gridWidth = 196, gridHeight = 100, gridRows = 6, gridColumns = 5, i, x, y;
    //loop through and create the grid (a div for each cell). Feel free to tweak the variables above
    for (i = 0; i < gridRows * gridColumns; i++) {
      y = Math.floor(i / gridColumns) * gridHeight;
      x = i * gridWidth % (gridColumns * gridWidth);  /*
            var changeDiv= $element.find("div")
                .css({
                        position:"absolute",
                        border:"1px solid #454545",
                        width:gridWidth-1,
                        height:gridHeight-1,
                        top:y, left:x});
            container.prepend(changeDiv);*/
                                                      //$("<div/>").css({position:"absolute", border:"1px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
    }
    //set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
    TweenLite.set(container, {
      height: gridRows * gridHeight + 1,
      width: gridColumns * gridWidth + 1
    });
    TweenLite.set('.box', {
      width: gridWidth,
      height: gridHeight,
      lineHeight: gridHeight + 'px'
    });
    //the update() function is what creates the Draggable according to the options selected (snapping).
    function update() {
      //var snap = snap.prop("checked"), liveSnap = $liveSnap.prop("checked");
      Draggable.create('.box', {
        bounds: container,
        edgeResistance: 0.65,
        type: 'x,y',
        throwProps: true,
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
    /*
        //when the user toggles one of the "snap" modes, make the necessary updates...
        snap.on("change", applySnap);
        liveSnap.on("change", applySnap);

        function applySnap() {
            if (snap.prop("checked") || liveSnap.prop("checked")) {
                angular.element(document.querySelector('.box')).each(function(index, element) {
                    TweenLite.to(element, 0.5, {
                        x:Math.round(element._gsTransform.x / gridWidth) * gridWidth,
                        y:Math.round(element._gsTransform.y / gridHeight) * gridHeight,
                        delay:0.1,
                        ease:Power2.easeInOut
                    });
                });
            }
            update();
        }
        */
    update();
  }
]);'use strict';
angular.module('template').controller('SetrowcolController', [
  '$scope',
  function ($scope) {
    $scope.title = 'Set Row and Col';
  }
]);/**
 * Created by KevinSo on 8/26/2014.
 */
'use strict';
angular.module('template').controller('TestfontanimationController', [
  '$scope',
  function ($scope) {
    $scope.title = 'Set Row and Col';
  }
]);//D:\git\pbshop\public\modules\template\directives\banner-front.client.directive.js
'use strict';
angular.module('template').directive('bannerFront', [function () {
    return {
      templateUrl: 'modules/template/directives/banner-front.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Banner front directive logic
        // ...
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
        }, 0.2, 'stagger');
        /*
                $("#play").click(function() {
                    //play() only plays forward from current position. If timeline has finished, play() has nowhere to go.
                    //if the timeline is not done then play() or else restart() (restart always restarts from the beginning).

                    if(tl.progress() != 1){
                        //carl just changed this again
                        tl.play();
                    } else {
                        tl.restart();
                    }
                });

                $("#pause").click(function() {
                    tl.pause();
                });

                $("#reverse").click(function() {
                    tl.reverse();
                });

                $("#resume").click(function() {
                    tl.resume();
                });

                $("#restart").click(function() {
                    tl.restart();
                });

                $("#slider").slider({
                    range: false,
                    min: 0,
                    max: 100,
                    step:.1,
                    slide: function ( event, ui ) {
                        tl.pause();
                        //adjust the timeline's progress() based on slider value
                        tl.progress( ui.value/100 );
                    }
                });
                 */
        scope.play = function () {
          if (tl.progress() != 1) {
            //carl just changed this again
            tl.play();
          } else {
            tl.restart();
          }
        };
        scope.pause = function () {
          tl.pause();
        };
        scope.reverse = function () {
          tl.reverse();
        };
        scope.resume = function () {
          tl.resume();
        };
        scope.restart = function () {
          tl.restart();
        };
        function updateSlider() {
        }  //element.text('this is the bannerFront directive');
      }
    };
  }]);/**
 * Created by KevinSo on 8/28/2014.
 */
'use strict';
/**
 * This AngularJS Directive is to allow easy usage of the Aloha Editor inside an AngularJS project.
 *
 * @class ngAlohaEditor
 */
/*
 Props to https://github.com/esvit/ng-ckeditor for a nice example to implement an editor
 */
var module = angular.module('template', []);
if (typeof ngAlohaEditorConfig === 'undefined') {
  var ngAlohaEditorConfig = { baseUrl: '' };
}
/**
 * Defines the configuration for the Directive
 *
 * @example
 * var ngAlohaEditorConfig = { baseUrl: 'bower_components/ng-aloha-editor/' };
 *
 * @property ngAlohaEditorConfig
 * @type Array
 **/
Aloha = window.Aloha || {};
Aloha.settings = Aloha.settings || {};
var DirectiveSettings = {
    baseUrl: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib',
    logLevels: {
      'error': true,
      'warn': true,
      'info': false,
      'debug': false
    },
    errorhandling: false
  };
jQuery.extend(Aloha.settings, DirectiveSettings);
module.directive('aloha', [
  '$location',
  '$rootScope',
  function ($location, $rootScope) {
    var count = 0;
    var fromAloha = false;
    /**
     * Because AngularJS would route clicks on any links, but we
     * want the user to be able to click on links so he can edit them.
     *
     * Comment and method taken from: https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
     *
     * @method preventAngularRouting
     * @param {Object} elem DOM Element with Aloha bound to it
     * @return {boolean} false
     **/
    function preventAngularRouting(elem) {
      Aloha.jQuery(elem).click(function (e) {
        return false;
      });
    }
    /**
     * @method replaceAngularLinkClickHandler
     * @param {Object} elem DOM Element with Aloha bound to it
     **/
    function replaceAngularLinkClickHandler(elem) {
      preventAngularRouting(elem);
      Aloha.jQuery(elem).on('click', 'a', function (e) {
        var href = $(this).attr('href');
        // Use metaKey for OSX and ctrlKey for PC.
        if (e.metaKey || e.ctrlKey) {
          if ('/' === href.charAt(0)) {
            // Relative links withing the angular app.
            $location.url(href);
            e.preventDefault();
          } else {
            // Absolute links pointing outside the angular app.
            window.location.href = href;
          }
        }
      });
    }
    /**
     * Also, we don't want the default ctrl+click behaviour of aloha, which
     * is to do window.location.href = href because that would reload the page.
     *
     * Comment and method taken from: https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
     *
     * @method disableAlohaCtrlClickHandler
     **/
    function disableAlohaCtrlClickHandler() {
      Aloha.ready(function () {
        Aloha.bind('aloha-editable-activated', function (event, msg) {
          // There is no simple way to disable Aloha's ctrl-click
          // behaviour. We know the handler is bound when the editable
          // is activated, and with the timeout we make sure it is
          // unbound again afterwards.
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
    function mahaloElement(element) {
      Aloha.ready(function () {
        Aloha.jQuery(element).mahalo();
      });
    }
    // Only do once for each page load.
    disableAlohaCtrlClickHandler();
    return {
      priority: -1000,
      terminal: true,
      scope: { alohaContent: '=' },
      link: function (scope, elem, attrs) {
        var elementId = '' + count++;
        var uniqeClass = 'angular-aloha-element' + elementId;
        elem[0].classList.add(uniqeClass);
        elem.data('ng-aloha-element-id', elementId);
        Aloha.ready(function () {
          /**
                 * The Text Editor Javascript is Loaded and Ready
                 * @event texteditor-js-ready
                 **/
          scope.$emit('texteditor-js-ready');
          if (!elem.hasClass('aloha-editable')) {
            alohaElement(elem);
          }
          /**
                 * The Text Editor has been bound to the object
                 * @event texteditor-ready
                 * @param {Object} Element DOM Element that Aloha has bound to
                 **/
          scope.$emit('texteditor-ready', elem);
          Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);
          scope.$watch('alohaContent', function () {
            // Check if the change comes from inside of Aloha
            if (!fromAloha) {
              Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);
            }
          });
          Aloha.bind('aloha-selection-changed', function (jQueryEvent, alohaEditable) {
            if (jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id')) {
              /**
                         * The Text Editor has detected a change in it's selection
                         * @event texteditor-selection-changed
                         * @param {Object} jQueryEvent jQuery Event
                         * @param {Object} alohaEditable DOM Element that Aloha has bound to
                         **/
              scope.$emit('texteditor-selection-changed', jQueryEvent, alohaEditable);
            }
          });
          Aloha.bind('aloha-editable-deactivated', function (jQueryEvent, alohaEditable) {
            if (jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id')) {
              /**
                         * The Text Editor had deactivated editability
                         * @event texteditor-editable-deactivated
                         * @param {Object} jQueryEvent jQuery Event
                         * @param {Object} alohaEditable DOM Element that Aloha has bound to
                         **/
              scope.$emit('texteditor-editable-deactivated', jQueryEvent, alohaEditable);
            }
          });
          Aloha.bind('aloha-smart-content-changed', function (jQueryEvent, alohaEditable) {
            // Reset {bool} fromAloha to the false state
            fromAloha = false;
            if (jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id')) {
              scope.alohaContent = alohaEditable.editable.getContents();
              fromAloha = true;
              $rootScope.$$phase || $rootScope.$apply();
              /**
                         * The Text Editor has detected a change in it's content
                         * @event texteditor-content-changed
                         * @param {Object} jQueryEvent jQuery Event
                         * @param {Object} alohaEditable DOM Element that Aloha has bound to
                         **/
              scope.$emit('texteditor-content-changed', jQueryEvent, alohaEditable);
            }
          });
          Aloha.bind('aloha-command-executed', function (jQueryEvent, eventArgument) {
            if (jQueryEvent.target.activeEditable.originalObj[0].id == elem.attr('id')) {
              /**
                         * The Text Editor has executed a command
                         * @event texteditor-command-executed
                         * @param {String} eventArgument executed command name
                         **/
              scope.$emit('texteditor-command-executed', eventArgument);
            }
          });
        });
        replaceAngularLinkClickHandler(elem);
      }
    };
  }
]);'use strict';
angular.module('template').directive('setRowCol', [function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Set row col directive logic 
        // ...
        element.text('this is the setRowCol directive');
      }
    };
  }]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
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
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);