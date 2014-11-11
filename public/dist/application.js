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
        ,
        'smart-table',
        ,
        'ngSanitize',
        'textAngular',
        ,
        'gdriveapps',
        'ngMaterial',
        'ui.tinymce'
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
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('andrewkim');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('banners');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('gdriveapps');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('opencpu');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('payments');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('products');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('reviews');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('seller-interface');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('shop-list');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('template');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('andrewkim').config([
  '$stateProvider',
  function ($stateProvider) {
    // Andrewkim state routing
    $stateProvider.state('firebase-example', {
      url: '/firebase-example',
      templateUrl: 'modules/andrewkim/views/firebase-example.client.view.html'
    }).state('slider-editor', {
      url: '/slider-editor',
      templateUrl: 'modules/andrewkim/views/slider-editor.client.view.html'
    }).state('a-board', {
      url: '/a-board',
      templateUrl: 'modules/andrewkim/views/a-board.client.view.html'
    }).state('a-map', {
      url: '/a-map',
      templateUrl: 'modules/andrewkim/views/a-map.client.view.html'
    }).state('a-info', {
      url: '/a-info',
      templateUrl: 'modules/andrewkim/views/a-info.client.view.html'
    }).state('a-events', {
      url: '/a-events',
      templateUrl: 'modules/andrewkim/views/a-event.client.view.html'
    }).state('a-main', {
      url: '/a-main',
      templateUrl: 'modules/andrewkim/views/a-main.client.view.html'
    });
  }
]);'use strict';
angular.module('andrewkim').controller('AAniGeneratorController', [
  '$scope',
  '$element',
  'AniGenerator',
  function ($scope, $element, AniGenerator) {
    // A ani generator controller logic
    // ...
    /*
        console.debug('from AAniGeneratorController');
        console.log($element);
        */
    $scope.generateAdDirective = function () {
      var ad = new AniGenerator();
      ad.addMainFrame($element);
    };  //$scope.generateAdDirective();
  }
]);'use strict';
angular.module('andrewkim').controller('AShopController', [
  '$scope',
  'Customers',
  'Products',
  'Rental',
  function ($scope, Customers, Products, Rental) {
    console.log('Customers, Products and Rental class Testing');
    var products = new Products('Forgetting Sarah Marshall', 'regular');
    console.log(products.title);
    var customer = new Customers('Brett');
    var products = new Products('Forgetting Sarah Marshall', 'regular');
    var rental = new Rental(customer, products, 5);
    console.log(customer.statement());
    var customer = new Customers('Brett');
    var products = new Products('Forgetting Sarah Marshall', 'regular');
    var rental = new Rental(customer, products, 2);
    console.log(customer.statement());
    var products = new Products('Forgetting Sarah Marshall', 'regular');
    var rental = new Rental(customer, products, 5);
    console.log(customer.statement());
  }
]);'use strict';
angular.module('andrewkim').controller('AboardController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
angular.module('andrewkim').controller('AeventsController', [
  '$scope',
  function ($scope) {
    // Aevents controller logic
    // ...
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
      url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
      className: 'gcal-event',
      currentTimezone: 'America/Chicago'
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {
        title: 'All Day Event',
        start: new Date(y, m, 1)
      },
      {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
      },
      {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
      },
      {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/'
      }
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{
            title: 'Feed Me ' + m,
            start: s + 50000,
            end: s + 100000,
            allDay: false,
            className: ['customFeed']
          }];
      callback(events);
    };
    $scope.calEventsExt = {
      color: '#f00',
      textColor: 'yellow',
      events: [
        {
          type: 'party',
          title: 'Lunch',
          start: new Date(y, m, d, 12, 0),
          end: new Date(y, m, d, 14, 0),
          allDay: false
        },
        {
          type: 'party',
          title: 'Lunch 2',
          start: new Date(y, m, d, 12, 0),
          end: new Date(y, m, d, 14, 0),
          allDay: false
        },
        {
          type: 'party',
          title: 'Click for Google',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: 'http://google.com/'
        }
      ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
      $scope.alertMessage = event.title + ' was clicked ';
    };
    /* alert on Drop */
    $scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
      $scope.alertMessage = 'Event Droped to make dayDelta ' + dayDelta;
    };
    /* alert on Resize */
    $scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
      $scope.alertMessage = 'Event Resized to make dayDelta ' + minuteDelta;
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function (sources, source) {
      var canAdd = 0;
      angular.forEach(sources, function (value, key) {
        if (sources[key] === source) {
          sources.splice(key, 1);
          canAdd = 1;
        }
      });
      if (canAdd === 0) {
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function () {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function (index) {
      $scope.events.splice(index, 1);
    };
    /* Change View */
    $scope.changeView = function (view, calendar) {
      calendar.fullCalendar('changeView', view);
    };
    /* Change View */
    $scope.renderCalender = function (calendar) {
      calendar.fullCalendar('render');
    };
    /* config object */
    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    $scope.uiConfig2 = {
      calendar: {
        height: 450,
        editable: false,
        header: {
          left: 'prev, next',
          center: 'title',
          right: 'agendaWeek AgeendaWeek'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    $scope.changeLang = function () {
      if ($scope.changeTo === 'Hungarian') {
        $scope.uiConfig.calendar.dayNames = [
          'Vas\xe1rnap',
          'H\xe9tf\u0151',
          'Kedd',
          'Szerda',
          'Cs\xfct\xf6rt\xf6k',
          'P\xe9ntek',
          'Szombat'
        ];
        $scope.uiConfig.calendar.dayNamesShort = [
          'Vas',
          'H\xe9t',
          'Kedd',
          'Sze',
          'Cs\xfct',
          'P\xe9n',
          'Szo'
        ];
        $scope.changeTo = 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        $scope.uiConfig.calendar.dayNamesShort = [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [
      $scope.events,
      $scope.eventSource,
      $scope.eventsF
    ];
    $scope.eventSources2 = [
      $scope.calEventsExt,
      $scope.eventsF,
      $scope.events
    ];
  }
]);'use strict';
angular.module('andrewkim').controller('AinfoController', [
  '$scope',
  function ($scope) {
    // Ainfo controller logic
    // ...
    $scope.infos = [
      {
        title: '\uc8fc\ubcf4\uc131\uc778',
        content: '1821\ub144 \ucda9\ub0a8 \ub2f9\uc9c4\uad70\uc5d0\uc11c \uc2e0\uc559\uc2ec\uc774 \uae4a\uc740 \uc9d1\uc548\uc5d0 \ud0dc\uc5b4\ub09c \uadf8\ub294 1836\ub144, 15\uc138 \ub54c \uc870\uc120\uc778 \uc0ac\uc81c\uc758 \ud544\uc694\uc131\uc744 \ub290\ub07c\uace0 \uc788\ub358 \ud504\ub791\uc2a4 \uc2e0\ubd80 \ubaa8\ubc29\uc758 \ub208\uc5d0 \ub744\uc5b4 \uc2e0\ud559\uc0dd\uc73c\ub85c \uc911\uad6d \uc720\ud559\uae38\uc5d0 \uc624\ub978\ub2e4. 1844\ub144 12\uc6d4\uc5d0 \ubd80\uc81c\ud488\uc744,\uc774\ub4ec\ud574 8\uc6d4 \uc0c1\ud574 \ubd80\uadfc \uae40\uac00\ud56d(\u91d1\u5bb6\u6e2f)\uc2e0\ud559\uad50 \uc131\ub2f9\uc5d0\uc11c \ud55c\uad6d \ucd5c\ucd08\uc758 \uc2e0\ubd80\ub85c \uc0ac\uc81c \uc11c\ud488\uc744 \ubc1b\uc558\ub2e4. 1845\ub144 \ud398\ub808\uc62c \uc8fc\uad50\uc640 \ud568\uaed8 \ube44\ubc00\ub9ac\uc5d0 \uc785\uad6d\ud558\uc5ec \uc11c\uc6b8\uacfc \uc9c0\ubc29\uc744 \uc21c\ud68c\ud558\uba70 \uc804 \uad50\ud65c\ub3d9\uc744 \ud3b4\ub2e4\uac00 \ub73b\ud558\uc9c0 \uc54a\uac8c \uc2e0\ubd84\uc774 \ud0c4\ub85c\ub098\uc11c \uccb4\ud3ec\ub418\uace0, \uc11c\ud488\ubc1b\uc740\uc9c0 \uaca8\uc6b0 1 \ub144\uc774 \ub418\ub358 \ud574\uc778 1846\ub144 9\uc6d4 16\uc77c \uc0c8\ub0a8\ud130\uc5d0\uc11c \ucc38\uc218\ud615\uc744 \ub2f9\ud558\uac8c \ub41c\ub2e4. \ub6f0\uc5b4\ub09c \ud559\ub355\uacfc \ubaa9\uc228\uc744 \ubc14\uce58\uba74\uc11c\uae4c\uc9c0 \uc9c4\ub9ac\ub97c \uc99d\uac70\ud55c \uae40\ub300\uac74 \uc2e0\ubd80\uc758 \uc21c\uad50\uc815\uc2e0\uc740 \uc624\ub298\ub0a0 \uadf8\ub9ac\uc2a4\ub3c4\ub97c \ub530\ub974\ub294 \uc6b0\ub9ac \ubaa8\ub450\uc758 \uadc0\uac10\uc774 \ub418\uace0 \uc788\ub2e4.',
        img: 'modules/andrewkim/img/standrewkim.jpg'
      },
      { title: '\uc131\ub2f9\uc5ed\uc0ac' },
      { title: '\uc5ed\ub300 \uc2e0\ubd80\ub2d8' },
      {
        title: '\uc0ac\uba85\ub85d',
        content: '\ud558\ub290\ub2d8\uc758 \uc740\ud61c\uc640 \uc790\ube44\ub85c \uc774 \ub545\uc5d0 \ucc3d\ub9bd\ub41c \ucc9c\uc8fc\uad50 \uc131 \uae40\ub300\uac74 \uad50\ud68c\ub294 \ud558\ub290\ub2d8\uc744 \uc12c\uae30\ub294 \ubbf8\ub124\uc18c\ud0c0 \uc9c0\uc5ed \ud55c\uc778\ub4e4\uc758 \uacf5\ub3d9\uccb4\ub85c\uc11c \ubab8\uacfc \ub9c8\uc74c\uc744 \ub2e4\ud558\uc5ec \uc8fc \uc608\uc218 \uadf8\ub9ac\uc2a4\ub3c4\ub97c \uc0ac\ub791\ud558\uba70, \ub9d0\uc500\uacfc \uae30\ub3c4\uc5d0 \ucda9\uc2e4\ud558\uace0, \uc11c\ub85c \ub098\ub204\uace0 \uc12c\uae30\ub294 \uc77c\uce58\uc758 \uacf5\ub3d9\uccb4\ub97c \uc774\ub8e8\uba70, \ubcf5\uc74c\uc744 \uc774\uc6c3\uc5d0 \uc804\ud30c\ud558\uace0 \uc2e4\ucc9c\ud558\uc5ec \ud558\ub290\ub2d8\uc758 \uc601\uad11\uc744 \ub4dc\ub7ec\ub0bc \uac83\uc785\ub2c8\ub2e4. \ub610\ud55c \uc131 \uc548\ub4dc\ub808\uc544 \uae40\ub300\uac74\uacfc 103\uc704 \uc21c\uad50 \uc131\uc778\uc758 \uc21c\uad50 \uc815\uc2e0\uc744 \ubcf8\ubc1b\uc544 \ud6c4\uc190\ub4e4\uc758 \uc2e0\uc559\uad50\uc721\uc5d0 \ud798\uc368 \uc774 \uacf5\ub3d9\uccb4\ub97c \ud56d\uad6c\ud558\uac8c \uc774\uc5b4 \uac08 \uac83\uc785\ub2c8\ub2e4. 1998\ub144 9\uc6d4 20\uc77c <br>We, the parishioners of the Church of St. Andrew Kim, the Korean Catholic community in Minnesota, which was founded through the grace and mercy of God, belong to a faith community called by Jesus to love God with all our hearts and minds, to be faithful to the Words of God and life of prayer, and to be one another as a spiritual family that one in faith and love, thereby revealing the glory of God and proclaiming the Good News. Following the example of St. Andrew Kim and his companion martyrs, we will be witness to the Faith for our descendants and our community to flourish forever. September 20, 1998'
      },
      { title: '\uc0ac\ubaa9\uc9c0\uce68' },
      { title: '\ub2e8\uccb4\uc18c\uac1c' },
      { title: '\uacf5\uc9c0\uc0ac\ud56d' },
      { title: '\uc804\uc790\uc8fc\ubcf4' },
      { title: '\uc131\ub2f9\uc57d\ub3c4' },
      { title: '\uc0ac\ubb34\uc2e4 \ucf54\ub108' }
    ];
  }
]);'use strict';
angular.module('andrewkim').constant('YT_event', {
  PLAY: 0,
  STOP: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});
angular.module('andrewkim').controller('AmainController', [
  '$scope',
  '$sce',
  'Images',
  'YT_event',
  'Authentication',
  'BannersService',
  function ($scope, $sce, Images, YT_event, Authentication, BannersService) {
    $scope.authentication = Authentication;
    // Find a list of Banners
    $scope.find = function () {
      $scope.banners = BannersService.query(function () {
        $scope.banners.forEach(function (data) {
          if (data.bannerTag == '')
            data.bannerTag = '<div class=\'core-subtitle\'>' + data.name + '</div>';
        });
      });
    };
    //assign trustAsHtml function
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.editorOptions = {
      language: 'ru',
      uiColor: '#000000'
    };
    // YouTube Directive Setting Start
    $scope.YT_event = YT_event;
    // Define Play List
    $scope.playList = [
      {
        id: 0,
        videoid: 'YMp8uYvZNZc',
        name: 'Unji and let me go(Remastered Ver.)'
      },
      {
        id: 1,
        videoid: 'DRSFtoEyTio',
        name: '\uae08\uc694\uc77c \ubc24'
      },
      {
        id: 2,
        videoid: 'YMp8uYvZNZc',
        name: 'Rapstar'
      },
      {
        id: 3,
        videoid: '91gHDmn3RBw',
        name: 'Rapstar'
      },
      {
        id: 4,
        videoid: 'AtbS9CXX2WM',
        name: 'Control the gravity'
      },
      {
        id: 5,
        videoid: 'JwkqhfVkk0I',
        name: 'Shake that'
      }
    ];
    $scope.selectSong = function (id) {
      if ($scope.crntSong.id !== id) {
        $scope.crntSong = $scope.playList[id];
      }
    };
    $scope.crntSong = $scope.playList[0];
    $scope.yt = {
      width: 235,
      height: 34,
      videoid: 'YMp8uYvTZNZc',
      playerStatus: 'NOT PLAYING'
    };
    $scope.sendControlEvent2 = function (ctrlEvent) {
      this.$broadcast(ctrlEvent);
    };
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      $scope.yt.playerStatus = data;
    });
    // YouTube Directive Setting End
    $scope.image = Images.list(function (image) {
      console.log(image);  //$scope.image = image;
    });
    $scope.clickButton = function () {
      $scope.$emit('Click');
    };
    $scope.editMode = false;
    $scope.clickBtn = function ($event) {
      if (!$scope.editMode)
        $scope.editMode = true;
      else
        $scope.editMode = false;
    };
  }
]);'use strict';
angular.module('andrewkim').controller('AmapController', [
  '$scope',
  function ($scope) {
    // Amap controller logic
    // ...
    $scope.map = {
      center: {
        latitude: 44.8968555,
        longitude: -93.1819971
      },
      zoom: 16
    };
    $scope.marker = {
      id: 0,
      title: 'Andrew Kim Church',
      coords: {
        latitude: 44.8968555,
        longitude: -93.1819971
      },
      options: { draggable: false }
    };
  }
]);'use strict';
angular.module('andrewkim').controller('BannerController', [
  '$scope',
  function ($scope) {
    // Banner controller logic
    // ...
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
angular.module('andrewkim').controller('SampleCtrlController', [
  '$scope',
  '$firebase',
  function ($scope, $firebase) {
    // Sample ctrl controller logic
    // ...
    var ref = new Firebase('https://restapi.firebaseio.com/');
    // create an AngularFile reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    var syncObject = sync.$asObject();
    //synchronize the object with a three-way data binding
    //click on 'index.html' above to see it used in the DOM!
    syncObject.$bindTo($scope, 'data');
    $scope.data = sync.$asObject();
  }
]);'use strict';
angular.module('andrewkim').directive('bannerMainFrame', [
  '$document',
  function ($document) {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div ng-transclude>' + '<button ng-click="clickBtnFromDirective()">Directive 1-1</button>' + '</div>',
      scope: { EventHandler: '&eventFunction' },
      compile: function (tElem, tAttrs) {
        //console.log('compile');
        tElem.addClass('bannerMainFrame');
        //console.log(tElem);
        return {
          pre: function (scope, iElem, iAttrs) {
          },
          post: function postLink(scope, element, attrs) {
            scope.editMode = false;
            scope.clickBtnFromDirective = function () {
              console.log('from clickBtn');
              //console.log(event);
              //console.log(element);
              if (scope.editMode === false) {
                TweenMax.to(element, 0.5, {
                  autoAlpha: 0,
                  display: 'none'
                });
                scope.editMode = true;
              } else {
                TweenMax.to(element, 1, { opacity: 1.5 });
                scope.editMode = false;
              }
            };
            element.bind('click', function () {
              console.log('element is clicked');
              TweenMax.from(element, 0.5, { scale: 1.2 });
            });
            element.bind('mouseover', function () {
              console.log('mouseover');
              element.css('cursor', 'pointer');
            });
          }
        };
      }
    };
  }
]);'use strict';
angular.module('andrewkim').directive('bannerSubFrame', [function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        // Banner sub frame directive logic
        // ...
        element.text('this is the bannerSubFrame directive');
      }
    };
  }]);/**
 * Created by KevinSo on 9/17/2014.
 */
angular.module('andrewkim').directive('compileTemplate', [
  '$compile',
  '$parse',
  function ($compile, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        var parsed = $parse(attr.ngBindHtml);
        function getStringValue() {
          return (parsed(scope) || '').toString();
        }
        //Recompile if the template changes
        scope.$watch(getStringValue, function () {
          $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
        });
      }
    };
  }
]);// Todo:
//
'use strict';
angular.module('andrewkim').constant('Ddak_event', {
  OPEN: 0,
  CLOSE: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});
angular.module('andrewkim').directive('ddak', [
  'Ddak_event',
  function (Ddak_event) {
    return {
      scope: { banner: '@bannerInfo' },
      templateUrl: 'modules/andrewkim/directives/ddak.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var panel1 = $('#panel1'), panel2 = $('#panel2'), panel3 = $('#panel3'), panel1Text = $('#panel1 h1'), panel2Text = $('#panel2 h2'), info = $('#info'), list = $('#ddak').find('li'), orderNow = $('#orderNow');
        var tl = new TimelineMax({
            delay: 0.5,
            repeat: 2,
            repeatDelay: 3
          });
        TweenMax.to($('#banner'), 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to(panel1, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to(panel2, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to(panel3, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to(info, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to(orderNow, 0, { borderRadius: '25px 25px 25px 25px' });
        tl.from(panel1, 0.5, { autoAlpha: 0 }).from(panel1Text, 0.5, {
          scale: 0.5,
          autoAlpha: 0,
          ease: Back.easeOut
        }).set(panel2, { top: 0 }, '+=1').from(panel2, 0.2, {
          autoAlpha: 0,
          scale: 1.5
        }).from(panel2Text, 0.2, { top: 250 }, '+=0.5').to(panel2Text, 0.2, { top: 250 }, '+=0.5').set(panel3, { top: 0 }, 'final').from(info, 0.5, { top: 250 }, 'final').to(panel2, 0.5, { top: -60 }, 'final').staggerFrom(list, 0.3, {
          autoAlpha: 0,
          left: 50
        }, 0.1, '+=0.2').from(orderNow, 0.5, {
          scale: 0,
          autoAlpha: 0,
          ease: Back.easeOut
        });
        /*
                scope.$on(Ddak_event.OPEN, function() {
                    console.log('scope on');
                    //console.log(element[0]);
                    var tl = new TimelineMax({delay: 0.5});
                    tl.to(element.children(), 1, {autoAlpha: 0})
                        .to(element.children(), 1, {autoAlpha: 1});
                });
                */
        scope.clickBtnFromDirective = function () {
          console.log('from clickBtn');
          //console.log(banner);
          console.log(scope.banner);
          //console.log(event);
          //console.log(element);
          if (scope.editMode === false) {
            //TweenMax.to(element, 0.5, {autoAlpha:0, display:"none"})
            scope.editMode = true;
          } else {
            TweenMax.to(element, 1, { opacity: 1 });
            scope.editMode = false;
          }
        };
      }
    };
  }
]);'use strict';
angular.module('andrewkim').directive('ehSimple', [function () {
    return function (scope, element) {
      element.addClass('plain');
    };
  }]);'use strict';
angular.module('andrewkim').constant('Ddak_event', {
  OPEN: 0,
  CLOSE: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});
angular.module('andrewkim').directive('fireya', [
  'Ddak_event',
  function (Ddak_event) {
    return {
      templateUrl: 'modules/andrewkim/directives/fireya.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var $panel1 = $('banner-title'), $panel2 = $('sub-title'), $panel3 = $('banner-info'), $panel1Text = $('banner-title h1'), $panel2Text = $('sub-title h2'), $info = $('info-content'), $list = $('info-content').find('li'), $orderNow = $('info-button');
        var tl = new TimelineMax({
            delay: 0.5,
            repeat: 2,
            repeatDelay: 3
          });
        TweenMax.to($('banner-body'), 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to($panel1, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to($panel2, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to($panel3, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to($info, 0, { borderRadius: '0px 0px 25px 25px' });
        TweenMax.to($orderNow, 0, { borderRadius: '25px 25px 25px 25px' });
        tl.from($panel1, 0.5, { autoAlpha: 0 }).from($panel1Text, 0.5, {
          scale: 0.5,
          autoAlpha: 0,
          ease: Back.easeOut
        }).set($panel2, { top: 0 }, '+=1').from($panel2, 0.2, {
          autoAlpha: 0,
          scale: 1.5
        }).from($panel2Text, 0.2, { top: 250 }, '+=0.5').to($panel2Text, 0.2, { top: 250 }, '+=0.5').set($panel3, { top: 0 }, 'final').from($info, 0.5, { top: 250 }, 'final').to($panel2, 0.5, { top: -60 }, 'final').staggerFrom($list, 0.3, {
          autoAlpha: 0,
          left: 50
        }, 0.1, '+=0.2').from($orderNow, 0.5, {
          scale: 0,
          autoAlpha: 0,
          ease: Back.easeOut
        });
        scope.clickBtnFromDirective = function () {
          console.log('from clickBtn');
          //console.log(event);
          //console.log(element);
          if (scope.editMode === false) {
            TweenMax.to(element, 0.5, {
              autoAlpha: 0,
              display: 'none'
            });
            scope.editMode = true;
          } else {
            TweenMax.to(element, 1, { opacity: 1 });
            scope.editMode = false;
          }
        };
      }
    };
  }
]);'use strict';
/*
    //top text animation
* */
angular.module('andrewkim').directive('ganJab', [function () {
    return {
      templateUrl: 'modules/andrewkim/directives/ganJab.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        // top text animation
        CSSPlugin.defaultTransformPerspective = 400;
        var playBtn = $('#playBtn'), pauseBtn = $('#pauseBtn'), resumeBtn = $('#resumeBtn'), time = $('#time'), progress = $('#progress'), timeScale = $('#timeScale'), buttons = [
            playBtn,
            pauseBtn,
            resumeBtn
          ], lis = $('#ganJab').find('li');
        var tl = new TimelineLite({ delay: 0.4 });
        TweenLite.set('#demo', { visibility: 'visible' });
        tl.from('#timeline_txt', 0.6, {
          y: -30,
          opacity: 0
        }).from('#lite_txt', 0.6, {
          y: 30,
          opacity: 0
        }, '-=0.3').staggerFrom(lis, 0.2, {
          y: 20,
          opacity: 0
        }, 0.1).set(buttons, { opacity: 0.2 });
      }
    };
  }]);/**
 * Created by KevinSo on 9/15/2014.
 */
angular.module('andrewkim').factory('AniGenerator', [function () {
    return function Customer(name, user, targetLink) {
      this.name = _.uniqueId();
      this.user = user;
      this.targetLink = targetLink;
      this.addMainFrame = function (element) {
        var crntElement = element;
        return crntElement.append('<div ng-class={{' + 'dd' + '}} banner-main-frame> <button ng-click="clickBtn()">factory</button></subFrame>');
      };
      this.isNameUnique = function () {
        console.log('isNameUnique');
        return true;
      };
      this.addSubFrame = function () {
        return '<div ng-class={{' + 'well' + '}} banner-sub-frame></subFrame>';
      };
    };
  }]);/**
 * Created by KevinSo on 9/16/2014.
 */
'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('andrewkim').factory('BannersService', [
  '$resource',
  function ($resource) {
    return $resource('/banners', {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
]);/**
 * Created by KevinSo on 9/15/2014.
 */
angular.module('andrewkim').factory('Customers', [function () {
    return function Customer(name) {
      this.id = _.uniqueId();
      this.name = name;
      this.rentals = [];
      this.charge = function () {
        return this.rentals.sum('charge');
      };
      this.frequentRenterPoints = function () {
        return this.rentals.sum('frequentRenterPoints');
      };
      this.rentals.sum = function (attribute) {
        return _.chain(this).map(function (rental) {
          return rental[attribute]();
        }).inject(function (sum, value) {
          return sum + value;
        }).value();
      };
      this.statement = function () {
        var result = 'Rental Record For ' + this.name + '\n';
        _.each(this.rentals, function (rental) {
          result += rental.movie.title + ' ' + rental.charge() + '\n';
        });
        // add footer notes
        result += 'Amount owed is ' + this.charge() + '\n';
        result += 'You earned ' + this.frequentRenterPoints() + ' frequent renter points.';
        return result;
      };
    };
  }]);'use strict';
angular.module('andrewkim').factory('Images', [
  '$http',
  function ($http) {
    return {
      list: function (callback) {
        /*
                $http({
                    method:'GET',
                    url:'/modules/andrewkim/data/main.json'
                    //cache:true
                }).success(function(data){console.log(data);})
                    .error(function(data, status){
                    console.log(data);
                    console.log(status);
                });*/
        return 'ddd';
      }
    };
  }
]);/**
 * Created by KevinSo on 9/15/2014.
 */
angular.module('andrewkim').factory('Products', [function () {
    return function Products(title, type) {
      this.id = _.uniqueId();
      this.title = title;
      this.type = type;
      this.charge = function (daysRented) {
        return this[this.chargeFunctionName()](daysRented);
      };
      this.chargeFunctionName = function () {
        return this.type.split(' ').join('') + 'Charge';
      };
      this.regularCharge = function (daysRented) {
        if (daysRented > 2) {
          return 2 + (daysRented - 2) * 1.5;
        }
        return 2;
      };
      this.newReleaseCharge = function (daysRented) {
        return daysRented * 3;
      };
      this.childrensCharge = function (daysRented) {
        if (daysRented > 3) {
          return 1.5 + (daysRented - 3) * 1.5;
        }
        return 1.5;
      };
    };
  }]);/**
 * Created by KevinSo on 9/15/2014.
 */
angular.module('andrewkim').factory('Rental', [function () {
    return function Rental(customer, movie, daysRented) {
      this.id = _.uniqueId();
      this.customer = customer;
      this.movie = movie;
      this.daysRented = daysRented;
      this.customer.rentals.push(this);
      this.frequentRenterPoints = function () {
        if (this.movie.type == 'new release' && this.daysRented > 1) {
          return 2;
        }
        return 1;
      };
      this.charge = function () {
        return this.movie.charge(this.daysRented);
      };
    };
  }]);'use strict';
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
// Configuring the Articles module
angular.module('banners').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Banners', 'banners', 'dropdown', '/banners(/create)?');
    Menus.addSubMenuItem('topbar', 'banners', 'List Banners', 'banners');
    Menus.addSubMenuItem('topbar', 'banners', 'New Banner', 'banners/create');
  }
]);'use strict';
//Setting up route
angular.module('banners').config([
  '$stateProvider',
  function ($stateProvider) {
    // Banners state routing
    $stateProvider.state('listBanners', {
      url: '/banners',
      templateUrl: 'modules/banners/views/list-banners.client.view.html'
    }).state('createBanner', {
      url: '/banners/create',
      templateUrl: 'modules/banners/views/create-banner.client.view.html'
    }).state('viewBanner', {
      url: '/banners/:bannerId',
      templateUrl: 'modules/banners/views/view-banner.client.view.html'
    }).state('editBanner', {
      url: '/banners/:bannerId/edit',
      templateUrl: 'modules/banners/views/edit-banner.client.view.html'
    });
  }
]);'use strict';
// Banners controller
angular.module('banners').controller('BannersController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Banners',
  'Products',
  'ProductsBanner',
  function ($scope, $stateParams, $location, Authentication, Banners, Products, ProductsBanner) {
    $scope.authentication = Authentication;
    // Create new Banner
    $scope.create = function () {
      // Create new Banner object
      var banner = new Banners({
          name: this.name,
          bannerTag: this.bannerTag
        });
      // Redirect after save
      banner.$save(function (response) {
        $location.path('banners/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
      this.bannerTag = '';
    };
    // Remove existing Banner
    $scope.remove = function (banner) {
      if (banner) {
        banner.$remove();
        for (var i in $scope.banners) {
          if ($scope.banners[i] === banner) {
            $scope.banners.splice(i, 1);
          }
        }
      } else {
        $scope.banner.$remove(function () {
          $location.path('banners');
        });
      }
    };
    // Update existing Banner
    $scope.update = function () {
      var banner = $scope.banner;
      banner.$update(function () {
        $location.path('banners/' + banner._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Banners
    $scope.find = function () {
      $scope.banners = Banners.query();
    };
    // Find existing Banner
    $scope.findOne = function () {
      $scope.banner = Banners.get({ bannerId: $stateParams.bannerId });
    };
    $scope.findProductOne = function () {
      $scope.banner = Banners.get({ bannerId: $stateParams.bannerId });
      $scope.products = Products.query({ bannerId: $stateParams.bannerId });
    };
    $scope.toCreateProduct = function () {
      $location.path('products/create/' + $stateParams.bannerId);
    };
    // should be changed
    $scope.toEditPoduct = function () {
      $location.path('products/list/' + $stateParams.bannerId);
    };
    $scope.findProductUnderBanner = function () {
      console.log('banner id is ' + $stateParams.bannerId);
      $scope.products = ProductsBanner.query({}, { bannerId: $stateParams.bannerId });
    };
  }
]);'use strict';
//Banners service used to communicate Banners REST endpoints
angular.module('banners').factory('Banners', [
  '$resource',
  function ($resource) {
    return $resource('banners/:bannerId', { bannerId: '@_id' }, {
      update: { method: 'PUT' },
      query: {
        method: 'GET',
        isArray: true
      }
    });
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
]);
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', []).value('uiTinymceConfig', {
  plugins: 'image',
  image_advtab: true,
  image_class_list: [{
      title: 'Responsive Size',
      value: 'img-responsive'
    }]
}).directive('uiTinymce', [
  'uiTinymceConfig',
  function (uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options, tinyInstance;
        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }
        options = {
          setup: function (ed) {
            ed.on('init', function (args) {
              ngModel.$render();
            });
            // Update model on button click
            ed.on('ExecCommand', function (e) {
              ed.save();
              ngModel.$setViewValue(elm.val());
              if (!scope.$$phase) {
                scope.$apply();
              }
            });
            // Update model on keypress
            ed.on('KeyUp', function (e) {
              console.log(ed.isDirty());
              ed.save();
              ngModel.$setViewValue(elm.val());
              if (!scope.$$phase) {
                scope.$apply();
              }
            });
          },
          mode: 'exact',
          elements: attrs.id
        };
        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }
        angular.extend(options, uiTinymceConfig, expression);
        setTimeout(function () {
          tinymce.init(options);
        });
        ngModel.$render = function () {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
          if (tinyInstance) {
            tinyInstance.setContent(ngModel.$viewValue || '');
          }
        };
      }
    };
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  'AuthTokenFactory',
  function ($scope, Authentication, Menus, AuthTokenFactory) {
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
    $scope.signout = function () {
      AuthTokenFactory.setToken();
    };
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  'YT_event',
  function ($scope, Authentication, YT_event) {
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
    //$scope.plans = Getplans;
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
angular.module('gdriveapps').config([
  '$stateProvider',
  function ($stateProvider) {
    // Gdriveapps state routing
    $stateProvider.state('weather', {
      url: '/weather',
      templateUrl: 'modules/gdriveapps/views/weather.client.view.html'
    }).state('listGdriveapps', {
      url: '/gdriveapps',
      templateUrl: 'modules/gdriveapps/views/list-gdriveapps.client.view.html'
    }).state('createGdriveapp', {
      url: '/gdriveapps/create',
      templateUrl: 'modules/gdriveapps/views/create-gdriveapp.client.view.html'
    }).state('viewGdriveapp', {
      url: '/gdriveapps/:gdriveappId',
      templateUrl: 'modules/gdriveapps/views/view-gdriveapp.client.view.html'
    }).state('editGdriveapp', {
      url: '/gdriveapps/:gdriveappId/edit',
      templateUrl: 'modules/gdriveapps/views/edit-gdriveapp.client.view.html'
    }).state('gDrive', {
      url: '/gDrive',
      templateUrl: 'modules/gdriveapps/views/gdrive.html'
    }).state('gDrive2', {
      abstract: true,
      url: '/gDrive2',
      templateUrl: 'modules/gdriveapps/views/storage.html'
    }).state('gDrive2.dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/gdriveapps/template/gDrive2.dashboard.tmp.html'
    }).state('gDrive2.addNewProduct', {
      url: '/addNewProduct',
      templateUrl: 'modules/gdriveapps/template/gDrive2.addNewProduct.tmp.html'
    }).state('gDrive2.historyPayment', {
      url: '/historyPayment',
      templateUrl: 'modules/gdriveapps/template/gDrive2.historyPayment.tmp.html'
    });
    /*.

        state('createFile', {
            url: '/create',
            templateUrl:'modules/gdriveapps/views/create-doc.client.view.html',
            controller: 'CreateDocController'
        }).
        state('installTodo', {
            url: '/install',
            templateUrl:'modules/gdriveapps/views/install-todo.client.view.html',
            controller: 'InstallTodoController'
        }).
        state('todoState',{
            url:'/todos/:fileId/:filter',
            templateUrl:'modules/gdriveapps/views/install-todo.client.view.html',
            controller:'todoController',
            resolve: {
                //realtimeDocument: app.loadFile
            }
        })*/
    ;
  }
]);'use strict';
angular.module('gdriveapps').controller('DocsController', [
  '$scope',
  '$http',
  'gdocs',
  function ($scope, $http, gdocs) {
    $scope.test = 'test_123';
    $scope.docs = [];
    // Response handler that caches file icons in the filesystem API.
    function successCallbackWithFsCaching(resp, status, headers, config) {
      var docs = [];
      var totalEntries = resp.items.length;
      console.log(totalEntries);
      resp.items.forEach(function (entry, i) {
        var doc = {
            title: entry.title,
            updatedDate: Util.formatDate(entry.modifiedDate),
            updatedDateFull: entry.modifiedDate,
            icon: entry.iconLink,
            alternateLink: entry.alternateLink,
            size: entry.fileSize ? '( ' + entry.fileSize + ' bytes)' : null
          };
        // 'http://gstatic.google.com/doc_icon_128.png' -> 'doc_icon_128.png'
        doc.iconFilename = doc.icon.substring(doc.icon.lastIndexOf('/') + 1);
        console.log(doc.icon);
        // If file exists, it we'll get back a FileEntry for the filesystem URL.
        // Otherwise, the error callback will fire and we need to XHR it in and
        // write it to the FS.
        var fsURL = fs.root.toURL() + FOLDERNAME + '/' + doc.iconFilename;
        window.webkitResolveLocalFileSystemURL(fsURL, function (entry) {
          console.log('Fetched icon from the FS cache');
          doc.icon = entry.toURL();
          // should be === to fsURL, but whatevs.
          $scope.docs.push(doc);
          // Only want to sort and call $apply() when we have all entries.
          if (totalEntries - 1 == i) {
            $scope.docs.sort(Util.sortByDate);
            $scope.$apply(function ($scope) {
            });  // Inform angular we made changes.
          }
        }, function (e) {
          $http.get(doc.icon, { responseType: 'blob' }).success(function (blob) {
            console.log('Fetched icon via XHR');
            blob.name = doc.iconFilename;
            // Add icon filename to blob.
            writeFile(blob);
            // Write is async, but that's ok.
            doc.icon = window.URL.createObjectURL(blob);
            $scope.docs.push(doc);
            if (totalEntries - 1 == i) {
              $scope.docs.sort(Util.sortByDate);
            }
          });
        });
      });
    }
    $scope.clearDocs = function () {
      $scope.docs = [];  // Clear out old results.
    };
    $scope.fetchDocs = function (retry) {
      this.clearDocs();
      if (gdocs.accessToken) {
        var config = {
            params: { 'alt': 'json' },
            headers: { 'Authorization': 'Bearer ' + gdocs.accessToken }
          };
        //https://drive.google.com/open?id=0B8FisuvAYPTfampGWFhXQUs5dVU&authuser=0
        $http.get(gdocs.DOCLIST_FEED, config).success(successCallbackWithFsCaching).error(function (data, status, headers, config) {
          if (status == 401 && retry) {
            gdocs.removeCachedAuthToken(gdocs.auth.bind(gdocs, true, $scope.fetchDocs.bind($scope, false)));
          }
        });
      }
    };
    // Toggles the authorization state.
    $scope.toggleAuth = function (interactive) {
      if (!gdocs.accessToken) {
        gdocs.auth(interactive, function () {
          $scope.fetchDocs(false);
        });
      } else {
        gdocs.revokeAuthToken(function () {
        });
        this.clearDocs();
      }
    };
    // Controls the label of the authorize/deauthorize button.
    $scope.authButtonLabel = function () {
      if (gdocs.accessToken)
        return 'Deauthorize';
      else
        return 'Authorize';
    };
    $scope.toggleAuth(false);
  }
]);/*
 Copyright 2012 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Author: Eric Bidelman (ericbidelman@chromium.org)
 */
/*
"use strict";


function GDocs(selector) {

    var SCOPE_ = 'https://www.googleapis.com/drive/v2/';

    this.lastResponse = null;

    this.__defineGetter__('SCOPE', function() {
        return SCOPE_;
    });

    this.__defineGetter__('DOCLIST_FEED', function() {
        return SCOPE_ + 'files/';
    });

    this.__defineGetter__('CREATE_SESSION_URI', function() {
        return 'https://www.googleapis.com/upload/drive/v2/files?uploadType=resumable';
    });

    this.__defineGetter__('DEFAULT_CHUNK_SIZE', function() {
        return 1024 * 1024 * 5; // 5MB;
    });
};

GDocs.prototype.auth = function(interactive, opt_callback) {
    try {
        chrome.identity.getAuthToken({interactive: interactive}, function(token) {
            if (token) {
                this.accessToken = token;
                opt_callback && opt_callback();
            }
        }.bind(this));
    } catch(e) {
        console.log(e);
    }
};

GDocs.prototype.removeCachedAuthToken = function(opt_callback) {
    if (this.accessToken) {
        var accessToken = this.accessToken;
        this.accessToken = null;
        // Remove token from the token cache.
        chrome.identity.removeCachedAuthToken({
            token: accessToken
        }, function() {
            opt_callback && opt_callback();
        });
    } else {
        opt_callback && opt_callback();
    }
};

GDocs.prototype.revokeAuthToken = function(opt_callback) {
    if (this.accessToken) {
        // Make a request to revoke token
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
            this.accessToken);
        xhr.send();
        this.removeCachedAuthToken(opt_callback);
    }
}

GDocs.prototype.makeRequest = function(method, url, callback, opt_data, opt_headers) {
    var data = opt_data || null;
    var headers = opt_headers || {};

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    // Include common headers (auth and version) and add rest.
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
    for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }

    xhr.onload = function(e) {
        this.lastResponse = this.response;
        callback(this.lastResponse, this);
    }.bind(this);
    xhr.onerror = function(e) {
        console.log(this, this.status, this.response,
            this.getAllResponseHeaders());
    };
    xhr.send(data);
};

GDocs.prototype.upload = function(blob, callback, retry) {

    var onComplete = function(response) {
        document.getElementById('main').classList.remove('uploading');
        var entry = JSON.parse(response).entry;
        callback.apply(this, [entry]);
    }.bind(this);
    var onError = function(response) {
        if (retry) {
            this.removeCachedAuthToken(
                this.auth.bind(this, true,
                    this.upload.bind(this, blob, callback, false)));
        } else {
            document.getElementById('main').classList.remove('uploading');
            throw new Error('Error: '+response);
        }
    }.bind(this);


    var uploader = new MediaUploader({
        token: this.accessToken,
        file: blob,
        onComplete: onComplete,
        onError: onError
    });

    document.getElementById('main').classList.add('uploading');
    uploader.upload();

};
*/
/**
 * Created by Kevin on 2014-10-27.
 Developing with the javascript Lib
 https://developers.google.com/api-client-library/javascript/dev/dev_jscript

 */
'use strict';
var CONFIG = {
    clientId: '574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com',
    developerKey: 'AIzaSyBEGA9BOSoo0DF69RNRh9MsMKDxaVlnT_U',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/plus.me'
    ]
  };
angular.module('gdriveapps').value('configGdrive', CONFIG);
angular.module('gdriveapps').controller('gdrive', [
  '$scope',
  '$state',
  '$http',
  '$q',
  '$mdDialog',
  '$mdSidenav',
  'configGdrive',
  'Googledrive',
  'GooglePlus',
  'Products',
  'Authentication',
  'ProductByUserId',
  function ($scope, $state, $http, $q, $mdDialog, $mdSidenav, configGdrive, Googledrive, GooglePlus, Products, Authentication, ProductByUserId) {
    $scope.authentication = Authentication;
    console.log($scope.authentication);
    $scope.goChildView = function (stateName) {
      $state.go(stateName);
      $mdSidenav('left').close();
    };
    //$scope.queriedProduct = ProductByUserId.query({userId:$scope.authentication.user._id });
    /*
        google.load('visualization', '1', {
            packages: ['corechart']
        });


         var data = google.visualization.arrayToDataTable([
         ['Year', 'Sales', 'Expenses'],
         ['명이나물', 1000, 400],
         ['더덕나물', 1170, 460],
         ['문어젖갈', 660, 1120],
         ['오징어젖갈', 1030, 540]
         ]);
         var options = {
         title: 'Company Performance'
         };
         var chart = new google.visualization.LineChart(document.getElementById('chartdiv'));

         chart.draw(data, options);
         /**/
    $http({
      'url': 'http://drive.google.com/uc?export=view&id=0B8FisuvAYPTfZl9VUnEwcGdFdHc',
      method: 'GET',
      headers: { 'Content-Type': 'image/jpeg' }
    }).success(function (data) {
      console.log(data);
    });
    $scope.data = {};
    $scope.data.cb1 = true;
    $scope.data.cb2 = false;
    $scope.user = {
      title: 'Technical Program Manager',
      email: 'ipsum@lorem.com',
      firstName: 'Naomi',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      country: 'USA',
      postalCode: '94043'
    };
    $scope.todos = [
      {
        product_uri: 'http://drive.google.com/uc?export=view&id=0B8FisuvAYPTfaTJnaHRWWmozRUU',
        name: '\uba85\uc774\ub098\ubb3c',
        who: '\uba85\uc774\uac8c\uc774',
        when: '3:08PM',
        notes: '\uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694\uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8 \uc544\ub098\ub2c8\ub9ac\uc694'
      },
      {
        product_uri: 'http://drive.google.com/uc?export=view&id=0B8FisuvAYPTfcDVGYVc3NEtaSEU',
        name: '\ub354\ub355\ub098\ubb3c',
        who: '\uba85\uc774\uac8c\uc774',
        when: '3:08PM',
        notes: ' I\'ll be in your neighborhood doing errands'
      }
    ];
    /*
         * */
    var accessToken;
    $scope.permalLink = 'http://drive.google.com/uc?export=view&id=';
    $scope.arrive = false;
    $scope.authName = 'Authorize';
    $scope.isAuth = false;
    $scope.init = function init() {
      window.gapi.load('auth', $scope.authenticateWithGoogle);
      window.gapi.load('picker');
      gapi.client.load('urlshortener', 'v1');
    };
    $scope.authenticateWithGoogle = function authenticateWithGoogle() {
      window.gapi.auth.authorize({
        'client_id': configGdrive.clientId,
        'scope': configGdrive.scopes,
        'immediate': false
      }, handleAuthentication);
    };
    function handleAuthentication(result) {
      if (result && !result.error) {
        $scope.isAuth = true;
        $scope.authName = 'Deauthorize';
        accessToken = result.access_token;
        //console.log(accessToken);
        /*
                 callGooglePlus();
                 setFilePicker();
                 listFolder();
                 getGoogleDriveInfo();
                 createFolder();
                 */
        createNewAccountFolder();
        setFilePicker();  // singleFile
                          //findTargetUriFolder();
      } else {
        console.log(result);
        console.log(result.error);
        console.log('fail to authentication');
      }
      $scope.$digest();
    }
    function listFolder() {
      Googledrive.listFolder();
    }
    /*
         function createFolder(){
         var folderName;
         Googledrive.createFolder(folderName, accessToken);
         }
         */
    function getGoogleDriveInfo() {
      Googledrive.getGoogleDriveInfo();
    }
    /// Custom file Picker Start ----------------------------------------------------------
    /*
         function setFilePicker() {
         var filePicker = document.getElementById('filePicker');

         filePicker.style.display = 'none';

         // Access token has been successfully retrieved, requests can be sent to the API.
         filePicker.style.display = 'block';
         filePicker.onchange = uploadFile;
         }

         function uploadFile(evt) {
         var callback = function(file) {
         console.log('!!File!!');
         console.log(file);
         }
         gapi.client.load('drive', 'v2', function() {
         var file = evt.target.files[0];
         insertFile(file, callback);
         });
         }

         function insertFile(fileData, callback) {
         var boundary = '-------314159265358979323846';
         var delimiter = "\r\n--" + boundary + "\r\n";
         var close_delim = "\r\n--" + boundary + "--";

         var reader = new FileReader();
         reader.readAsBinaryString(fileData);
         reader.onload = function(e) {
         var contentType = fileData.type || 'application/octet-stream';
         var metadata = {
         'title': fileData.name,
         'mimeType': contentType,
         'writersCanShare':true,
         'parents': [{
         'kind': "drive#fileLink",
         'id': "0B8FisuvAYPTfN1o1Q0d4T2JLTk0"
         }]

         };

         var base64Data = btoa(reader.result);
         var multipartRequestBody =
         delimiter +
         'Content-Type: application/json\r\n\r\n' +
         JSON.stringify(metadata) +
         delimiter +
         'Content-Type: ' + contentType + '\r\n' +
         'Content-Transfer-Encoding: base64\r\n' +
         '\r\n' +
         base64Data +
         close_delim;
         console.log(multipartRequestBody);

         var request = gapi.client.request({
         'path': '/upload/drive/v2/files',
         'method': 'POST',
         'params': {'uploadType': 'multipart'},
         'headers': {
         'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
         },
         'body': multipartRequestBody});
         if (!callback) {
         callback = function(file) {
         console.log(file)
         };
         }
         request.execute(callback);
         }
         }
         */
    /// Custom file Picker End ----------------------------------------------------------
    function callGooglePlus() {
      function callback(resp) {
        console.log(resp);
        var heading = document.createElement('h4');
        var image = document.createElement('img');
        image.src = resp.result.image.url;
        heading.appendChild(image);
        heading.appendChild(document.createTextNode(resp.result.displayName));
        document.getElementById('content').appendChild(heading);
      }
      GooglePlus.callGooglePlus(callback);
    }
    // Google PlatForm Service
    $scope.setupPicker = function () {
      function pickerCallback(data) {
        if (data.action == google.picker.Action.PICKED) {
          //do something
          $scope.files = data.docs;
          $scope.arrive = true;
          // make shorten URL
          var request = gapi.client.urlshortener.url.get({ 'shortUrl': 'http://goo.gl/fbsS' });
          request.then(function (response) {
            appendResults(response.result.longUrl);
          }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
          });
          //alert('URL: ' + data.docs[0].url);
          $scope.$digest();
        } else if (data.action == google.picker.Action.CANCEL) {
        }
      }
      Googledrive.setupPicker(accessToken, pickerCallback);
    };
    function createNewAccountFolder() {
      //Pre. Get User Information
      //check if there exists an
      // API /users/me (only allow to have)
      var callback = function (resp) {
        console.log(resp.result.items.length);
        if (resp.result.items.length == 0) {
          $http.get('users/me').success(function (response) {
            console.log(response);
            var folderName = 'URI-' + response._id;
            //1. Create A New Folder
            Googledrive.createFolder(folderName, accessToken);  //2. Update User Information
                                                                //$http.get()
          });
        } else {
          console.log('there is already exist');
          $scope.rootGdriveFolderID = resp.result.items[0].id;
          $scope.$digest();
        }
      };
      Googledrive.findFolder(callback);
    }
    $scope.find = function () {
      $scope.products = ProductByUserId.query({ userId: $scope.authentication.user._id });
    };
    $scope.onChangeStatus = function () {
      console.log('sdfsf');
      $scope.$digest();
    };
    $scope.openNewProductDialog = function (ev) {
      //Open Dialog
      $mdDialog.show({
        templateUrl: 'modules/gdriveapps/template/newProductTemplate.html',
        targetEvent: ev,
        controller: newProductDialog,
        clickOutsideToClose: false
      }).then(function () {
        $scope.alert = 'You said "Okay".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
    function newProductDialog($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
    $scope.toggleLeft = function () {
      $mdSidenav('left').open();
    };
    $scope.getPaymentHistory = function () {
      $scope.payments = Payments.query();
    };
  }
]);
angular.module('gdriveapps').controller('BottomSheetExample', [
  '$scope',
  '$timeout',
  '$mdBottomSheet',
  function ($scope, $timeout, $mdBottomSheet) {
    $scope.alert = '';
    $scope.showListBottomSheet = function ($event) {
      $mdBottomSheet.show({
        templateUrl: 'modules/gdriveapps/views/bottom-sheet-list-template.html',
        controller: 'ListBottomSheetCtrl',
        targetEvent: $event
      }).then(function (clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };
    $scope.showGridBottomSheet = function ($event) {
      $mdBottomSheet.show({
        templateUrl: 'modules/gdriveapps/views/bottom-sheet-grid-template.html',
        controller: 'GridBottomSheetCtrl',
        targetEvent: $event
      }).then(function (clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };
  }
]).controller('LeftCtrl', [
  '$scope',
  '$timeout',
  '$mdSidenav',
  function ($scope, $timeout, $mdSidenav) {
    $scope.close = function () {
      $mdSidenav('left').close();
    };
  }
]);
angular.module('gdriveapps').controller('ListBottomSheetCtrl', [
  '$scope',
  '$mdBottomSheet',
  function ($scope, $mdBottomSheet) {
    $scope.items = [
      {
        name: 'Upload New Image (Google Drive)',
        icon: 'share'
      },
      {
        name: 'Select Existing Image (Google Drive)',
        icon: 'upload'
      },
      {
        name: 'Product History (Google Sheets)',
        icon: 'copy'
      },
      {
        name: 'Print this page (PDF Printer)',
        icon: 'print'
      }
    ];
    $scope.listItemClick = function ($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }
]);
angular.module('gdriveapps').controller('GridBottomSheetCtrl', [
  '$scope',
  '$mdBottomSheet',
  function ($scope, $mdBottomSheet) {
    $scope.items = [
      {
        name: 'Hangout',
        icon: 'hangout'
      },
      {
        name: 'Mail',
        icon: 'mail'
      },
      {
        name: 'Message',
        icon: 'message'
      },
      {
        name: 'Copy',
        icon: 'copy'
      },
      {
        name: 'Facebook',
        icon: 'facebook'
      },
      {
        name: 'Twitter',
        icon: 'twitter'
      }
    ];
    $scope.listItemClick = function ($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }
]);/*
 Copyright 2012 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Author: Eric Bidelman (ericbidelman@chromium.org)
 */
/*
function onError(e) {
    console.log(e);
}

// FILESYSTEM SUPPORT ----------------------------------------------------------
var fs = null;
var FOLDERNAME = 'test';

function writeFile(blob) {
    if (!fs) {
        return;
    }

    fs.root.getDirectory(FOLDERNAME, {create: true}, function(dirEntry) {
        dirEntry.getFile(blob.name, {create: true, exclusive: false}, function(fileEntry) {
            // Create a FileWriter object for our FileEntry, and write out blob.
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onerror = onError;
                fileWriter.onwriteend = function(e) {
                    console.log('Write completed.');
                };
                fileWriter.write(blob);
            }, onError);
        }, onError);
    }, onError);
}
// -----------------------------------------------------------------------------

var gDriveApp = angular.module('gDriveApp', []);

gDriveApp.factory('gdocs', function() {
    var gdocs = new GDocs();

    var dnd = new DnDFileController('body', function(files) {
        var $scope = angular.element(this).scope();
        Util.toArray(files).forEach(function(file, i) {
            gdocs.upload(file, function() {
                //$scope.fetchDocs(true);
            }, true);
        });
    });

    return gdocs;
});
//gDriveApp.service('gdocs', GDocs);
//gDriveApp.controller('DocsController', ['$scope', '$http', DocsController]);

// Main Angular controller for app.
function DocsController($scope, $http, gdocs) {
    $scope.docs = [];

    // Response handler that caches file icons in the filesystem API.
    function successCallbackWithFsCaching(resp, status, headers, config) {
        var docs = [];
        var totalEntries = resp.items.length;
        console.log(totalEntries);
        resp.items.forEach(function(entry, i) {
            var doc = {
                title: entry.title,
                updatedDate: Util.formatDate(entry.modifiedDate),
                updatedDateFull: entry.modifiedDate,
                icon: entry.iconLink,
                alternateLink: entry.alternateLink,
                size: entry.fileSize ? '( ' + entry.fileSize + ' bytes)' : null
            };

            // 'http://gstatic.google.com/doc_icon_128.png' -> 'doc_icon_128.png'
            doc.iconFilename = doc.icon.substring(doc.icon.lastIndexOf('/') + 1);
            console.log(doc.icon);
            // If file exists, it we'll get back a FileEntry for the filesystem URL.
            // Otherwise, the error callback will fire and we need to XHR it in and
            // write it to the FS.
            var fsURL = fs.root.toURL() + FOLDERNAME + '/' + doc.iconFilename;
            window.webkitResolveLocalFileSystemURL(fsURL, function(entry) {
                console.log('Fetched icon from the FS cache');

                doc.icon = entry.toURL(); // should be === to fsURL, but whatevs.

                $scope.docs.push(doc);

                // Only want to sort and call $apply() when we have all entries.
                if (totalEntries - 1 == i) {
                    $scope.docs.sort(Util.sortByDate);
                    $scope.$apply(function($scope) {}); // Inform angular we made changes.
                }
            }, function(e) {

                $http.get(doc.icon, {responseType: 'blob'}).success(function(blob) {
                    console.log('Fetched icon via XHR');

                    blob.name = doc.iconFilename; // Add icon filename to blob.

                    writeFile(blob); // Write is async, but that's ok.

                    doc.icon = window.URL.createObjectURL(blob);

                    $scope.docs.push(doc);
                    if (totalEntries - 1 == i) {
                        $scope.docs.sort(Util.sortByDate);
                    }
                });

            });
        });
    }

    $scope.clearDocs = function() {
        $scope.docs = []; // Clear out old results.
    };

    $scope.fetchDocs = function(retry) {
        this.clearDocs();

        if (gdocs.accessToken) {
            var config = {
                params: {'alt': 'json'},
                headers: {
                    'Authorization': 'Bearer ' + gdocs.accessToken

                }
            };

            //https://drive.google.com/open?id=0B8FisuvAYPTfampGWFhXQUs5dVU&authuser=0
            $http.get(gdocs.DOCLIST_FEED, config).
                success(successCallbackWithFsCaching).
                error(function(data, status, headers, config) {
                    if (status == 401 && retry) {
                        gdocs.removeCachedAuthToken(
                            gdocs.auth.bind(gdocs, true,
                                $scope.fetchDocs.bind($scope, false)));
                    }
                });
        }
    };

    // Toggles the authorization state.
    $scope.toggleAuth = function(interactive) {
        if (!gdocs.accessToken) {
            gdocs.auth(interactive, function() {
                $scope.fetchDocs(false);
            });
        } else {
            gdocs.revokeAuthToken(function() {});
            this.clearDocs();
        }
    }

    // Controls the label of the authorize/deauthorize button.
    $scope.authButtonLabel = function() {
        if (gdocs.accessToken)
            return 'Deauthorize';
        else
            return 'Authorize';
    };

    $scope.toggleAuth(false);
}

DocsController.$inject = ['$scope', '$http', 'gdocs']; // For code minifiers.

// Init setup and attach event listeners.
document.addEventListener('DOMContentLoaded', function(e) {

    // FILESYSTEM SUPPORT --------------------------------------------------------
    window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function(localFs) {
        fs = localFs;
    }, onError);
    // ---------------------------------------------------------------------------
});
*/
'use strict';
// Gdriveapps controller
angular.module('gdriveapps').constant('CONFIG', {
  clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
  apiKey: 'AIzaSyAFtN5UMzS3aYUfCgd6JoixOVZRORkM1zw',
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.install'
  ]
});
angular.module('gdriveapps').value('config', {
  clientId: '574563539488-pctm7fr21vcetcfpdf9hhaje9q5vepee.apps.googleusercontent.com',
  apiKey: 'AIzaSyAFtN5UMzS3aYUfCgd6JoixOVZRORkM1zw',
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.install'
  ]
});
angular.module('gdriveapps').controller('GdriveappsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Gdriveapps',
  function ($scope, $stateParams, $location, Authentication, Gdriveapps) {
    console.log($scope.authentication);
    // Create new Gdriveapp
    $scope.create = function () {
      // Create new Gdriveapp object
      var gdriveapp = new Gdriveapps({ name: this.name });
      // Redirect after save
      gdriveapp.$save(function (response) {
        $location.path('gdriveapps/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Gdriveapp
    $scope.remove = function (gdriveapp) {
      if (gdriveapp) {
        gdriveapp.$remove();
        for (var i in $scope.gdriveapps) {
          if ($scope.gdriveapps[i] === gdriveapp) {
            $scope.gdriveapps.splice(i, 1);
          }
        }
      } else {
        $scope.gdriveapp.$remove(function () {
          $location.path('gdriveapps');
        });
      }
    };
    // Update existing Gdriveapp
    $scope.update = function () {
      var gdriveapp = $scope.gdriveapp;
      gdriveapp.$update(function () {
        $location.path('gdriveapps/' + gdriveapp._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Gdriveapps
    $scope.find = function () {
      $scope.gdriveapps = Gdriveapps.query();
    };
    // Find existing Gdriveapp
    $scope.findOne = function () {
      $scope.gdriveapp = Gdriveapps.get({ gdriveappId: $stateParams.gdriveappId });
    };
  }
]);'use strict';
angular.module('gdriveapps').controller('HistoryPaymentController', [
  '$scope',
  'Authentication',
  'Payments',
  'PaymentsBySellerData',
  function ($scope, Authentication, Payments, PaymentsBySellerData) {
    $scope.authentication = Authentication;
    console.log($scope.authentication);
    $scope.getPaymentHistory = function () {
      $scope.payments = PaymentsBySellerData.query({ sellerData: Authentication.user._id });
    };
  }
]);/**
 * Created by KevinSo on 10/2/2014.
 */
'use strict';
var googlePlusUserLoader = function () {
    var STATE_START = 1;
    var STATE_ACQUIRING_AUTHTOKEN = 2;
    var STATE_AUTHTOKEN_ACQUIRED = 3;
    var state = STATE_START;
    var signin_button, xhr_button, revoke_button, user_info_div;
    function disableButton(button) {
      button.setAttribute('disabled', 'disabled');
    }
    function enableButton(button) {
      button.removeAttribute('disabled');
    }
    function changeState(newState) {
      state = newState;
      switch (state) {
      case STATE_START:
        enableButton(signin_button);
        disableButton(xhr_button);
        disableButton(revoke_button);
        break;
      case STATE_ACQUIRING_AUTHTOKEN:
        sampleSupport.log('Acquiring token...');
        disableButton(signin_button);
        disableButton(xhr_button);
        disableButton(revoke_button);
        break;
      case STATE_AUTHTOKEN_ACQUIRED:
        disableButton(signin_button);
        enableButton(xhr_button);
        enableButton(revoke_button);
        break;
      }
    }
    // @corecode_begin getProtectedData
    function xhrWithAuth(method, url, interactive, callback) {
      var access_token;
      var retry = true;
      getToken();
      function getToken() {
        chrome.identity.getAuthToken({ interactive: interactive }, function (token) {
          if (chrome.runtime.lastError) {
            callback(chrome.runtime.lastError);
            return;
          }
          access_token = token;
          requestStart();
        });
      }
      function requestStart() {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onload = requestComplete;
        xhr.send();
      }
      function requestComplete() {
        if (this.status == 401 && retry) {
          retry = false;
          chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
        } else {
          callback(null, this.status, this.response);
        }
      }
    }
    function getUserInfo(interactive) {
      xhrWithAuth('GET', 'https://www.googleapis.com/plus/v1/people/me', interactive, onUserInfoFetched);
    }
    // @corecode_end getProtectedData
    // Code updating the user interface, when the user information has been
    // fetched or displaying the error.
    function onUserInfoFetched(error, status, response) {
      if (!error && status == 200) {
        changeState(STATE_AUTHTOKEN_ACQUIRED);
        sampleSupport.log(response);
        var user_info = JSON.parse(response);
        populateUserInfo(user_info);
      } else {
        changeState(STATE_START);
      }
    }
    function populateUserInfo(user_info) {
      user_info_div.innerHTML = 'Hello ' + user_info.displayName;
      fetchImageBytes(user_info);
    }
    function fetchImageBytes(user_info) {
      if (!user_info || !user_info.image || !user_info.image.url)
        return;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', user_info.image.url, true);
      xhr.responseType = 'blob';
      xhr.onload = onImageFetched;
      xhr.send();
    }
    function onImageFetched(e) {
      if (this.status != 200)
        return;
      var imgElem = document.createElement('img');
      var objUrl = window.webkitURL.createObjectURL(this.response);
      imgElem.src = objUrl;
      imgElem.onload = function () {
        window.webkitURL.revokeObjectURL(objUrl);
      };
      user_info_div.insertAdjacentElement('afterbegin', imgElem);
    }
    // OnClick event handlers for the buttons.
    /**
     Retrieves a valid token. Since this is initiated by the user
     clicking in the Sign In button, we want it to be interactive -
     ie, when no token is found, the auth window is presented to the user.

     Observe that the token does not need to be cached by the app.
     Chrome caches tokens and takes care of renewing when it is expired.
     In that sense, getAuthToken only goes to the server if there is
     no cached token or if it is expired. If you want to force a new
     token (for example when user changes the password on the service)
     you need to call removeCachedAuthToken()
     **/
    function interactiveSignIn() {
      changeState(STATE_ACQUIRING_AUTHTOKEN);
      // @corecode_begin getAuthToken
      // @description This is the normal flow for authentication/authorization
      // on Google properties. You need to add the oauth2 client_id and scopes
      // to the app manifest. The interactive param indicates if a new window
      // will be opened when the user is not yet authenticated or not.
      // @see http://developer.chrome.com/apps/app_identity.html
      // @see http://developer.chrome.com/apps/identity.html#method-getAuthToken
      chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
        if (chrome.runtime.lastError) {
          sampleSupport.log(chrome.runtime.lastError);
          changeState(STATE_START);
        } else {
          sampleSupport.log('Token acquired:' + token + '. See chrome://identity-internals for details.');
          changeState(STATE_AUTHTOKEN_ACQUIRED);
        }
      });  // @corecode_end getAuthToken
    }
    function revokeToken() {
      user_info_div.innerHTML = '';
      chrome.identity.getAuthToken({ 'interactive': false }, function (current_token) {
        if (!chrome.runtime.lastError) {
          // @corecode_begin removeAndRevokeAuthToken
          // @corecode_begin removeCachedAuthToken
          // Remove the local cached token
          chrome.identity.removeCachedAuthToken({ token: current_token }, function () {
          });
          // @corecode_end removeCachedAuthToken
          // Make a request to revoke token in the server
          var xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
          xhr.send();
          // @corecode_end removeAndRevokeAuthToken
          // Update the user interface accordingly
          changeState(STATE_START);
          sampleSupport.log('Token revoked and removed from cache. ' + 'Check chrome://identity-internals to confirm.');
        }
      });
    }
    return {
      onload: function () {
        signin_button = document.querySelector('#signin');
        signin_button.addEventListener('click', interactiveSignIn);
        xhr_button = document.querySelector('#getxhr');
        xhr_button.addEventListener('click', getUserInfo.bind(xhr_button, true));
        revoke_button = document.querySelector('#revoke');
        revoke_button.addEventListener('click', revokeToken);
        user_info_div = document.querySelector('#user_info');
        // Trying to get user's info without signing in, it will work if the
        // application was previously authorized by the user.
        getUserInfo(false);
      }
    };
  }();'use strict';
angular.module('gdriveapps').provider('Weather', function () {
  var apiKey = '';
  this.setApiKey = function (key) {
    if (key)
      this.apiKey = key;
  };
  this.$get = [
    '$q',
    '$http',
    function ($q, $http) {
      var self = this;
      return {
        getWeatherForecast: function (city) {
          var d = $q.defer();
          $http({
            method: 'GET',
            url: self.getUrl('forecast', city),
            cache: true
          }).success(function (data) {
            // The wunderground API returns the
            // object that nests the forecasts inside
            // the forecast.simpleforecast key
            d.resolve(data.forecast.simpleforecast);
          }).error(function (err) {
            d.reject(err);
          });
          return d.promise;
        }
      };
    }
  ];
  this.getUrl = function (type, ext) {
    return 'http://api.wunderground.com/api/' + this.apiKey + '/' + type + '/p/' + ext + '.json';
  };
}).config([
  'WeatherProvider',
  function (WeatherProvider) {
    WeatherProvider.setApiKey('963b4eccel134894a');
  }
]);
angular.module('gdriveapps').controller('WeatherController', [
  '$scope',
  '$timeout',
  'Weather',
  function ($scope, $timeout, Weather) {
    $scope.date = {};
    var updateTime = function () {
      $scope.date.raw = new Date();
      $timeout(updateTime, 1000);
    };
    updateTime();
    //963b4eccel134894a
    $scope.weather = {};
    Weather.getWeatherForecast('CA/San_Francisco').then(function (data) {
      $scope.weather.forecast = data;
    });
  }
]);'use strict';
angular.module('gdriveapps').factory('gdocs', [function () {
    var gdocs = new GDocs();
    /*
		var dnd = new DnDFileController('body', function(files) {
			var $scope = angular.element(this).scope();
			Util.toArray(files).forEach(function(file, i) {
				gdocs.upload(file, function() {
					//$scope.fetchDocs(true);
				}, true);
			});
		});
		*/
    return gdocs;
  }]);'use strict';
//Gdriveapps service used to communicate Gdriveapps REST endpoints
angular.module('gdriveapps').factory('Gdriveapps', [
  '$resource',
  function ($resource) {
    return $resource('gdriveapps/:gdriveappId', { gdriveappId: '@_id' }, { update: { method: 'PUT' } });
  }
]);/*
 * Created by Kevin on 2014-10-29.
* */
'use strict';
angular.module('gdriveapps').factory('Googledrive', [
  'configGdrive',
  function (configGdrive) {
    return {
      createFolder: createFolder,
      findFolder: findFolder,
      getGoogleDriveInfo: getGoogleDriveInfo,
      setupPicker: setupPicker,
      listFolder: listFolder
    };
    function createFolder(FolderName, accessToken) {
      var request = gapi.client.request({
          'path': '/drive/v2/files/',
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          },
          'body': {
            'title': FolderName,
            'mimeType': 'application/vnd.google-apps.folder'
          }
        });
      request.execute(function (resp) {
        console.log(resp);
      });
    }
    // Search Folder
    function findFolder(callback) {
      gapi.client.load('drive', 'v2').then(function () {
        var request = gapi.client.drive.files.list({
            q: 'title contains \'URI-\'',
            fields: 'items(id,title)'
          });
        request.then(function (resp) {
          //console.log('result File list');
          //console.log(resp);
          callback(resp);
        });
      });
    }
    function getGoogleDriveInfo() {
      gapi.client.load('drive', 'v2').then(function () {
        var request = gapi.client.drive.about.get();
        request.execute(function (resp) {
          console.log('Current user name: ' + resp.name);
          console.log('Root folder ID: ' + resp.rootFolderId);
          console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
          console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
        });
      });
    }
    //Google File Picker Platform
    function setupPicker(accessToken, callback) {
      var callbackAfterFindFolder = function (resp) {
        var folderID = resp.result.items[0].id;
        var picker = new google.picker.PickerBuilder().setOAuthToken(accessToken).setDeveloperKey(configGdrive.developerKey).addView(new google.picker.DocsUploadView().setParent(folderID)).addView(new google.picker.DocsView().setParent(folderID)).enableFeature(google.picker.Feature.MULTISELECT_ENABLED).setLocale('ko').setCallback(callback).build();
        picker.setVisible(true);
      };
      findFolder(callbackAfterFindFolder);
    }
    function listFolder() {
      gapi.client.load('drive', 'v2').then(function () {
        var request = gapi.client.drive.files.list({
            maxResults: 10,
            fields: 'items(id,owners(displayName,emailAddress,isAuthenticatedUser,kind,permissionId),selfLink)'
          });
        request.then(function (resp) {
          console.log('result File list');
          console.log(resp);
        });
        var request = gapi.client.drive.files.list({
            maxResults: 10,
            fields: 'items(id,owners(displayName,emailAddress,isAuthenticatedUser,kind,permissionId),selfLink)'
          });
        request.then(function (resp) {
          console.log('result File list');
          console.log(resp);
        });
      });
    }
  }
]);'use strict';
angular.module('gdriveapps').factory('GooglePlus', [function () {
    return { callGooglePlus: callGooglePlus };
    function callGooglePlus(callback) {
      gapi.client.load('plus', 'v1').then(function () {
        // Step 5: Assemble the API request
        var request = gapi.client.plus.people.get({ 'userId': 'me' });
        // Step 6: Execute the API request
        request.then(callback, function (reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      });
    }
  }]);'use strict';
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
angular.module('opencpu').controller('GwasT1Controller', [
  '$scope',
  'Getrresult',
  'Readcsv',
  function ($scope, Getrresult, Readcsv) {
    // <rChart> Directive
    //ex1
    $scope.example1 = {
      src: 'library(rCharts)\n' + 'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' + 'nPlot(Freq ~ H' + 'air, group = "Eye", data = hair_eye_male, type = "multiBarChart")',
      title: 'Multi Bar Chart (NVD3)',
      content: 'I demonstrate my all time favorite d3js library, NVD3, which produces amazing interactive visualizations with little customization.'
    };
    //ex2
    $scope.example2 = {
      src: 'library(rCharts)\n' + 'data(economics, package = "ggplot2")\n' + 'econ <- transform(economics, date = as.character(date))\n' + 'mPlot(x = "date", y = c("psavert", "uempmed"), type = "Line", data = econ, pointSize = 0, lineWidth = 1)',
      title: 'Stock Info (Morris)',
      content: 'The next library I will be exploring is MorrisJS'
    };
    //ex3
    $scope.example3 = {
      src: 'library(rCharts)\n' + 'rPlot(mpg ~ wt | am + vs, data = mtcars, type = "point", color = "gear")',
      title: 'Stock Info (Morris)',
      content: 'The next library I will be exploring is MorrisJS'
    };
    //ex4
    $scope.example4 = {
      src: 'library(rCharts)\n' + 'hPlot(x = "Wr.Hnd", y = "NW.Hnd", data = MASS::survey, type = c("line", "bubble", "scatter"), group = "Clap", size = "Age")',
      title: 'Stock Info (HighCharts)',
      content: 'The next library I will be exploring is HighCharts'
    };
    //var movie1 = new Getrresult("Forgetting Sarah Marshall", "regular");
    //console.debug(movie1.id);
    var test = new Readcsv('fileName');
    test.readFile().then(function (result) {
      console.debug(result);
    });
  }
]);'use strict';
angular.module('opencpu').directive('rChart', [function () {
    return {
      templateUrl: '/modules/opencpu/directives/r-chart.html',
      scope: { rSource: '=' },
      restrict: 'E',
      link: function (scope, element, attrs, controllers) {
        scope.aceOptions = {
          theme: 'solarized_dark',
          mode: 'r',
          useWrapMode: true
        };
        ocpu.seturl('//kruny1001.ocpu.io/pbshop/R');
        scope.makeChart = function (example) {
          var req = ocpu.call('make_chart', { text: example.src }, function (session) {
              element.find('iframe').attr('src', session.getLoc() + 'files/output.html');  //$("#output"+num).attr('src', session.getLoc() + "files/output.html");
            }).fail(function (text) {
              alert('Error: ' + req.responseText);
            });
        };
        scope.makeChart(scope.rSource);
      }
    };
  }]);'use strict';
angular.module('opencpu').factory('Getrresult', [function () {
    return function Getrresult(title, type) {
      this.id = _.uniqueId('movie');
      this.title = title;
      this.type = type;
      this.charge = function (daysRented) {
        return this[this.chargeFunctionNmae()](daysRented);
      };
      this.chargeFunctionName = function () {
        return this.type.titleize().split(' ').join('').camelize() + 'Charge';
      };
      this.regularCharge = function (daysRented) {
        if (daysRented > 2) {
          return 2 + (daysRented - 2) * 1.5;
        }
        return 2;
      };
      this.newReleaseCharge = function (daysRented) {
        return daysRented * 3;
      };
      this.childrensCharge = function (daysRented) {
        if (daysRented > 3) {
          return 1.5 + (daysRented - 3) * 1.5;
        }
        return 1.5;
      };
    };
  }]);'use strict';
angular.module('opencpu').factory('Readcsv', [
  '$http',
  function ($http) {
    return function Readcsv(fileName) {
      this.id = _.uniqueId('csv');
      this.fileName = fileName;
      this.readFile = function () {
        //var URL = 'users/all';
        var URL = 'modules/opencpu/data/introduction.json';
        return $http.get(URL);
      };
      this.writeData = function (data) {
        console.debug('wrtieData function is invoked');
        console.debug(data);
      };
    };
  }
]);'use strict';
// Configuring the Articles module
angular.module('payments').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Payments', 'payments', 'dropdown', '/payments(/create)?');
    Menus.addSubMenuItem('topbar', 'payments', 'List Payments', 'payments');
    Menus.addSubMenuItem('topbar', 'payments', 'New Payment', 'payments/create');
  }
]);'use strict';
//Setting up route
angular.module('payments').config([
  '$stateProvider',
  function ($stateProvider) {
    // Payments state routing
    $stateProvider.state('listPayments', {
      url: '/payments',
      templateUrl: 'modules/payments/views/list-payments.client.view.html'
    }).state('createPayment', {
      url: '/payments/create',
      templateUrl: 'modules/payments/views/create-payment.client.view.html'
    }).state('viewPayment', {
      url: '/payments/:paymentId',
      templateUrl: 'modules/payments/views/view-payment.client.view.html'
    }).state('editPayment', {
      url: '/payments/:paymentId/edit',
      templateUrl: 'modules/payments/views/edit-payment.client.view.html'
    });
  }
]);'use strict';
// Payments controller
angular.module('payments').controller('PaymentsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Payments',
  function ($scope, $stateParams, $location, Authentication, Payments) {
    $scope.authentication = Authentication;
    // Create new Payment
    $scope.create = function () {
      // Create new Payment object
      var payment = new Payments({ name: this.name });
      // Redirect after save
      payment.$save(function (response) {
        $location.path('payments/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Payment
    $scope.remove = function (payment) {
      if (payment) {
        payment.$remove();
        for (var i in $scope.payments) {
          if ($scope.payments[i] === payment) {
            $scope.payments.splice(i, 1);
          }
        }
      } else {
        $scope.payment.$remove(function () {
          $location.path('payments');
        });
      }
    };
    // Update existing Payment
    $scope.update = function () {
      var payment = $scope.payment;
      payment.$update(function () {
        $location.path('payments/' + payment._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Payments
    $scope.find = function () {
      $scope.payments = Payments.query();
    };
    // Find existing Payment
    $scope.findOne = function () {
      $scope.payment = Payments.get({ paymentId: $stateParams.paymentId });
    };
  }
]);'use strict';
//Payments service used to communicate Payments REST endpoints
angular.module('payments').factory('Payments', [
  '$resource',
  function ($resource) {
    return $resource('payments/:paymentId', { paymentId: '@_id' }, { update: { method: 'PUT' } });
  }
]);
angular.module('payments').factory('PaymentsBySellerData', [
  '$resource',
  function ($resource) {
    return $resource('payments/:sellerData', { sellerData: '@sellerData' }, {});
  }
]);'use strict';
//Setting up route
angular.module('products').config([
  '$stateProvider',
  function ($stateProvider) {
    // Products state routing
    $stateProvider.state('listProducts', {
      url: '/products',
      templateUrl: 'modules/products/views/list-products.client.view.html'
    }).state('listProductsUnderBanner', {
      url: '/products/list/:bannerId',
      templateUrl: 'modules/products/views/list-products-banner.client.view.html'
    }).state('createProduct', {
      url: '/products/create/:bannerId',
      templateUrl: 'modules/products/views/create-product.client.view.html'
    }).state('viewProduct', {
      url: '/products/:productId',
      templateUrl: 'modules/products/views/view-product.client.view.html'
    }).state('editProduct', {
      url: '/products/:productId/edit',
      templateUrl: 'modules/products/views/edit-product.client.view.html'
    });
  }
]);'use strict';
// Products controller
angular.module('products').controller('ProductsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Products',
  'Banners',
  'ProductsBanner',
  function ($scope, $stateParams, $location, Authentication, Products, Banners, ProductsBanner) {
    $scope.authentication = Authentication;
    $scope.parentId = $stateParams.bannerId;
    // Create new Product
    $scope.create = function () {
      // Create new Product object
      var product = new Products({
          name: this.name,
          mainimg: this.mainimg,
          imgs: this.imgs,
          price: this.price,
          description: this.description,
          parentId: $scope.parentId
        });
      // Redirect after save
      product.$save(function (response) {
        $location.path('products/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
      this.mainimg = '';
      this.imgs = '';
      this.price = 0;
      this.description = '';
    };
    // Remove existing Product
    $scope.remove = function (product) {
      if (product) {
        product.$remove();
        for (var i in $scope.products) {
          if ($scope.products[i] === product) {
            $scope.products.splice(i, 1);
          }
        }
      } else {
        $scope.product.$remove(function () {
          $location.path('products');
        });
      }
    };
    // Update existing Product
    $scope.update = function () {
      var product = $scope.product;
      product.$update(function () {
        $location.path('products/' + product._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Products
    $scope.find = function () {
      $scope.products = Products.query();
    };
    $scope.findBanners = function () {
      $scope.banners = Banners.query();
    };
    // Find existing Product
    $scope.findOne = function () {
      $scope.product = Products.get({ productId: $stateParams.productId });
    };
    $scope.findProductUnderBanner = function () {
      console.log('banner id is ' + $scope.parentId);
      $scope.products = ProductsBanner.query({}, { bannerId: $scope.parentId });
    };
  }
]);/**
 * Created by KevinSo on 9/24/2014.
 */
'use strict';
//Products service used to communicate Products REST endpoints
angular.module('products').factory('ProductsBanner', [
  '$resource',
  function ($resource) {
    return $resource('products/list/:bannerId', { bannerId: '@bannerId' }, {
      update: { method: 'PUT' },
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
]);
angular.module('products').factory('ProductByUserId', [
  '$resource',
  function ($resource) {
    return $resource('products/find/:userId', { userId: '@userId' }, {
      update: { method: 'PUT' },
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
]);'use strict';
//Products service used to communicate Products REST endpoints
angular.module('products').factory('Products', [
  '$resource',
  function ($resource) {
    return $resource('products/:productId', { productId: '@_id' }, { update: { method: 'PUT' } });
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
angular.module('seller-interface').config([
  '$stateProvider',
  function ($stateProvider) {
    // Seller interface state routing
    $stateProvider.state('listing-product', {
      url: '/listing-product',
      templateUrl: 'modules/seller-interface/views/listing-product.client.view.html'
    });
  }
]);'use strict';
angular.module('seller-interface').controller('ListingProductController', [
  '$scope',
  '$log',
  '$mdDialog',
  'Products',
  'GetPurchaseJWT',
  function ($scope, $log, $mdDialog, Products, GetPurchaseJWT) {
    $scope.items = [
      {
        name: 'Upload New Image (Google Drive)',
        icon: 'share'
      },
      {
        name: 'Select Existing Image (Google Drive)',
        icon: 'upload'
      },
      {
        name: 'Product History (Google Sheets)',
        icon: 'copy'
      },
      {
        name: 'Print this page (PDF Printer)',
        icon: 'print'
      }
    ];
    $scope.find = function () {
      $scope.products = Products.query();
      $scope.products.$promise.then(function (result) {
        console.log('Done querying products');
        $scope.partitioned = partition(result, 2);
        console.log($scope.partitioned);
      });
    };
    $scope.listItemClick = function ($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
    $scope.purchaseProduct = function (productID) {
      GetPurchaseJWT.query({ productID: productID }).$promise.then(function (response) {
        console.log(response[0]);
        google.payments.inapp.buy({
          parameters: {},
          jwt: response[0],
          success: function () {
            window.alert('success');
          },
          failure: function () {
            window.alert('failure');
          }
        });
      });
    };
    function partition(input, size) {
      var newArr = [];
      for (var i = 0; i < input.length; i += size) {
        newArr.push(input.slice(i, i + size));
      }
      return newArr;
    }
    ;
    $scope.dialogAdvanced = function (ev) {
      $log.debug('dialogAdvanced() preparing to show...');
      $mdDialog.show({
        templateUrl: 'modules/seller-interface/views/dialogtest.html',
        targetEvent: ev,
        controller: DialogController,
        onComplete: function () {
          $log.debug('dialogAdvanced() now shown!');
        }
      }).then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
  }
]);/*
 Directives Talking to Controllers
 https://egghead.io/lessons/angularjs-directives-talking-to-controllers
* */
'use strict';
angular.module('seller-interface').directive('selectImg', [function () {
    return {
      restrict: 'A',
      scope: {
        value: '=mySlider',
        index: '@',
        onChangeStatus: '&'
      },
      link: function postLink(scope, element, attrs) {
        var isClicked = false;
        element.bind('click', function () {
          console.log('click');
          if (isClicked) {
            TweenLite.to(this, 0.3, { borderColor: '#ffffff' });
            isClicked = false;
            scope.value.selected = false;
            scope.onChangeStatus();
          } else {
            TweenLite.to(this, 0.3, { borderColor: '#FF5F49' });
            isClicked = true;
            scope.value.selected = true;
            scope.onChangeStatus();
          }
        });
      }
    };
  }]);/**
 * Created by Kevin on 2014-10-30.
 */
'use strict';
angular.module('seller-interface').directive('selectSection', [function () {
    return {
      restrict: 'A',
      scope: {},
      link: function postLink(scope, element, attrs) {
        var isClicked = false;
        element.bind('mouseenter', function () {
          TweenLite.to(this, 0.3, { backgroundColor: 'rgb(187, 194, 239)' });
          console.log('mouse enter');
        });
        element.bind('mouseleave', function () {
          TweenLite.to(this, 0.3, { backgroundColor: '#F5F5F5' });
          console.log('mouse leave');
        });
      }
    };
  }]);'use strict';
//Setting up route
angular.module('shop-list').config([
  '$stateProvider',
  function ($stateProvider) {
    // Shop list state routing
    $stateProvider.state('detail-product', {
      url: '/detail-product/:productId',
      templateUrl: 'modules/shop-list/views/detail-product.client.view.html'
    }).state('products-list', {
      url: '/products-list',
      templateUrl: 'modules/shop-list/views/products-list.client.view.html'
    });
  }
]);'use strict';
angular.module('shop-list').controller('DetailProductController', [
  '$scope',
  '$stateParams',
  'Products',
  'GetPurchaseJWT',
  'Payments',
  function ($scope, $stateParams, Products, GetPurchaseJWT, Payments) {
    var productId = $stateParams.productId;
    $scope.quantity = 1;
    // Find a Product
    $scope.findOne = function () {
      $scope.product = Products.get({ productId: productId });
    };
    // Tabs Start -----------------------------------------------
    var tabs = [
        {
          title: '\uc0c1\uc138 \uc0c1\ud488\uc124\uba85',
          content: '<p>R package and code repository</p><p><br/></p><p><a href="http://kruny1001.ocpu.io/pbshop/info">R</a>\xa0Package Repository: <a href="http://kruny1001.ocpu.io/pbshop/info">here</a></p><p> Code Repository: <a href="https://github.com/kruny1001/pbshop">here</a></p><p><br/></p><p>Demo web application:\xa0<a href="http://kevangular.herokuapp.com/#!/gwas-t1">http://kevangular.herokuapp.com/#!/gwas-t1</a></p><p><br/></p><p><img style="height: 578px;width: 1075px;" src="http://goo.gl/t5cXqX" title="" class=""/><br/></p>'
        },
        {
          title: '\ubc18\ud488/\ubc30\uc1a1/\uad50\ud658 \ubb38\uc758',
          content: '&#10;                        <h1 style="text-align: center;">&#34;\ud5e4\uc5b4\ud2b8\ub9ac\ud2b8\uba3c\ud2b8\uc758 \ub300\uc138&#34;</h1><h2 style="text-align: center;">\ud5d0\ub9ac\uc6c3 \uc2a4\ud0c0\uc758 \ubca0\uc2a4\ud2b8\uc140\ub7ec</h2><p><br/></p><p style="text-align: left;">\ubaa8\ub85c\uce78 \uc624\uc77c \ud2b8\ub9ac\ud2b8\uba3c\ud2b8 \uc81c\ud488\uc758 \ubaa8\ub85c\ucf54 \ub0a8\uc11c \uc9c0\uc5ed\uc5d0\uc11c \uc7ac\ubc30\ub41c &#34;\uc544\ub974\uac04 \uc624\uc77c&#34; \uc774 \uc8fc\uc131\ubd84\uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc9c4 \uc81c\ud488\ub4e4\ub85c \ucc9c\uc5f0 \ud1a0\ucf54\ud398\ub864, \ube44\ud0c0\ubbfc E, \uc624\uba54\uac009, \ud3f4\ub9ac\ud398\ub180\uc774 \ud48d\ubd80\ud558\uac8c \ud568\uc720\ub418\uc5b4 \uc788\uc5b4 \uc138\ud3ec \uad6c\uc870\ub97c \uc790\uc5f0\uc2a4\ub7fd\uac8c \uc7ac\uc0dd\uc2dc\ucf1c\uc8fc\uace0 \ubaa8\ubc1c\uc758 \ud0c4\ub825\uc744 \ub192\uc5ec\uc8fc\uba70 \uc724\uae30\uc640 \ud65c\ub825\uc774 \uc5c6\ub294 \ubaa8\ubc1c\uc5d0 \uc0dd\uba85\ub825\uacfc \uad11\ud0dd\uc744 \ud68c\ubcf5\uc2dc\ucf1c \uc90d\ub2c8\ub2e4. \uac74\uc870\ud55c \uc5d0\uc5b4\ucee8 \ubc14\ub78c\uc73c\ub85c \ubd80\ud130 \uc218\ubd84\uc744 \ubcf4\ud638\ud558\uba70 \uc7a5\ub9c8\ucca0 \uc2b5\uae30\ub85c \uc778\ud574 \uae30\ub984\uc9c0\uace0 \uccd0\uc9c4 \uba38\ub9ac\uacb0\uc744 \ubd80\ub4dc\ub7fd\uace0 \ubcfc\ub968\uac10 \uc788\uac8c \ucf00\uc5b4\ud574 \uc90d\ub2c8\ub2e4.\xa0</p><p style="text-align: left;">\uc5fc\uc0c9\uc774\ub098 \ud37c\uba38\uc2dc \uc0ac\uc6a9\ud558\uba74 \ubaa8\ubc1c\uc758 \uc190\uc0c1\uc744 \ub9c9\uc544\uc8fc\uace0 \ud6a8\uacfc\ub97c \ub354 \uc624\ub798 \uc9c0\uc18d\uc2dc\ucf1c \uc8fc\uba70 \ub4dc\ub77c\uc774 \uc2dc\uac04\uc744 40% \uc774\uc0c1 \ub2e8\ucd95 \uc2dc\ucf1c \uc90d\ub2c8\ub2e4. \ubaa8\ub85c\uce78 \uc624\uc77c\uc758 \ubaa8\ub4e0 \uc81c\ud488\uc740 \ub3d9\ubb3c\uc131 \ud568\uc720\ubb3c\uc774 \ubc30\uc81c\ub41c \ucd5c\uc0c1\uc758 \ud488\uc9c8\ub85c \ubaa8\ub4e0 \uc81c\ud488\uc774 \ubaa8\ubc1c\uc5d0 \ud0c4\ub825\uc744 \uc7ac\uc0dd\uc2dc\ucf1c\uc8fc\uba70 \ud654\ub824\ud55c \uc724\uae30\ub97c \ub354\ud574\uc8fc\ub294 \ub3d9\uc2dc\uc5d0 \uc720\ud574 \uc0b0\uc18c\ub85c\ubd80\ud130 \ub6f0\uc5b4\ub09c \ubc29\uc5b4\ub825\uc73c\ub85c \uc138\ud3ec\uac00 \uc190\uc0c1\ub418\ub294 \uac83 \uc744 \ubc29\uc9c0\ud558\ub294 \ud6a8\uacfc\uac00 \ud0c1\uc6d4\ud569\ub2c8\ub2e4.\xa0</p><p style="text-align: left;">\uc2a4\ud0c0\uc77c\ub9c1\uacfc \ucf00\uc5b4\ub97c \ub3d9\uc2dc\uc5d0 \ub9cc\ub3c5\uc2dc\ucf1c\ub4dc\ub9ac\ub294 \uba40\ud2f0\ud50c \uc81c\ud488\ub4e4 \uccb4\ud5d8\ud574 \ubcf4\uc138\uc694!</p><p style="text-align: left;">\ub9cc\uc871\ud558\uc2e4\ubfd0\ub9cc \uc544\ub2c8\ub77c \ub9e4\ub2c8\uc544\uac00 \ub418\uc2e4 \uac83 \uc744 \ud655\uc2e0\ud569\ub2c8\ub2e4.\xa0</p><p style="text-align: left;"><br/></p><p style="text-align: left;"><br/></p>&#10;'
        },
        {
          title: '\uc0c1\ud488\ubd84\uc11d\ud3c9/\uc0c1\ud488\ubb38\uc758',
          content: 'You can bind the selected tab via the selected attribute on the md-tabs element.'
        }
      ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 1;
    $scope.announceSelected = announceSelected;
    $scope.announceDeselected = announceDeselected;
    $scope.addTab = function (title, view) {
      view = view || title + ' Content View';
      tabs.push({
        title: title,
        content: view,
        disabled: false,
        style: style
      });
    };
    $scope.removeTab = function (tab) {
      for (var j = 0; j < tabs.length; j++) {
        if (tab.title == tabs[j].title) {
          $scope.tabs.splice(j, 1);
          break;
        }
      }
    };
    function announceDeselected(tab) {
      $scope.farewell = 'Goodbye ' + tab.title + '!';
    }
    function announceSelected(tab) {
      $scope.greeting = 'Hello ' + tab.title + '!';
    }
    // Tabs End -----------------------------------------------
    $scope.from_one = { from_one: 'bold data in controller in from_one.js' };
    $scope.purchaseProduct = function (productID, quantity) {
      console.log(productID);
      console.log(quantity);
      var optdesc = 'quantity is ' + quantity;
      GetPurchaseJWT.query({
        productID: productID,
        qty: quantity,
        optdesc: optdesc
      }).$promise.then(function (response) {
        google.payments.inapp.buy({
          parameters: {},
          jwt: response[0],
          success: function (result) {
            //window.alert('success: '+ result);
            //console.log(result.request);
            //console.log(result.response);
            //console.log(result.jwt);
            // Insert Payment History
            createPaymentHistory(result);
          },
          failure: function () {
            window.alert('Your Payment transaction is failed');
          }
        });
      });
    };
    var createPaymentHistory = function (result) {
      // Create new Payment object
      var payment = new Payments({
          name: result.request.name,
          price: Number(result.request.price),
          sellerData: result.request.sellerData,
          description: result.request.description,
          currencyCode: result.request.currencyCode,
          orderID: result.response.orderId
        });
      // Redirect after save
      payment.$save(function (response) {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);'use strict';
angular.module('shop-list').controller('ProductslistController', [
  '$scope',
  '$state',
  '$resource',
  '$q',
  'Allproducts',
  'AllBanners',
  'GetPurchaseJWT',
  function ($scope, $state, $resource, $q, Allproducts, AllBanners, GetPurchaseJWT) {
    $scope.products = [];
    $scope.banners = [];
    // initialization
    $scope.products = Allproducts.query();
    $scope.banners = AllBanners.query();
    $scope.editProducts = function (productID) {
      console.log('Product Edit Button');
      $state.go('editProduct', { productId: productID });
    };
    $scope.deleteProducts = function (productID) {
      console.log('Product Delete Button');
      Allproducts.delete({ productID: productID });
      //After deleting a contents, update current contents
      $scope.products = Allproducts.query();
    };
    $scope.zoomIn = function (element) {
      //console.log(element.currentTarget);
      TweenLite.to(element.currentTarget, 0.5, { scale: 5 });
    };
    $scope.zoomOut = function (element) {
      //console.log(element.currentTarget);
      TweenLite.to(element.currentTarget, 0.5, { scale: 1 });
    };
    $scope.purchaseProduct = function (productID) {
      console.log(productID);
      GetPurchaseJWT.query({ productID: productID }).$promise.then(function (response) {
        console.log(response[0]);
        google.payments.inapp.buy({
          parameters: {},
          jwt: response[0],
          success: function () {
            window.alert('success');
          },
          failure: function () {
            window.alert('failure');
          }
        });
      });
    };  //http://localhost:3000/#!/products/544b060cf50235382250d10a/edit
  }
]);'use strict';
angular.module('shop-list').factory('Allproducts', [
  '$resource',
  function ($resource) {
    return $resource('products/:productID', { productID: '@_id' });
  }
]);
angular.module('shop-list').factory('AllBanners', [
  '$resource',
  function ($resource) {
    return $resource('banners', { productID: '@_id' });
  }
]);
angular.module('shop-list').factory('GetPurchaseJWT', [
  '$resource',
  function ($resource) {
    return $resource('purchase/gw_test/:productID/:qty/:optdesc', {
      productID: '@_id',
      qty: '@qty',
      optdesc: '@optdesc'
    }, {
      query: {
        method: 'get',
        isArray: true
      }
    });
  }
]);
angular.module('shop-list').factory('', [
  '$resource',
  function ($resource) {
    return $resource('', {}, {
      query: {
        method: 'get',
        isArray: true
      },
      insert: { method: 'post' }
    });
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
  }]);'use strict';
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
  'AuthTokenFactory',
  function ($scope, $http, $location, Authentication, AuthTokenFactory) {
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
        $scope.authentication.user = response.user;
        AuthTokenFactory.setToken(response.token);
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
]);/**
 * Created by Kevin on 2014-10-22.
 */
'use strict';
angular.module('users').factory('AuthTokenFactory', [
  '$window',
  function AuthTokenFactory($window) {
    var store = $window.localStorage;
    var key = 'auth-token-kev';
    return {
      getToken: getToken,
      setToken: setToken
    };
    function getToken() {
      return store.getItem(key);
    }
    function setToken(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }
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