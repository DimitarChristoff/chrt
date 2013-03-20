require.config({
	baseUrl: '../js/'
});

require(['chrt/pie', 'vendor/lodash'], function(PieChart, _){
	'use strict';

	var chrt = new PieChart({
		element: document.getElementById('canvas'),
		data: [{
			value: 30,
			color: "#F38630"
		}, {
			value: 50,
			color: "#E0E4CC"
		}, {
			value: 100,
			color: "#69D2E7"
		}],
		animation: !false
	});


	chrt.on('ready', function(){
		console.log('ctx ready');
	});

	chrt.on('beforerender', function(){
		console.log('about to render');
		this.data.push({
			value: 44,
			color: '#550000',
			label: 'Evented',
			labelColor : '#FFFFAF'
		});
	});

	chrt.on('render', function(){
		console.log('rendered');

		this.setOptions({
			animation: false
		});

		this.data.reverse();
		setTimeout(_.bind(this.render, this), 3000);
	})

	chrt.render();
});
