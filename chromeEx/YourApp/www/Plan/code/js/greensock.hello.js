var app = angular.module('helloGreensock', ['ngAnimate']);

app.controller('MainCtrl', function ($scope) {
  $scope.menu = [
    {title: 'Menu Item'},
    {title: 'Menu Item'},
    {title: 'Menu Item'},
    {title: 'Menu Item'},
    {title: 'Menu Item'},
    {title: 'Menu Item'}
  ];
});

app.directive('menuItem', function () {
  var controller = function ($scope) {
    $scope.active = false;
  };

  return {
    scope: true,
    controller: controller
  }
});

app.animation('.menu-animation', function () {
  return {
    beforeAddClass: function (element, className, done) {
      if (className == 'highlight') {
        TweenLite.to(element, 0.2, {
          width: '200',
          color: '#89CD25',
          borderLeft: '20px solid #89CD25',
          onComplete: done
        });
      }
      else {
        done();
      }
    },

    beforeRemoveClass: function (element, className, done) {
      if (className == 'highlight') {
        TweenLite.to(element, 0.4, {
          width: '160',
          color: '#CCC',
          borderLeft: '10px solid #333',
          onComplete: done
        });
      }
      else {
        done();
      }
    }
  };
});