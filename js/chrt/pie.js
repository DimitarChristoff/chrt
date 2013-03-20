/*jshint evil: false, bitwise:false, strict: true, undef: true, es5:true, white:false, onevar:false, nomen:false, browser:true, plusplus:false */
/*global define, require*/
define([
	'./chrt-new',
	'../vendor/prime',
	'../vendor/lodash'
], function(chrt, prime, _){
	'use strict';

	return prime({

		options: {
			segmentShowStroke: true,
			segmentStrokeColor: '#fff',
			segmentStrokeWidth: 2,
			animation: true,
			animationSteps: 100,
			animationEasing: 'easeOutBounce',
			animateRotate: true,
			animateScale: false,
			labelFontFamily: '\'Arial\'',
			labelFontStyle: 'normal',
			labelFontSize: 12,
			labelFontColor: '#666',
			labelFontAlign: 'middle'
		},

		inherits: chrt,

		render: function(){
			var self = this;

			this.emit('beforerender');
			this.animationLoop(this.options, null, _.bind(this.drawPieSegments, this));
			this.on('animationend', function bound(){
				self.emit('render');
				self.off('animationend', bound);
			})
		},


		drawPieSegments: function(animationDecimal){
			var cumulativeAngle = -Math.PI / 2,
				scaleAnimation = 1,
				rotateAnimation = 1,
				i = 0,
				data = this.data,
				len = data.length,
				segmentTotal = 0,
				segmentAngle,
				ctx = this.ctx,
				width = this.width,
				height = this.height,
			//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
				pieRadius = this.Min([height / 2, width / 2]) - 5,
				labels = [];

			if (this.options.animation){
				if (this.options.animateScale){
					scaleAnimation = animationDecimal;
				}
				if (this.options.animateRotate){
					rotateAnimation = animationDecimal;
				}
			}

			for (; i < len; i++){
				segmentTotal += data[i].value;

				if (data[i].label){
					labels.push({
						'label': data[i].label,
						start: segmentTotal - data[i].value,
						end: segmentTotal
					});
				}
			}

			this.setFont(this.options.labelFontStyle, this.options.labelFontSize, this.options.labelFontFamily);
			ctx.textBaseline = this.options.labelFontAlign;


			for (i = 0; i < len; i++){
				segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
				ctx.lineTo(width / 2, height / 2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

				if (data[i].label && scaleAnimation * pieRadius * 2 * segmentAngle / (2 * Math.PI) > this.options.labelFontSize){
					ctx.fillStyle = data[i].labelColor || this.options.labelFontColor;
					var textRotation = -(cumulativeAngle + segmentAngle) + segmentAngle / 2,
						tX = width / 2 + scaleAnimation * pieRadius * Math.cos(textRotation) - 10,
						tY = height / 2 - scaleAnimation * pieRadius * Math.sin(textRotation);

					ctx.textAlign = 'right';
					if (textRotation < -Math.PI / 2){
						textRotation -= Math.PI;
						ctx.textAlign = 'left';
						tX += 20;
					}
					ctx.translate(tX, tY);
					ctx.rotate(-textRotation);
					ctx.fillText(data[i].label, 0, 0);
					ctx.rotate(textRotation);
					ctx.translate(-tX, -tY);
				}

				if (this.options.segmentShowStroke){
					ctx.lineWidth = this.options.segmentStrokeWidth;
					ctx.strokeStyle = this.options.segmentStrokeColor;
					ctx.stroke();
				}

				cumulativeAngle += segmentAngle;
			}
		}

	});

});
