require(['../js/chrt'], function(Chart){
	'use strict';

	var pieData = [
		{
			value: 30,
			color:"#F38630"
		},
		{
			value : 50,
			color : "#E0E4CC"
		},
		{
			value : 100,
			color : "#69D2E7"
		}

	];

	var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
});