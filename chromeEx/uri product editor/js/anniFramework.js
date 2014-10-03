/**
 * Created by KevinSo on 10/3/2014.
 */


// This is the Text PlugIn Test Directive
// input params
//  textData: text content

productEditor.directive('anniText', function(){
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        scope:{
            textData: '@'
        },
        link: function ($scope, element, attrs) {
            var tl = new TimelineLite({});
            var orignTest = element.text().trim();
            element.text = '';
            tl.add(TweenLite.to(element, 10, {text: $scope.textData, ease:Linear.easeNone}));
            //tl.add(TweenLite.to(element, 2, {text:{value:"Min Dew Hwa"}, ease:Linear.easeNone}));
            //tl.add(TweenLite.to(element, 2, {text:{value:"This is the new text", newClass:"class2", oldClass:"class1"}, ease:Power2.easeIn}));
            //tl.add(TweenLite.to(element, 6, {text: {value:"The Urimium eCommerce is the first attempt to be a social webCommerce", padSpace:true}}));
            tl.play();
            var dValue = false;

            element.bind('click', function(){
                console.log('create clicked');
                this.innerText = '';
                if(!dValue){tl.play(); dValue = true}
                else{tl.reverse(); dValue = false;}
            });
        }
    }
});

// This is the view slide animation
// options:
productEditor.directive('anniViewSlide', function(){
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        scope:{
            textData: '@'
        },
        link: function ($scope, element, attrs) {
            var tl = new TimelineLite({});
            var orignTest = element.text().trim();
            element.text = '';
            tl.add(TweenLite.to(element, 10, {text: $scope.textData, ease:Linear.easeNone}));
            //tl.add(TweenLite.to(element, 2, {text:{value:"Min Dew Hwa"}, ease:Linear.easeNone}));
            //tl.add(TweenLite.to(element, 2, {text:{value:"This is the new text", newClass:"class2", oldClass:"class1"}, ease:Power2.easeIn}));
            //tl.add(TweenLite.to(element, 6, {text: {value:"The Urimium eCommerce is the first attempt to be a social webCommerce", padSpace:true}}));
            tl.play();
            var dValue = false;

            element.bind('click', function(){
                console.log('create clicked');
                this.innerText = '';
                if(!dValue){tl.play(); dValue = true}
                else{tl.reverse(); dValue = false;}
            });
        }
    }
});

