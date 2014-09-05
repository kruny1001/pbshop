/*
 http://ramnathv.github.io/rCharts/

 */
'use strict';

angular.module('opencpu').controller('GwasT1Controller', ['$scope',
    function($scope) {
        //ex1
        $scope.example1 = {
            src: 'library(rCharts)\n'+
                'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' +
                'nPlot(Freq ~ H' +
                'air, group = "Eye", data = hair_eye_male, type = "multiBarChart")',
            title:'Multi Bar Chart'
        };

        //ex2
        $scope.example2 = {
            src:'library(rCharts)\n'+
                'data(economics, package = "ggplot2")\n'+
                'econ <- transform(economics, date = as.character(date))\n' +
                'mPlot(x = "date", y = c("psavert", "uempmed"), type = "Line", data = econ, pointSize = 0, lineWidth = 1)',
            title:'Stock Info'
        };

        //ex3
        $scope.example3 = '';
    }
]);