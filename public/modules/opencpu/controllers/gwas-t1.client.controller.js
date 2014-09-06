/*
 http://ramnathv.github.io/rCharts/

 */
'use strict';

angular.module('opencpu').controller('GwasT1Controller', ['$scope',
    function($scope) {
        // <rChart> Directive
        //ex1
        $scope.example1 = {
            src: 'library(rCharts)\n'+
                'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' +
                'nPlot(Freq ~ H' +
                'air, group = "Eye", data = hair_eye_male, type = "multiBarChart")',
            title:'Multi Bar Chart (NVD3)',
            content:'I demonstrate my all time favorite d3js library, NVD3, which produces amazing interactive visualizations with little customization.'
        };

        //ex2
        $scope.example2 = {
            src:'library(rCharts)\n'+
                'data(economics, package = "ggplot2")\n'+
                'econ <- transform(economics, date = as.character(date))\n' +
                'mPlot(x = "date", y = c("psavert", "uempmed"), type = "Line", data = econ, pointSize = 0, lineWidth = 1)',
            title:'Stock Info (Morris)',
            content:'The next library I will be exploring is MorrisJS'
        };

        //ex3
        $scope.example3 = {
            src:'library(rCharts)\n'+
                'rPlot(mpg ~ wt | am + vs, data = mtcars, type = "point", color = "gear")',
            title:'Stock Info (Morris)',
            content:'The next library I will be exploring is MorrisJS'
        };

        //ex4
        $scope.example4 = {
            src:'library(rCharts)\n'+
                'hPlot(x = "Wr.Hnd", y = "NW.Hnd", data = MASS::survey, type = c("line", "bubble", "scatter"), group = "Clap", size = "Age")',
            title:'Stock Info (HighCharts)',
            content:'The next library I will be exploring is HighCharts'
        };
    }
]);