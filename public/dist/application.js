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
        'ui.utils'
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
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('brazil2s');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('brazils');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('galleries');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('user-mgnt');'use strict';
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
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
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
// Configuring the Articles module
angular.module('brazil2s').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Brazil2s', 'brazil2s', 'dropdown', '/brazil2s(/create)?');
    Menus.addSubMenuItem('topbar', 'brazil2s', 'List Brazil2s', 'brazil2s');
    Menus.addSubMenuItem('topbar', 'brazil2s', 'New Brazil2', 'brazil2s/create');
  }
]);'use strict';
//Setting up route
angular.module('brazil2s').config([
  '$stateProvider',
  function ($stateProvider) {
    // Brazil2s state routing
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
]);'use strict';
// Brazil2s controller
angular.module('brazil2s').controller('Brazil2sController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Brazil2s',
  function ($scope, $stateParams, $location, Authentication, Brazil2s) {
    $scope.authentication = Authentication;
    // Create new Brazil2
    $scope.create = function () {
      // Create new Brazil2 object
      var brazil2 = new Brazil2s({ name: this.name });
      // Redirect after save
      brazil2.$save(function (response) {
        $location.path('brazil2s/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Brazil2
    $scope.remove = function (brazil2) {
      if (brazil2) {
        brazil2.$remove();
        for (var i in $scope.brazil2s) {
          if ($scope.brazil2s[i] === brazil2) {
            $scope.brazil2s.splice(i, 1);
          }
        }
      } else {
        $scope.brazil2.$remove(function () {
          $location.path('brazil2s');
        });
      }
    };
    // Update existing Brazil2
    $scope.update = function () {
      var brazil2 = $scope.brazil2;
      brazil2.$update(function () {
        $location.path('brazil2s/' + brazil2._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Brazil2s
    $scope.find = function () {
      $scope.brazil2s = Brazil2s.query();
    };
    // Find existing Brazil2
    $scope.findOne = function () {
      $scope.brazil2 = Brazil2s.get({ brazil2Id: $stateParams.brazil2Id });
    };
  }
]);'use strict';
//Brazil2s service used to communicate Brazil2s REST endpoints
angular.module('brazil2s').factory('Brazil2s', [
  '$resource',
  function ($resource) {
    return $resource('brazil2s/:brazil2Id', { brazil2Id: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('brazils').config([
  '$stateProvider',
  function ($stateProvider) {
    // Brazils state routing
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
]);'use strict';
// Brazils controller
angular.module('brazils').controller('BrazilsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Brazils',
  function ($scope, $stateParams, $location, Authentication, Brazils) {
    $scope.authentication = Authentication;
    // Create new Brazil
    $scope.create = function () {
      // Create new Brazil object
      var brazil = new Brazils({ name: this.name });
      // Redirect after save
      brazil.$save(function (response) {
        $location.path('brazils/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Brazil
    $scope.remove = function (brazil) {
      if (brazil) {
        brazil.$remove();
        for (var i in $scope.brazils) {
          if ($scope.brazils[i] === brazil) {
            $scope.brazils.splice(i, 1);
          }
        }
      } else {
        $scope.brazil.$remove(function () {
          $location.path('brazils');
        });
      }
    };
    // Update existing Brazil
    $scope.update = function () {
      var brazil = $scope.brazil;
      brazil.$update(function () {
        $location.path('brazils/' + brazil._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Brazils
    $scope.find = function () {
      $scope.brazils = Brazils.query();
    };
    // Find existing Brazil
    $scope.findOne = function () {
      $scope.brazil = Brazils.get({ brazilId: $stateParams.brazilId });
    };
  }
]);'use strict';
//Brazils service used to communicate Brazils REST endpoints
angular.module('brazils').factory('Brazils', [
  '$resource',
  function ($resource) {
    return $resource('brazils/:brazilId', { brazilId: '@_id' }, { update: { method: 'PUT' } });
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
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
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
// Configuring the Articles module
angular.module('galleries').run([
  'Menus',
  function (Menus) {
  }
]);'use strict';
//Setting up route
angular.module('galleries').config([
  '$stateProvider',
  function ($stateProvider) {
    // Galleries state routing
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
    $scope.description = 'This is the descritpion';
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
]);/**
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
    controller: 'TestpolymerController',
    templateUrl: '/modules/galleries/directives/quiz/quiz.html',
    link: function (scope, elem, attrs) {
      /*
            elem.bind('click', function() {
                scope.color = !scope.color;
                if(scope.color)
                    elem.css('background-color', 'rgba(255, 153, 54, 0.52)');
                else
                    elem.css('background-color', '#ff3c38');

                scope.$apply();
            });
            */
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
        console.log('pre link function');
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log(a.items);
      },
      post: function postLink(a, b, c, d) {
        console.log('post link function');
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
      }  /*
             elem.bind('click', function() {
             scope.color = !scope.color;
             if(scope.color)
             elem.css('background-color', 'rgba(255, 153, 54, 0.52)');
             else
             elem.css('background-color', '#ff3c38');

             scope.$apply();
             });

            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
             */
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
]);'use strict';
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