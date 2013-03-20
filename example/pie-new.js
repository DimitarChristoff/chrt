require.config({
	baseUrl: '../js/'
});

require(['chrt/pie', 'vendor/lodash'], function(PieChart, _){
	'use strict';

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
