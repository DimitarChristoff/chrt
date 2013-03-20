define([
	// shared / common
	'../vendor/prime',
	'../vendor/emitter',
	'../vendor/lodash',
	'../vendor/prime-utils',
	// '../vendor/kinetic',
	// charting chrt and components
	'./easing'
], function(prime, emitter, _, utils, /* Kinetic,*/ easing){

	// shared / reusable bits.

	// common strings
	var center = 'center',
		right = 'right',
		left = 'left',
		middle = 'middle',
		px = 'px';

	// main
	var chrt = prime({

		options: {
			data: []
		},

		constructor: function(options){
			this.setOptions(options);
			this.ctx = this.options.element.getContext('2d');
			this.data = this.options.data;

			this.width = this.ctx.canvas.width;
			this.height = this.ctx.canvas.height;

			this.retinaDisplay();

			this.emit('ready');
		},

		render: function(){
			throw('no chart type loaded, cannot render');
		},

		retinaDisplay: function(){
			//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			if (window.devicePixelRatio){
				this.isRetina = true;

				this.ctx.canvas.style.width = this.width + px;
				this.ctx.canvas.style.height = this.height + px;
				this.ctx.canvas.height = this.height * window.devicePixelRatio;
				this.ctx.canvas.width = this.width * window.devicePixelRatio;
				this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}
		},



		////////////////////////////////////////////////////////////////////
		// common utility methods

		requestAnimFrame: (function(){
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback){
					window.setTimeout(callback, 1000 / 60);
				};
		}()).bind(window),

		clear: function(){
			this.ctx.clearRect(0, 0, this.width, this.height);
		},

		animationLoop: function(config, drawScale, drawData){
			var animFrameAmount = (config.animation) ? 1 / this.CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
				easingFunction = easing[config.animationEasing],
				percentAnimComplete = (config.animation) ? 0 : 1,
				self = this;

			if (typeof drawScale !== 'function')
				drawScale = function(){};

			this.requestAnimFrame(animLoop);

			function animateFrame(){
				var easeAdjustedAnimationPercent = (config.animation) ? self.CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
				self.clear();

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
					self.requestAnimFrame(animLoop);
				}
				else {
					// done.
					self.emit('animationend');
				}

			}
		},

		Max: function(array){
			// Max value from array
			return Math.max.apply(Math, array);
		},

		Min: function(array){
			// Min value from array
			return Math.min.apply(Math, array);
		},

		Default: function(userDeclared, valueIfFalse){
			// Default if undefined
			return typeof userDeclared === 'undefined' ? valueIfFalse : userDeclared;
		},

		CapValue: function(valueToCap, maxValue, minValue){
			// Apply cap a value at a high or low number
			return (_.isNumber(maxValue) && valueToCap > maxValue)
				? maxValue
				: (_.isNumber(minValue) && valueToCap < minValue)
				? minValue
				:  valueToCap;
		},

		getDecimalPlaces: function(num){
			Number(num) !== num && (num = Number(num))
			return (!isNaN(num) && num % 1 !== 0) ? (Number.prototype.toString.call(num)).split('.')[1].length : 0;
		},

		setFont: function(style, size, family){
			this.ctx.font = [style, size + px, family].join(' ');
			return this;
		}

	});

	// mixins
	chrt.implement(new emitter);
	chrt.implement(new utils.options);

	chrt.define('data', {
		set: function(value){
			this._data = value;
			this.emit('data');
		},
		get: function(){
			return this._data;
		}
	});

	return chrt;
});