require.config({
	baseUrl: '../',
	paths: {
		charts: 'js/chrt',
		vendor: 'js/vendor/',
		prime: 'vendor/prime',
		lodash: 'vendor/lodash'
	}
});

require(['charts/pie'], function(PieChart){
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
			color: '#550000'
		});
	});

	chrt.on('render', function(){
		console.log('rendered');

		this.data.reverse();
		setTimeout(this.render.bind(this), 3000);
	})

	chrt.render();
});