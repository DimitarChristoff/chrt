require(['../js/chrt'], function(Chart){
	'use strict';

	var chartData = [
		{
			value : Math.random(),
			color: "#D97041"
		},
		{
			value : Math.random(),
			color: "#C7604C"
		},
		{
			value : Math.random(),
			color: "#21323D"
		},
		{
			value : Math.random(),
			color: "#9D9B7F"
		},
		{
			value : Math.random(),
			color: "#7D4F6D"
		},
		{
			value : Math.random(),
			color: "#584A5E"
		}
	];

	var myPolarArea = new Chart(document.getElementById("canvas").getContext("2d")).PolarArea(chartData);
});
