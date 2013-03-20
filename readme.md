chrt.js
=======
*Simple HTML5 Charts using the canvas element* [chartjs.org](http://www.chartjs.org)

## Getting started

### Including chrt.js

`chrt.js` is an extensible event-driven fork of `Chart.js`, powered by [mootools prime](https://github.com/mootools/prime).
It is vastly different from the original, using proper Class structures and Kinetic.js for Canvas events.

```javascript
require(['chrt/pie','vendor/lodash'], function(PieChart, _){
    var chrt = new PieChart({
        element: document.getElementById('canvas'),
        data: [{
            value: 30,
            color: '#F38630',
            labelFontSize: 16,
            label: 'Liberal Democrats',
            labelColor: '#ffffff'
        }, {
            value: 50,
            color: "#880000",
            label: 'Labour',
            labelColor: '#ffffff'
        }, {
            value: 100,
            color: "#69D2E7",
            label: 'Conservatives',
            labelFontColor: '#ffffff'
        }],
        labelFontSize: 16,
        animation: true,
        animateRotate: false,
        animateScale: true
    });


    chrt.on('ready', function(){
        console.log('ctx ready');
    });

    chrt.on('beforerender', function(){
        console.log('about to render, new data in');

        _.each(this.data, function(el){
            el.value = el.value + _.random(-10, 10);
        });
    });

    chrt.on('render', function(){
        console.log('rendered');

        this.setOptions({
            animateScale: false
        });


        setTimeout(_.bind(this.render, this), 3000);
    });

    chrt.render();
});
```

## Creating a new chart

To create a chart, we need to create a new prime, extending the `chrt` base Class.

```javascript
define([
	'./chrt',
	'../vendor/prime',
	'../vendor/lodash'
], function(chrt, prime, _){
	'use strict';

	return prime({

		options: {
		    // defaults
			segmentShowStroke: true,
			segmentStrokeColor: '#fff',
			segmentStrokeWidth: 2,
			animation: true,
			animationSteps: 60,
			animationEasing: 'easeOutSine',
			animateRotate: true,
			animateScale: false
		},

		inherits: chrt,

        render: function(){
            this.ctx;
        }
    });
});
```

You can also extend existing chrt types:

```
define([
	'./chrt/pie',
	'../vendor/prime',
	'../vendor/lodash'
], function(pie, prime, _){
    'use strict';

    return prime({

        inherits: pie,

        consructor: function(options){
            // overrides...
            this.parent();
        }

    });

});
```

## Chart types

### Line chart

#### Introduction

A line chart is a way of plotting data points on a line.

Often, it is used to show trend data, and the comparison of different data sets.

#### Example usage

```javascript
new Chart(ctx).PolarArea(data,options);
```
#### Data structure

```javascript
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        data: [65, 59, 90, 81, 56, 55, 40]
    }, {
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        data: [28, 48, 40, 19, 96, 27, 100]
    }]
};
```
The line chart requires an array of labels for each of the data points. This is show on the X axis.

The data for line charts is broken up into an array of datasets. Each dataset has a colour for the fill, a colour for the line and colours for the points and strokes of the points. These colours are strings just like CSS. You can use RGBA, RGB, HEX or HSL notation.

#### Chart options

```javascript
line.prototype.options = {

    //Boolean - If we show the scale above the chart data
    scaleOverlay: false,

    //Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: null,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    //Number - The scale starting value
    scaleStartValue: null,

    //String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    //Number - Pixel width of the scale line
    scaleLineWidth: 1,

    //Boolean - Whether to show labels on the scale
    scaleShowLabels: false,

    //Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    //String - Scale label font declaration for the scale label
    scaleFontFamily: "'Arial'",

    //Number - Scale label font size in pixels
    scaleFontSize: 12,

    //String - Scale label font weight style
    scaleFontStyle: "normal",

    //String - Scale label font colour
    scaleFontColor: "#666",

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //Boolean - Whether to animate the chart
    animation: true,

    //Number - Number of animation steps
    animationSteps: 60,

    //String - Animation easing effect
    animationEasing: "easeOutQuart"
};
```
