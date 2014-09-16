
/**
 * Created by KevinSo on 9/15/2014.
 */

angular.module('andrewkim')
    .factory('AniGenerator', [function() {
        return function Customer(name, user, targetLink) {
            this.name       = _.uniqueId();
            this.user       = user;
            this.targetLink = targetLink;

            this.addMainFrame = function(element){
                var crntElement = element;
                return crntElement.append('<div ng-class={{'+ 'dd' +'}} banner-main-frame> <button ng-click="clickBtn()">factory</button></subFrame>');
            }

            this.isNameUnique = function(){
                console.log('isNameUnique');
                return true;
            }

            this.addSubFrame = function() {
                return '<div ng-class={{'+ 'well' +'}} banner-sub-frame></subFrame>';
            }
        }
    }
]);

