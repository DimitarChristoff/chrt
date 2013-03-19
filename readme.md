chrt.js
=======
chrt.js is a fork of Chart.js, available under the [MIT license] (http://opensource.org/licenses/MIT).

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
