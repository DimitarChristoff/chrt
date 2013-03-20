define(function(){
	'use strict';
	var has = function(self, key){
		return Object.hasOwnProperty.call(self, key);
	};
	var each = function(object, method, context){
		for (var key in object)
			if (method.call(context, object[key], key, object) === false)
				break;
		return object;
	};
	if (!{ valueOf: 0 }.propertyIsEnumerable('valueOf')){
		var buggy = 'constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString'.split(',');
		var proto = Object.prototype;
		each = function(object, method, context){
			for (var key in object)
				if (method.call(context, object[key], key, object) === false)
					return object;
			for (var i = 0; key = buggy[i]; i++){
				var value = object[key];
				if ((value !== proto[key] || has(object, key)) && method.call(context, value, key, object) === false)
					break;
			}
			return object;
		};
	}
	var create = Object.create || function(self){
		var constructor = function(){
		};
		constructor.prototype = self;
		return new constructor();
	};
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var define = Object.defineProperty;
	try {
		var obj = { a: 1 };
		getOwnPropertyDescriptor(obj, 'a');
		define(obj, 'a', { value: 2 });
	} catch (e) {
		getOwnPropertyDescriptor = function(object, key){
			return { value: object[key] };
		};
		define = function(object, key, descriptor){
			object[key] = descriptor.value;
			return object;
		};
	}
	var implement = function(proto){
		each(proto, function(value, key){
			if (key !== 'constructor' && key !== 'define' && key !== 'inherits')
				this.define(key, getOwnPropertyDescriptor(proto, key) || {
					writable: true,
					enumerable: true,
					configurable: true,
					value: value
				});
		}, this);
		return this;
	};
	var prime = function(proto){
		var superprime = proto.inherits;
		var constructor = has(proto, 'constructor') ? proto.constructor : superprime ? function(){
			return superprime.apply(this, arguments);
		} : function(){
		};
		if (superprime){
			var superproto = superprime.prototype;
			var cproto = constructor.prototype = create(superproto);
			constructor.parent = superproto;
			cproto.constructor = constructor;
		}
		constructor.define = proto.define || superprime && superprime.define || function(key, descriptor){
			define(this.prototype, key, descriptor);
			return this;
		};
		constructor.implement = implement;
		return constructor.implement(proto);
	};
	prime.has = has;
	prime.each = each;
	prime.create = create;
	prime.define = define;
	return prime;
});