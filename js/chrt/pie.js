/*jshint evil: false, bitwise:false, strict: true, undef: true, es5:true, white:false, onevar:false, nomen:false, browser:true, plusplus:false */
/*global define, require*/
define([
	'./chrt-new',
	'../vendor/prime'
],function(chrt, prime){
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
			onAnimationComplete: null
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
				pieRadius = this.Min([height / 2, width / 2]) - 5;

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
			}

			for (i = 0; i < len; i++){
				segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
				ctx.lineTo(width / 2, height / 2);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

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