/*global define, _*/
;(function(window){
	'use strict';

	var wrap = function(_){

		var Chart = function(context){
			//Define the global Chart Variable as a class.

			var chart = this;

			// common strings
			var center = 'center',
				right = 'right',
				left = 'left',
				middle = 'middle',
				px = 'px';

			//Easing functions adapted from Robert Penner's easing equations
			//http://www.robertpenner.com/easing/

			var animationOptions = {
				linear: function(t){
					return t;
				},
				easeInQuad: function(t){
					return t * t;
				},
				easeOutQuad: function(t){
					return -1 * t * (t - 2);
				},
				easeInOutQuad: function(t){
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
					return -1 / 2 * ((--t) * (t - 2) - 1);
				},
				easeInCubic: function(t){
					return t * t * t;
				},
				easeOutCubic: function(t){
					return 1 * ((t = t / 1 - 1) * t * t + 1);
				},
				easeInOutCubic: function(t){
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
					return 1 / 2 * ((t -= 2) * t * t + 2);
				},
				easeInQuart: function(t){
					return t * t * t * t;
				},
				easeOutQuart: function(t){
					return -1 * ((t = t / 1 - 1) * t * t * t - 1);
				},
				easeInOutQuart: function(t){
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
					return -1 / 2 * ((t -= 2) * t * t * t - 2);
				},
				easeInQuint: function(t){
					return 1 * (t /= 1) * t * t * t * t;
				},
				easeOutQuint: function(t){
					return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
				},
				easeInOutQuint: function(t){
					if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
					return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
				},
				easeInSine: function(t){
					return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
				},
				easeOutSine: function(t){
					return 1 * Math.sin(t / 1 * (Math.PI / 2));
				},
				easeInOutSine: function(t){
					return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
				},
				easeInExpo: function(t){
					return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
				},
				easeOutExpo: function(t){
					return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
				},
				easeInOutExpo: function(t){
					if (t == 0) return 0;
					if (t == 1) return 1;
					if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
					return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
				},
				easeInCirc: function(t){
					if (t >= 1) return t;
					return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
				},
				easeOutCirc: function(t){
					return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
				},
				easeInOutCirc: function(t){
					if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
					return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
				},
				easeInElastic: function(t){
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t == 0) return 0;
					if ((t /= 1) == 1) return 1;
					if (!p) p = 1 * .3;
					if (a < Math.abs(1)){
						a = 1;
						var s = p / 4;
					}
					else var s = p / (2 * Math.PI) * Math.asin(1 / a);
					return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
				},
				easeOutElastic: function(t){
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t == 0) return 0;
					if ((t /= 1) == 1) return 1;
					if (!p) p = 1 * .3;
					if (a < Math.abs(1)){
						a = 1;
						var s = p / 4;
					}
					else var s = p / (2 * Math.PI) * Math.asin(1 / a);
					return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
				},
				easeInOutElastic: function(t){
					var s = 1.70158;
					var p = 0;
					var a = 1;
					if (t == 0) return 0;
					if ((t /= 1 / 2) == 2) return 1;
					if (!p) p = 1 * (.3 * 1.5);
					if (a < Math.abs(1)){
						a = 1;
						var s = p / 4;
					}
					else var s = p / (2 * Math.PI) * Math.asin(1 / a);
					if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
					return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
				},
				easeInBack: function(t){
					var s = 1.70158;
					return 1 * (t /= 1) * t * ((s + 1) * t - s);
				},
				easeOutBack: function(t){
					var s = 1.70158;
					return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
				},
				easeInOutBack: function(t){
					var s = 1.70158;
					if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
					return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
				},
				easeInBounce: function(t){
					return 1 - animationOptions.easeOutBounce(1 - t);
				},
				easeOutBounce: function(t){
					if ((t /= 1) < (1 / 2.75)){
						return 1 * (7.5625 * t * t);
					} else if (t < (2 / 2.75)){
						return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
					} else if (t < (2.5 / 2.75)){
						return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
					} else {
						return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
					}
				},
				easeInOutBounce: function(t){
					if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
					return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
				}
			};

			//todo: add resize events that gather and rescale, move to event methods
			//Variables global to the chart
			var width = context.canvas.width,
				height = context.canvas.height;


			//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			if (window.devicePixelRatio){
				context.canvas.style.width = width + px;
				context.canvas.style.height = height + px;
				context.canvas.height = height * window.devicePixelRatio;
				context.canvas.width = width * window.devicePixelRatio;
				context.scale(window.devicePixelRatio, window.devicePixelRatio);
			}

			this.PolarArea = function(data, options){

				chart.PolarArea.defaults = {
					scaleOverlay: true,
					scaleOverride: false,
					scaleSteps: null,
					scaleStepWidth: null,
					scaleStartValue: null,
					scaleShowLine: true,
					scaleLineColor: 'rgba(0,0,0,.1)',
					scaleLineWidth: 1,
					scaleShowLabels: true,
					scaleLabel: '<%=value%>',
					scaleFontFamily: '\'Arial\'',
					scaleFontSize: 12,
					scaleFontStyle: 'normal',
					scaleFontColor: '#666',
					scaleShowLabelBackdrop: true,
					scaleBackdropColor: 'rgba(255,255,255,0.75)',
					scaleBackdropPaddingY: 2,
					scaleBackdropPaddingX: 2,
					segmentShowStroke: true,
					segmentStrokeColor: '#fff',
					segmentStrokeWidth: 2,
					animation: true,
					animationSteps: 100,
					animationEasing: 'easeOutBounce',
					animateRotate: true,
					animateScale: false,
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.PolarArea.defaults, options) : chart.PolarArea.defaults;

				return new PolarArea(data, config, context);
			};

			this.Radar = function(data, options){

				chart.Radar.defaults = {
					scaleOverlay: false,
					scaleOverride: false,
					scaleSteps: null,
					scaleStepWidth: null,
					scaleStartValue: null,
					scaleShowLine: true,
					scaleLineColor: 'rgba(0,0,0,.1)',
					scaleLineWidth: 1,
					scaleShowLabels: false,
					scaleLabel: '<%=value%>',
					scaleFontFamily: '\'Arial\'',
					scaleFontSize: 12,
					scaleFontStyle: 'normal',
					scaleFontColor: '#666',
					scaleShowLabelBackdrop: true,
					scaleBackdropColor: 'rgba(255,255,255,0.75)',
					scaleBackdropPaddingY: 2,
					scaleBackdropPaddingX: 2,
					angleShowLineOut: true,
					angleLineColor: 'rgba(0,0,0,.1)',
					angleLineWidth: 1,
					pointLabelFontFamily: '\'Arial\'',
					pointLabelFontStyle: 'normal',
					pointLabelFontSize: 12,
					pointLabelFontColor: '#666',
					pointDot: true,
					pointDotRadius: 3,
					pointDotStrokeWidth: 1,
					datasetStroke: true,
					datasetStrokeWidth: 2,
					datasetFill: true,
					animation: true,
					animationSteps: 60,
					animationEasing: 'easeOutQuart',
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.Radar.defaults, options) : chart.Radar.defaults;

				return new Radar(data, config, context);
			};

			this.Pie = function(data, options){

				chart.Pie.defaults = {
					segmentShowStroke: true,
					segmentStrokeColor: '#fff',
					segmentStrokeWidth: 2,
					animation: true,
					animationSteps: 100,
					animationEasing: 'easeOutBounce',
					animateRotate: true,
					animateScale: false,
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.Pie.defaults, options) : chart.Pie.defaults;

				return new Pie(data, config, context);
			};

			this.Doughnut = function(data, options){

				chart.Doughnut.defaults = {
					segmentShowStroke: true,
					segmentStrokeColor: '#fff',
					segmentStrokeWidth: 2,
					percentageInnerCutout: 50,
					animation: true,
					animationSteps: 100,
					animationEasing: 'easeOutBounce',
					animateRotate: true,
					animateScale: false,
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;

				return new Doughnut(data, config, context);
			};

			this.Line = function(data, options){
				//todo: decouple defaults so it's extendible on protos for instances
				chart.Line.defaults = {
					scaleOverlay: false,
					scaleOverride: false,
					scaleSteps: null,
					scaleStepWidth: null,
					scaleStartValue: null,
					scaleLineColor: 'rgba(0,0,0,.1)',
					scaleLineWidth: 1,
					scaleShowLabels: true,
					scaleLabel: '<%=value%>',
					scaleFontFamily: '\'Arial\'',
					scaleFontSize: 12,
					scaleFontStyle: 'normal',
					scaleFontColor: '#666',
					scaleShowGridLines: true,
					scaleGridLineColor: 'rgba(0,0,0,.05)',
					scaleGridLineWidth: 1,
					bezierCurve: true,
					pointDot: true,
					pointDotRadius: 4,
					pointDotStrokeWidth: 2,
					datasetStroke: true,
					datasetStrokeWidth: 2,
					datasetFill: true,
					animation: true,
					animationSteps: 60,
					animationEasing: 'easeOutQuart',
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;

				return new Line(data, config, context);
			};

			this.Bar = function(data, options){

				chart.Bar.defaults = {
					scaleOverlay: false,
					scaleOverride: false,
					scaleSteps: null,
					scaleStepWidth: null,
					scaleStartValue: null,
					scaleLineColor: 'rgba(0,0,0,.1)',
					scaleLineWidth: 1,
					scaleShowLabels: true,
					scaleLabel: '<%=value%>',
					scaleFontFamily: '\'Arial\'',
					scaleFontSize: 12,
					scaleFontStyle: 'normal',
					scaleFontColor: '#666',
					scaleShowGridLines: true,
					scaleGridLineColor: 'rgba(0,0,0,.05)',
					scaleGridLineWidth: 1,
					barShowStroke: true,
					barStrokeWidth: 2,
					barValueSpacing: 5,
					barDatasetSpacing: 1,
					animation: true,
					animationSteps: 60,
					animationEasing: 'easeOutQuart',
					onAnimationComplete: null
				};

				var config = (options) ? mergeChartConfig(chart.Bar.defaults, options) : chart.Bar.defaults;

				return new Bar(data, config, context);
			};

			var clear = function(c){
				c.clearRect(0, 0, width, height);
			};

			var PolarArea = function(data, config, ctx){

				var maxSize,
					scaleHop,
					calculatedScale,
					labelHeight,
					scaleHeight,
					valueBounds,
					labelTemplateString,
					i = 0,
					steps;

				//todo: what is maxSize, seems undefined.
				//todo: what is scaleHeight, undefined.

				calculateDrawingSizes();

				valueBounds = getValueBounds();

				labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : null;

				//Check and set the scale
				if (!config.scaleOverride){
					calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
				}
				else {
					calculatedScale = {
						steps: config.scaleSteps,
						stepValue: config.scaleStepWidth,
						graphMin: config.scaleStartValue,
						labels: []
					};

					if (labelTemplateString){
						for (steps = calculatedScale.steps; i < steps; i++){
							calculatedScale.labels.push(_.template(labelTemplateString, {
								value: (config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces(config.scaleStepWidth))
							}));
						}
					}
				}

				//todo: unexpected...
				scaleHop = maxSize / (calculatedScale.steps);

				//Wrap in an animation loop wrapper
				animationLoop(config, drawScale, drawAllSegments, ctx);

				function calculateDrawingSizes(){
					maxSize = (Min([width, height]) / 2);
					//Remove whatever is larger - the font size or line width.

					maxSize -= Max([config.scaleFontSize * 0.5, config.scaleLineWidth * 0.5]);

					labelHeight = config.scaleFontSize * 2;
					//If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
					if (config.scaleShowLabelBackdrop){
						labelHeight += (2 * config.scaleBackdropPaddingY);
						maxSize -= config.scaleBackdropPaddingY * 1.5;
					}

					scaleHeight = maxSize;
					//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
					labelHeight = Default(labelHeight, 5);
				}

				function drawScale(){
					var i = 0,
						label,
						textWidth;

					for (; i < calculatedScale.steps; i++){
						//If the line object is there
						if (config.scaleShowLine){
							ctx.beginPath();
							ctx.arc(width / 2, height / 2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
							ctx.strokeStyle = config.scaleLineColor;
							ctx.lineWidth = config.scaleLineWidth;
							ctx.stroke();
						}

						if (config.scaleShowLabels){
							ctx.textAlign = 'center';
							ctx.font = config.scaleFontStyle + ' ' + config.scaleFontSize + 'px ' + config.scaleFontFamily;
							label = calculatedScale.labels[i];
							//If the backdrop object is within the font object
							if (config.scaleShowLabelBackdrop){
								textWidth = ctx.measureText(label).width;
								ctx.fillStyle = config.scaleBackdropColor;
								ctx.beginPath();
								ctx.rect(
									Math.round(width / 2 - textWidth / 2 - config.scaleBackdropPaddingX),     //X
									Math.round(height / 2 - (scaleHop * (i + 1)) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY),//Y
									Math.round(textWidth + (config.scaleBackdropPaddingX * 2)), //Width
									Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY * 2)) //Height
								);
								ctx.fill();
							}
							ctx.textBaseline = 'middle';
							ctx.fillStyle = config.scaleFontColor;
							ctx.fillText(label, width / 2, height / 2 - (scaleHop * (i + 1)));
						}
					}
				}

				function drawAllSegments(animationDecimal){
					var startAngle = -Math.PI / 2,
						angleStep = (Math.PI * 2) / data.length,
						scaleAnimation = 1,
						rotateAnimation = 1,
						i = 0;

					if (config.animation){
						if (config.animateScale){
							scaleAnimation = animationDecimal;
						}
						if (config.animateRotate){
							rotateAnimation = animationDecimal;
						}
					}

					for (; i < data.length; i++){

						ctx.beginPath();
						ctx.arc(width / 2, height / 2, scaleAnimation * calculateOffset(data[i].value, calculatedScale, scaleHop), startAngle, startAngle + rotateAnimation * angleStep, false);
						ctx.lineTo(width / 2, height / 2);
						ctx.closePath();
						ctx.fillStyle = data[i].color;
						ctx.fill();

						if (config.segmentShowStroke){
							ctx.strokeStyle = config.segmentStrokeColor;
							ctx.lineWidth = config.segmentStrokeWidth;
							ctx.stroke();
						}
						startAngle += rotateAnimation * angleStep;
					}
				}

				function getValueBounds(){
					var upperValue = Number.MIN_VALUE,
						lowerValue = Number.MAX_VALUE,
						i = 0,
						len = data.length;

					for (; i < len; i++){
						if (data[i].value > upperValue){
							upperValue = data[i].value;
						}
						if (data[i].value < lowerValue){
							lowerValue = data[i].value;
						}
					}

					return {
						maxValue: upperValue,
						minValue: lowerValue,
						maxSteps: Math.floor((scaleHeight / (labelHeight * 0.66))),
						minSteps: Math.floor((scaleHeight / labelHeight * 0.5))
					};
				}
			};

			var Radar = function(data, config, ctx){

				var maxSize,
					scaleHop,
					calculatedScale,
					labelHeight,
					scaleHeight,
					valueBounds,
					labelTemplateString,
					i = 0,
					steps;

				//If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
				if (!data.labels) data.labels = [];

				calculateDrawingSizes();

				valueBounds = getValueBounds();

				labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : null;

				//Check and set the scale
				if (!config.scaleOverride){
					calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
				}
				else {
					calculatedScale = {
						steps: config.scaleSteps,
						stepValue: config.scaleStepWidth,
						graphMin: config.scaleStartValue,
						labels: []
					};

					if (labelTemplateString){
						for (steps = calculatedScale.steps; i < steps; i++){
							calculatedScale.labels.push(_.template(labelTemplateString, {
								value: (config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces(config.scaleStepWidth))
							}));
						}
					}
				}

				//todo: confusing, maxSize gets assigned as byproduct of calculateDrawingSizes()
				scaleHop = maxSize / (calculatedScale.steps);

				animationLoop(config, drawScale, drawAllDataPoints, ctx);

				//Radar specific functions.
				function drawAllDataPoints(animationDecimal){
					var rotationDegree = (2 * Math.PI) / data.datasets[0].data.length,
						i = 0,
						len = data.datasets.length,
						len2,
						j,
						k = 0;

					ctx.save();
					//translate to the centre of the canvas.
					ctx.translate(width / 2, height / 2);
					ctx.rotate(rotationDegree);

					//We accept multiple data sets for radar charts, so show loop through each set
					for (; i < len; i++){
						ctx.beginPath();

						ctx.moveTo(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop)));
						for (j = 1, len2 = data.datasets[i].data.length; j < len2; j++){
							ctx.rotate(rotationDegree);
							ctx.lineTo(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop)));
						}

						ctx.closePath();

						ctx.fillStyle = data.datasets[i].fillColor;
						ctx.strokeStyle = data.datasets[i].strokeColor;
						ctx.lineWidth = config.datasetStrokeWidth;
						ctx.fill();
						ctx.stroke();

						if (config.pointDot){
							ctx.fillStyle = data.datasets[i].pointColor;
							ctx.strokeStyle = data.datasets[i].pointStrokeColor;
							ctx.lineWidth = config.pointDotStrokeWidth;
							for (; k < len2; k++){
								ctx.rotate(rotationDegree);
								ctx.beginPath();
								ctx.arc(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)), config.pointDotRadius, 2 * Math.PI, false);
								ctx.fill();
								ctx.stroke();
							}
						}
					}

					ctx.restore();
				}

				function drawScale(){
					var rotationDegree = (2 * Math.PI) / data.datasets[0].data.length,
						i = 0,
						h = 0,
						j,
						len,
						len2,
						textWidth,
						opposite,
						adjacent;

					ctx.save();
					ctx.translate(width / 2, height / 2);

					if (config.angleShowLineOut){
						ctx.strokeStyle = config.angleLineColor;
						ctx.lineWidth = config.angleLineWidth;

						for (len = data.datasets[0].data.length; h < len; h++){
							ctx.rotate(rotationDegree);
							ctx.beginPath();
							ctx.moveTo(0, 0);
							ctx.lineTo(0, -maxSize);
							ctx.stroke();
						}
					}

					for (len = calculatedScale.steps; i < len; i++){
						ctx.beginPath();

						if (config.scaleShowLine){
							ctx.strokeStyle = config.scaleLineColor;
							ctx.lineWidth = config.scaleLineWidth;
							ctx.moveTo(0, -scaleHop * (i + 1));

							for (j = 0, len2 = data.datasets[0].data.length; j < len2; j++){
								ctx.rotate(rotationDegree);
								ctx.lineTo(0, -scaleHop * (i + 1));
							}

							ctx.closePath();
							ctx.stroke();
						}

						if (config.scaleShowLabels){
							ctx.textAlign = center;
							ctx.font = setFont(config.scaleFontStyle, config.scaleFontSize, config.scaleFontFamily);
							ctx.textBaseline = middle;

							if (config.scaleShowLabelBackdrop){
								textWidth = ctx.measureText(calculatedScale.labels[i]).width;
								ctx.fillStyle = config.scaleBackdropColor;
								ctx.beginPath();
								ctx.rect(
									Math.round(-textWidth / 2 - config.scaleBackdropPaddingX),     //X
									Math.round((-scaleHop * (i + 1)) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY),//Y
									Math.round(textWidth + (config.scaleBackdropPaddingX * 2)), //Width
									Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY * 2)) //Height
								);

								ctx.fill();
							}

							ctx.fillStyle = config.scaleFontColor;
							ctx.fillText(calculatedScale.labels[i], 0, -scaleHop * (i + 1));
						}
					}

					for (i = 0, len = data.labels.length; i < len; i++){

						ctx.font = setFont(config.pointLabelFontStyle, config.pointLabelFontSize, config.pointLabelFontFamily);
						ctx.fillStyle = config.pointLabelFontColor;

						opposite = Math.sin(rotationDegree * i) * (maxSize + config.pointLabelFontSize);
						adjacent = Math.cos(rotationDegree * i) * (maxSize + config.pointLabelFontSize);

						ctx.textAlign = (rotationDegree * i == Math.PI || rotationDegree * i == 0)
							? center
							: (rotationDegree * i > Math.PI)
							? right
							: left;

						ctx.textBaseline = middle;

						ctx.fillText(data.labels[i], opposite, -adjacent);
					}

					ctx.restore();
				}

				function calculateDrawingSizes(){
					var labelLength = 0,
						textMeasurement,
						i = 0,
						len = data.labels.length;

					maxSize = (Min([width, height]) / 2);

					labelHeight = config.scaleFontSize * 2;

					for (; i < len; i++){
						ctx.font = setFont(config.pointLabelFontStyle, config.pointLabelFontSize, config.pointLabelFontFamily);
						textMeasurement = ctx.measureText(data.labels[i]).width;
						if (textMeasurement > labelLength) labelLength = textMeasurement;
					}

					//Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
					maxSize -= Max([labelLength, ((config.pointLabelFontSize / 2) * 1.5)]);

					maxSize -= config.pointLabelFontSize;
					maxSize = CapValue(maxSize, null, 0);
					scaleHeight = maxSize;
					//If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
					labelHeight = Default(labelHeight, 5);
				}

				function getValueBounds(){
					var upperValue = Number.MIN_VALUE;
					var lowerValue = Number.MAX_VALUE;

					for (var i = 0; i < data.datasets.length; i++){
						for (var j = 0; j < data.datasets[i].data.length; j++){
							if (data.datasets[i].data[j] > upperValue){
								upperValue = data.datasets[i].data[j]
							}
							if (data.datasets[i].data[j] < lowerValue){
								lowerValue = data.datasets[i].data[j]
							}
						}
					}

					var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
					var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));

					return {
						maxValue: upperValue,
						minValue: lowerValue,
						maxSteps: maxSteps,
						minSteps: minSteps
					};


				}
			};

			var Pie = function(data, config, ctx){
				var segmentTotal = 0;

				//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
				var pieRadius = Min([height / 2, width / 2]) - 5;

				for (var i = 0; i < data.length; i++){
					segmentTotal += data[i].value;
				}


				animationLoop(config, null, drawPieSegments, ctx);

				function drawPieSegments(animationDecimal){
					var cumulativeAngle = -Math.PI / 2,
						scaleAnimation = 1,
						rotateAnimation = 1;
					if (config.animation){
						if (config.animateScale){
							scaleAnimation = animationDecimal;
						}
						if (config.animateRotate){
							rotateAnimation = animationDecimal;
						}
					}
					for (var i = 0; i < data.length; i++){
						var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
						ctx.beginPath();
						ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
						ctx.lineTo(width / 2, height / 2);
						ctx.closePath();
						ctx.fillStyle = data[i].color;
						ctx.fill();

						if (config.segmentShowStroke){
							ctx.lineWidth = config.segmentStrokeWidth;
							ctx.strokeStyle = config.segmentStrokeColor;
							ctx.stroke();
						}
						cumulativeAngle += segmentAngle;
					}
				}
			};

			var Doughnut = function(data, config, ctx){
				var segmentTotal = 0;

				//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
				var doughnutRadius = Min([height / 2, width / 2]) - 5;

				var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);

				for (var i = 0; i < data.length; i++){
					segmentTotal += data[i].value;
				}

				animationLoop(config, null, drawPieSegments, ctx);

				function drawPieSegments(animationDecimal){
					var cumulativeAngle = -Math.PI / 2,
						scaleAnimation = 1,
						rotateAnimation = 1;

					if (config.animation){
						if (config.animateScale){
							scaleAnimation = animationDecimal;
						}
						if (config.animateRotate){
							rotateAnimation = animationDecimal;
						}
					}
					for (var i = 0; i < data.length; i++){
						var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
						ctx.beginPath();
						ctx.arc(width / 2, height / 2, scaleAnimation * doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
						ctx.arc(width / 2, height / 2, scaleAnimation * cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
						ctx.closePath();
						ctx.fillStyle = data[i].color;
						ctx.fill();

						if (config.segmentShowStroke){
							ctx.lineWidth = config.segmentStrokeWidth;
							ctx.strokeStyle = config.segmentStrokeColor;
							ctx.stroke();
						}
						cumulativeAngle += segmentAngle;
					}
				}
			};

			var Line = function(data, config, ctx){
				var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, rotateLabels = 0;

				calculateDrawingSizes();

				valueBounds = getValueBounds();
				//Check and set the scale
				labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : '';
				if (!config.scaleOverride){

					calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
				}
				else {
					calculatedScale = {
						steps: config.scaleSteps,
						stepValue: config.scaleStepWidth,
						graphMin: config.scaleStartValue,
						labels: []
					}
					for (var i = 0; i < calculatedScale.steps; i++){
						if (labelTemplateString){
							calculatedScale.labels.push(_.template(labelTemplateString, {value: (config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces(config.scaleStepWidth))}));
						}
					}
				}

				scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
				calculateXAxisSize();
				animationLoop(config, drawScale, drawLines, ctx);

				function drawLines(animPc){
					var i = 0,
						len = data.datasets.length,
						len2,
						j,
						dataSet,
						dataSetD;

					for (; i < len; i++){
						dataSet = data.datasets[i];
						dataSetD = dataSet.data;
						ctx.strokeStyle = dataSet.strokeColor;
						ctx.lineWidth = config.datasetStrokeWidth;
						ctx.beginPath();
						ctx.moveTo(yAxisPosX, xAxisPosY - animPc * (calculateOffset(dataSetD[0], calculatedScale, scaleHop)))

						for (j = 1, len2 = dataSetD.length; j < len2; j++){
							if (config.bezierCurve){
								ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j));
							}
							else {
								ctx.lineTo(xPos(j), yPos(i, j));
							}
						}

						ctx.stroke();
						if (config.datasetFill){
							ctx.lineTo(yAxisPosX + (valueHop * (dataSetD.length - 1)), xAxisPosY);
							ctx.lineTo(yAxisPosX, xAxisPosY);
							ctx.closePath();
							ctx.fillStyle = dataSet.fillColor;
							ctx.fill();
						}
						else {
							ctx.closePath();
						}

						if (config.pointDot){
							ctx.fillStyle = dataSet.pointColor;
							ctx.strokeStyle = dataSet.pointStrokeColor;
							ctx.lineWidth = config.pointDotStrokeWidth;

							for (j = 0; j < len2; j++){
								ctx.beginPath();
								ctx.arc(yAxisPosX + (valueHop * j), xAxisPosY - animPc * (calculateOffset(dataSetD[j], calculatedScale, scaleHop)), config.pointDotRadius, 0, Math.PI * 2, true);
								ctx.fill();
								ctx.stroke();
							}
						}
					}

					function yPos(dataSet, iteration){
						return xAxisPosY - animPc * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop));
					}

					function xPos(iteration){
						return yAxisPosX + (valueHop * iteration);
					}
				}

				function drawScale(){
					//X axis line
					ctx.lineWidth = config.scaleLineWidth;
					ctx.strokeStyle = config.scaleLineColor;
					ctx.beginPath();
					ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
					ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
					ctx.stroke();


					if (rotateLabels > 0){
						ctx.save();
						ctx.textAlign = 'right';
					}
					else {
						ctx.textAlign = 'center';
					}
					ctx.fillStyle = config.scaleFontColor;
					for (var i = 0; i < data.labels.length; i++){
						ctx.save();
						if (rotateLabels > 0){
							ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
							ctx.rotate(-(rotateLabels * (Math.PI / 180)));
							ctx.fillText(data.labels[i], 0, 0);
							ctx.restore();
						}

						else {
							ctx.fillText(data.labels[i], yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize + 3);
						}

						ctx.beginPath();
						ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);

						//Check i isnt 0, so we dont go over the Y axis twice.
						if (config.scaleShowGridLines && i > 0){
							ctx.lineWidth = config.scaleGridLineWidth;
							ctx.strokeStyle = config.scaleGridLineColor;
							ctx.lineTo(yAxisPosX + i * valueHop, 5);
						}
						else {
							ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
						}
						ctx.stroke();
					}

					//Y axis
					ctx.lineWidth = config.scaleLineWidth;
					ctx.strokeStyle = config.scaleLineColor;
					ctx.beginPath();
					ctx.moveTo(yAxisPosX, xAxisPosY + 5);
					ctx.lineTo(yAxisPosX, 5);
					ctx.stroke();

					ctx.textAlign = 'right';
					ctx.textBaseline = 'middle';
					for (var j = 0; j < calculatedScale.steps; j++){
						ctx.beginPath();
						ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
						if (config.scaleShowGridLines){
							ctx.lineWidth = config.scaleGridLineWidth;
							ctx.strokeStyle = config.scaleGridLineColor;
							ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
						}
						else {
							ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
						}

						ctx.stroke();

						if (config.scaleShowLabels){
							ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
						}
					}
				}

				function calculateXAxisSize(){
					var longestText = 1,
						i = 0,
						len,
						measuredText;

					//if we are showing the labels
					if (config.scaleShowLabels){
						ctx.font = setFont(config.scaleFontStyle, config.scaleFontSize, config.scaleFontFamily);
						for (len = calculatedScale.labels.length; i < len; i++){
							measuredText = ctx.measureText(calculatedScale.labels[i]).width;
							longestText = (measuredText > longestText) ? measuredText : longestText;
						}
						//Add a little extra padding from the y axis
						longestText += 10;
					}
					xAxisLength = width - longestText - widestXLabel;
					valueHop = Math.floor(xAxisLength / (data.labels.length - 1));

					yAxisPosX = width - widestXLabel / 2 - xAxisLength;
					xAxisPosY = scaleHeight + config.scaleFontSize / 2;
				}

				function calculateDrawingSizes(){
					var i = 0,
						len = data.labels.length,
						textLength;

					maxSize = height;

					//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
					ctx.font = setFont(config.scaleFontStyle, config.scaleFontSize, config.scaleFontFamily);

					//todo: sigh, confusing.
					widestXLabel = 1;
					for (; i < len; i++){
						textLength = ctx.measureText(data.labels[i]).width;
						//If the text length is longer - make that equal to longest text!
						widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
					}

					if (width / data.labels.length < widestXLabel){
						rotateLabels = 45;
						if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel){
							rotateLabels = 90;
							maxSize -= widestXLabel;
						}
						else {
							maxSize -= Math.sin(rotateLabels) * widestXLabel;
						}
					}
					else {
						maxSize -= config.scaleFontSize;
					}

					//Add a little padding between the x line and the text
					maxSize -= 5;


					labelHeight = config.scaleFontSize;

					maxSize -= labelHeight;
					//Set 5 pixels greater than the font size to allow for a little padding from the X axis.

					scaleHeight = maxSize;

					//Then get the area above we can safely draw on.

				}

				function getValueBounds(){
					var upperValue = Number.MIN_VALUE;
					var lowerValue = Number.MAX_VALUE;
					for (var i = 0; i < data.datasets.length; i++){
						for (var j = 0; j < data.datasets[i].data.length; j++){
							if (data.datasets[i].data[j] > upperValue){
								upperValue = data.datasets[i].data[j]
							}
							if (data.datasets[i].data[j] < lowerValue){
								lowerValue = data.datasets[i].data[j]
							}
						}
					}

					var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
					var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));

					return {
						maxValue: upperValue,
						minValue: lowerValue,
						maxSteps: maxSteps,
						minSteps: minSteps
					};
				}
			};

			var Bar = function(data, config, ctx){
				var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, barWidth, rotateLabels = 0;

				calculateDrawingSizes();

				valueBounds = getValueBounds();
				//Check and set the scale
				labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : '';
				if (!config.scaleOverride){

					calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString);
				}
				else {
					calculatedScale = {
						steps: config.scaleSteps,
						stepValue: config.scaleStepWidth,
						graphMin: config.scaleStartValue,
						labels: []
					}
					for (var i = 0; i < calculatedScale.steps; i++){
						if (labelTemplateString){
							calculatedScale.labels.push(_.template(labelTemplateString, {value: (config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces(config.scaleStepWidth))}));
						}
					}
				}

				scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
				calculateXAxisSize();
				animationLoop(config, drawScale, drawBars, ctx);

				function drawBars(animPc){
					ctx.lineWidth = config.barStrokeWidth;
					for (var i = 0; i < data.datasets.length; i++){
						ctx.fillStyle = data.datasets[i].fillColor;
						ctx.strokeStyle = data.datasets[i].strokeColor;
						for (var j = 0; j < data.datasets[i].data.length; j++){
							var barOffset = yAxisPosX + config.barValueSpacing + valueHop * j + barWidth * i + config.barDatasetSpacing * i + config.barStrokeWidth * i;

							ctx.beginPath();
							ctx.moveTo(barOffset, xAxisPosY);
							ctx.lineTo(barOffset, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + (config.barStrokeWidth / 2));
							ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + (config.barStrokeWidth / 2));
							ctx.lineTo(barOffset + barWidth, xAxisPosY);
							if (config.barShowStroke){
								ctx.stroke();
							}
							ctx.closePath();
							ctx.fill();
						}
					}

				}

				function drawScale(){
					//X axis line
					ctx.lineWidth = config.scaleLineWidth;
					ctx.strokeStyle = config.scaleLineColor;
					ctx.beginPath();
					ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
					ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
					ctx.stroke();


					if (rotateLabels > 0){
						ctx.save();
						ctx.textAlign = 'right';
					}
					else {
						ctx.textAlign = 'center';
					}
					ctx.fillStyle = config.scaleFontColor;
					for (var i = 0; i < data.labels.length; i++){
						ctx.save();
						if (rotateLabels > 0){
							ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
							ctx.rotate(-(rotateLabels * (Math.PI / 180)));
							ctx.fillText(data.labels[i], 0, 0);
							ctx.restore();
						}

						else {
							ctx.fillText(data.labels[i], yAxisPosX + i * valueHop + valueHop / 2, xAxisPosY + config.scaleFontSize + 3);
						}

						ctx.beginPath();
						ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);

						//Check i isnt 0, so we dont go over the Y axis twice.
						ctx.lineWidth = config.scaleGridLineWidth;
						ctx.strokeStyle = config.scaleGridLineColor;
						ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
						ctx.stroke();
					}

					//Y axis
					ctx.lineWidth = config.scaleLineWidth;
					ctx.strokeStyle = config.scaleLineColor;
					ctx.beginPath();
					ctx.moveTo(yAxisPosX, xAxisPosY + 5);
					ctx.lineTo(yAxisPosX, 5);
					ctx.stroke();

					ctx.textAlign = 'right';
					ctx.textBaseline = 'middle';
					for (var j = 0; j < calculatedScale.steps; j++){
						ctx.beginPath();
						ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
						if (config.scaleShowGridLines){
							ctx.lineWidth = config.scaleGridLineWidth;
							ctx.strokeStyle = config.scaleGridLineColor;
							ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop));
						}
						else {
							ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop));
						}

						ctx.stroke();
						if (config.scaleShowLabels){
							ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop));
						}
					}
				}

				function calculateXAxisSize(){
					var longestText = 1;
					//if we are showing the labels
					if (config.scaleShowLabels){
						ctx.font = config.scaleFontStyle + ' ' + config.scaleFontSize + 'px ' + config.scaleFontFamily;
						for (var i = 0; i < calculatedScale.labels.length; i++){
							var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
							longestText = (measuredText > longestText) ? measuredText : longestText;
						}
						//Add a little extra padding from the y axis
						longestText += 10;
					}
					xAxisLength = width - longestText - widestXLabel;
					valueHop = Math.floor(xAxisLength / (data.labels.length));

					barWidth = (valueHop - config.scaleGridLineWidth * 2 - (config.barValueSpacing * 2) - (config.barDatasetSpacing * data.datasets.length - 1) - ((config.barStrokeWidth / 2) * data.datasets.length - 1)) / data.datasets.length;

					yAxisPosX = width - widestXLabel / 2 - xAxisLength;
					xAxisPosY = scaleHeight + config.scaleFontSize / 2;
				}

				function calculateDrawingSizes(){
					var i = 0,
						len = data.labels.length,
						textLength;

					maxSize = height;

					//Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
					ctx.font = setFont(config.scaleFontStyle, config.scaleFontSize, config.scaleFontFamily);

					widestXLabel = 1;
					for (; i < len; i++){
						textLength = ctx.measureText(data.labels[i]).width;
						//If the text length is longer - make that equal to longest text!
						widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
					}

					if (width / data.labels.length < widestXLabel){
						rotateLabels = 45;
						if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel){
							rotateLabels = 90;
							maxSize -= widestXLabel;
						}
						else {
							maxSize -= Math.sin(rotateLabels) * widestXLabel;
						}
					}
					else {
						maxSize -= config.scaleFontSize;
					}

					//Add a little padding between the x line and the text
					maxSize -= 5;

					labelHeight = config.scaleFontSize;

					maxSize -= labelHeight;
					//Set 5 pixels greater than the font size to allow for a little padding from the X axis.

					scaleHeight = maxSize;

					//Then get the area above we can safely draw on.

				}

				function getValueBounds(){
					var upperValue = Number.MIN_VALUE;
					var lowerValue = Number.MAX_VALUE;
					for (var i = 0; i < data.datasets.length; i++){
						for (var j = 0; j < data.datasets[i].data.length; j++){
							if (data.datasets[i].data[j] > upperValue){
								upperValue = data.datasets[i].data[j]
							}

							if (data.datasets[i].data[j] < lowerValue){
								lowerValue = data.datasets[i].data[j]
							}
						}
					}

					var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
					var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));

					return {
						maxValue: upperValue,
						minValue: lowerValue,
						maxSteps: maxSteps,
						minSteps: minSteps
					};
				}
			}; // Bar

			function calculateOffset(val, calculatedScale, scaleHop){
				var outerValue = calculatedScale.steps * calculatedScale.stepValue;
				var adjustedValue = val - calculatedScale.graphMin;
				var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
				return (scaleHop * calculatedScale.steps) * scalingFactor;
			}

			function animationLoop(config, drawScale, drawData, ctx){
				var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
					easingFunction = animationOptions[config.animationEasing],
					percentAnimComplete = (config.animation) ? 0 : 1;

				if (typeof drawScale !== 'function')
					drawScale = function(){};

				requestAnimFrame(animLoop);

				function animateFrame(){
					var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
					clear(ctx);
					if (config.scaleOverlay){
						drawData(easeAdjustedAnimationPercent);
						drawScale();
					} else {
						drawScale();
						drawData(easeAdjustedAnimationPercent);
					}
				}

				function animLoop(){
					//We need to check if the animation is incomplete (less than 1), or complete (1).
					percentAnimComplete += animFrameAmount;
					animateFrame();
					//Stop the loop continuing forever
					if (percentAnimComplete <= 1){
						requestAnimFrame(animLoop);
					}
					else {
						if (typeof config.onAnimationComplete == 'function') config.onAnimationComplete();
					}

				}
			}

			//Declare global functions to be called within this namespace here.


			// shim layer with setTimeout fallback
			var requestAnimFrame = (function(){
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(callback){
						window.setTimeout(callback, 1000 / 60);
					};
			})();

			function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString){
				var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;

				valueRange = maxValue - minValue;

				rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

				graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

				graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

				graphRange = graphMax - graphMin;

				stepValue = Math.pow(10, rangeOrderOfMagnitude);

				numberOfSteps = Math.round(graphRange / stepValue);

				//Compare number of steps to the max and min for that size graph, and add in half steps if need be.
				while (numberOfSteps < minSteps || numberOfSteps > maxSteps){
					if (numberOfSteps < minSteps){
						stepValue /= 2;
						numberOfSteps = Math.round(graphRange / stepValue);
					}
					else {
						stepValue *= 2;
						numberOfSteps = Math.round(graphRange / stepValue);
					}
				}

				//Create an array of all the labels by interpolating the string.

				var labels = [];

				if (labelTemplateString){
					//Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
					for (var i = 1; i < numberOfSteps + 1; i++){
						labels.push(_.template(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
					}
				}

				return {
					steps: numberOfSteps,
					stepValue: stepValue,
					graphMin: graphMin,
					labels: labels
				};

				function calculateOrderOfMagnitude(val){
					return Math.floor(Math.log(val) / Math.LN10);
				}
			}

			//Max value from array
			function Max(array){
				return Math.max.apply(Math, array);
			}

			//Min value from array
			function Min(array){
				return Math.min.apply(Math, array);
			}

			//Default if undefined
			function Default(userDeclared, valueIfFalse){
				return typeof userDeclared === 'undefined' ? valueIfFalse : userDeclared;
			}

			//Apply cap a value at a high or low number
			function CapValue(valueToCap, maxValue, minValue){
				return (_.isNumber(maxValue) && valueToCap > maxValue)
					? maxValue
					: (_.isNumber(minValue) && valueToCap < minValue)
					? minValue
					:  valueToCap;
			}

			function getDecimalPlaces(num){
				Number(num) !== num && (num = Number(num))
				return (!isNaN(num) && num % 1 !== 0) ? (Number.prototype.toString.call(num)).split('.')[1].length : 0;
			}

			function mergeChartConfig(defaults, userDefined){
				return _.merge(defaults, userDefined);
			}

			function setFont(style, size, family){
				return [style, size + px, family].join(' ');
			}
		};

		return Chart;
	}; // wrap;


	if (typeof define === 'function' && define.amd) {
		// returns an empty module
		define(['./vendor/lodash'], wrap);
	}
	else {
		window.chrt = wrap(window._);
	}
}(this));