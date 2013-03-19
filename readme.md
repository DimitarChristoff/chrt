chrt.js
=======
*Simple HTML5 Charts using the canvas element* [chartjs.org](http://www.chartjs.org)

You can find documentation at [chartjs.org/docs](http://www.chartjs.org/docs).

Chrt.js is available under the [MIT license] (http://opensource.org/licenses/MIT).

## Getting started

### Including chrt.js

`chrt.js` is an AMD fork of `Chart.js`. You use it by doing:

```javascript
require(['chrt', function(Chart){
    new Chart(...);
});
```

If requirejs is not available, it will export `Chart` to your global object but will expect to
find `lodash` or `underscore.js` first (so `window._`);

## Creating a chart

To create a chart, we need to instantiate the Chart class. To do this, we need to pass in the 2d context of where we want to draw the chart. Here's an example.

```html
<canvas id="myChart" width="400" height="400"></canvas>
```
And the js:

```javascript
// Get the context of the canvas element we want to select
var ctx = document.getElementbyId("myChart").getContext("2d");
var myNewChart = new Chart(ctx).PolarArea(data);
```
After we've instantiated the Chart class on the canvas we want to draw on, Chart.js will handle the scaling for retina displays.

With the Chart class set up, we can go on to create one of the charts Chart.js has available. In the example below, we would be drawing a Polar area chart.

```javascript
new Chart(ctx).PolarArea(data,options);
```

We call a method of the name of the chart we want to create. We pass in the data for that chart type, and the options for that chart as parameters. Chart.js will merge the options you pass in with the default options for that chart type.

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
Line.defaults = {

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
    animationEasing: "easeOutQuart",

    //Function - Fires when the animation is complete
    onAnimationComplete: null
};
```
