"use strict";

Object.defineProperty(Array.prototype, 'concatMap', {
	value: function (callback) {
		let newArray = [];
		for (var item of this) {
			newArray.push(...callback(item));
		}
		return newArray;
	}
});

Object.defineProperty(Array.prototype, 'namedGroup', {
	value: function (group_callback) {
		return this.reduce((groups,x)=>{
			let k = group_callback(x);
			(groups[k]=groups[k]||[]).push(x);
			return groups;
		},{});
	}
});
Object.defineProperty(Array.prototype, 'namedGroupMap', {
	value: function (group_callback) {
		return this.reduce((groups,x)=>{
			let [k,v] = group_callback(x);
			(groups[k]=groups[k]||[]).push(v);
			return groups;
		},{});
	}
});

Object.defineProperty(Array.prototype, 'map_', {
	value: function (callback) {
		this.forEach((v,k)=>this[k]=callback(v));
		return this;
	}
});
Object.defineProperty(Array.prototype, 'any', {
	value: function (f=v=>v) {
		for (let v of this) {
			if (f(v)) return true;
		}
		return false;
	}
});
Object.defineProperty(Array.prototype, 'all', {
	value: function (f=v=>v) {
		for (let v of this) {
			if (!f(v)) return false;
		}
		return true;
	}
});
Object.defineProperty(Array.prototype, 'sum', {
	value: function (f=v=>v) {
		return this.map(f).reduce((a,b)=>a+b,0);
	}
});
Object.defineProperty(Array.prototype, 'head', {
	value: function () {
		return this[0];
	}
});
Object.defineProperty(Array.prototype, 'tail', {
	value: function () {
		return this.slice(1,this.length);
	}
});
Object.defineProperty(Array.prototype, 'last', {
	value: function () {
		return this[this.length-1];
	}
});
Object.defineProperty(Array.prototype, 'init', {
	value: function () {
		return this.slice(0,this.length-1);
	}
});


Object.defineProperty(Object.prototype, 'map', {
	value: function (callback) {
		let n = {};
		for (let [key,item] of Object.entries(this)) {
			n[key] = callback(item,key);
		}
		return n;
	}
});
Object.defineProperty(Object.prototype, 'map_', {
	value: function (callback) {
		for (let [key,item] of Object.entries(this)) {
			this[key] = callback(item,key);
		}
		return this;
	}
});
Object.defineProperty(Object.prototype, 'forEach', {
	value: function (callback) {
		for (let [key,item] of Object.entries(this)) {
			callback(item,key);
		}
	}
});
Object.defineProperty(Object.prototype, 'keyMap', {
	value: function (callback) {
		let n = {};
		for (let [key,item] of Object.entries(this)) {
			n[callback(key)] = item;
		}
		return n;
	}
});
Object.defineProperty(Object.prototype, 'valueMap', {
	value: function (callback) {
		let n = {};
		for (let [key,item] of Object.entries(this)) {
			n[key] = callback(item);
		}
		return n;
	}
});
Object.defineProperty(Object.prototype, 'valueMap_', {
	value: function (callback) {
		for (let [key,item] of Object.entries(this)) {
			this[key] = callback(item);
		}
		return this;
	}
});
Object.defineProperty(Object.prototype, 'keySort', {
	value: function (callback) {
		let n = {};
		for (let key of Object.entries(this).sort(callback)) {
			n[key] = this[key];
		}
		return n;
	}
});
Object.defineProperty(Object.prototype, 'filter', {
	value: function (callback) {
		let n = {};
		for (let [key,item] of Object.entries(this)) {
			if (callback(key, item))
				n[key] = item;
		}
		return n;
	}
});


Object.defineProperty(String.prototype, 'map', {
	value: function (callback) {
		let newString = "";
		for (let item in Object.keys(this)) {
			newString += callback(item);
		}
		return newString;
	}
});
Object.defineProperty(String.prototype, 'concatMap', {
	value: function (callback) {
		let newString = "";
		for (let item in Object.keys(this)) {
			newString += callback(item);
		}
		return newString;
	}
});

Object.defineProperty(Object.prototype, 'pipe', {
	value: function (callback) {
		return callback(this);
	}
});
Object.defineProperty(Object.prototype, 'pipeIf', {
	value: function (cond, t,f=a=>a) {
		return cond?t(this):f(this);
	}
});
Object.defineProperty(Object.prototype, 'modify', {
	value: function (callback) {
		callback(this);
		return this;
	}
});

////Object.defineProperty(Array.prototype, 'groupBy', {
////	value: function (group_callback) {
////		return this.reduce((groups,x)=>{
////			let [k,v] = group_callback(x);
////			(groups[k]=groups[k]||[]).push(v);
////			return groups;
////		},{});
////	}
////});

Object.defineProperty(String.prototype, 'any', {
	value: function (f=v=>v) {
		for (let v of this) {
			if (f(v)) return true;
		}
		return false;
	}
});
Object.defineProperty(String.prototype, 'all', {
	value: function (f=v=>v) {
		for (let v of this) {
			if (!f(v)) return false;
		}
		return true;
	}
});
Object.defineProperty(String.prototype, 'head', {
	value: function (def=undefined) {
		if (this.length>0)
			return this[0];
		return def;
	}
});
Object.defineProperty(String.prototype, 'tail', {
	value: function () {
		return this.slice(1,this.length);
	}
});
Object.defineProperty(String.prototype, 'last', {
	value: function () {
		return this[this.length-1];
	}
});
Object.defineProperty(String.prototype, 'init', {
	value: function () {
		return this.slice(0,this.length-1);
	}
});


Object.defineProperty(String.prototype, 'pipe', {
	value: function (callback) {
		return callback(this);
	}
});
Object.defineProperty(String.prototype, 'pipeIf', {
	value: function (cond, t,f=a=>a) {
		return cond?t(this):f(this);
	}
});

Object.defineProperty(String.prototype, 'chunk', {
	value: function(chunkSize) {
		var R = [];
		for (var i = 0; i < this.length; i += chunkSize)
			R.push(this.slice(i, i + chunkSize));
		return R;
	}
});


function curry(f, ...args) {
	return (...moreArgs)=>f(...args,...moreArgs);
}




function zip(a,b) {
	var c = [];
	for (var i=0; i<Math.max(a.length,b.length); i++){
		c.push([a[i], b[i]]);
	}
	return c;
}

