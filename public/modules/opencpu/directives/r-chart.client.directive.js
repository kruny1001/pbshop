'use strict';

angular.module('opencpu').directive('rChart', [function() {
    return {
        templateUrl: '/modules/opencpu/directives/r-chart.html',
        scope:{rSource:'='},
        restrict: 'E',
        link:
            function(scope, element, attrs, controllers){
                scope.aceOptions = {
                    theme: 'solarized_dark',
                    mode: 'r',
                    useWrapMode : true
                };
                ocpu.seturl("//kruny1001.ocpu.io/pbshop/R");

                scope.makeChart = function(example){
                    var req = ocpu.call("make_chart", {
                        text: example.src
                    }, function(session){
                        element.find('iframe').attr('src', session.getLoc() + 'files/output.html');
                        //$("#output"+num).attr('src', session.getLoc() + "files/output.html");

                    }).fail(function(text){
                        alert("Error: " + req.responseText);
                    });
                };
                scope.makeChart(scope.rSource);
            }
    };
}
]);
