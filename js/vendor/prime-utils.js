/*jshint evil: false, bitwise:false, strict: true, undef: true, es5:true, white:false, onevar:false, nomen:false, browser:true, plusplus:false */
/*global define, require*/

define([
	'./prime',
	'./lodash'
], function(prime, _){
	'use strict';


	return {
		options: prime({
			setOptions: function(options){
				var args = [{}, this.options];
				args.push.apply(args, arguments);
				this.options = _.extend.apply(null, args);
				return this;
			}
		}),
		parent: prime({
			parent: function(method){
				var parent = this._parent || this.constructor.parent;
				this._parent = parent.constructor.parent;
				var result = parent[method].apply(this, slice.call(arguments, 1));
				this._parent = parent;
				return result;
			}
		})
	};
});