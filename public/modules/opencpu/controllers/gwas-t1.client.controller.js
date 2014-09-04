/*
 http://ramnathv.github.io/rCharts/

*/
'use strict';

ocpu.seturl("//ramnathv.ocpu.io/rCharts/R");
angular.module('opencpu').controller('GwasT1Controller', ['$scope',
	function($scope) {
        // ace editor Setting
        $scope.aceOptions = {
            theme: 'solarized_dark',
            mode: 'r',
            useWrapMode : true
        }
        //ex1
        $scope.example1 = 'library(rCharts)\n'+
            'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' +
            'nPlot(Freq ~ Hair, group = "Eye", data = hair_eye_male, type = "multiBarChart")';

        //ex2
        $scope.example2 = 'library(rCharts)\n'+
            'data(economics, package = "ggplot2")\n'+
            'econ <- transform(economics, date = as.character(date))\n' +
            'mPlot(x = "date", y = c("psavert", "uempmed"), type = "Line", data = econ, pointSize = 0, lineWidth = 1)';


        //ex3
        $scope.example3 = '';

        $scope.makeChart = function(num, example){
            console.log(num);
            console.log(example);
            var req = ocpu.call("make_chart", {
                text: example
            }, function(session){
                $("#output"+num).attr('src', session.getLoc() + "files/output.html");
            }).fail(function(text){
                alert("Error: " + req.responseText);
            });
        }
        $scope.makeChart(1, $scope.example1);
        $scope.makeChart(2, $scope.example2);
        $scope.makeChart(3, $scope.example3);
	}
]);