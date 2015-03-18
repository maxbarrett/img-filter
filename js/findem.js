(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MaxBarrett/Dev/img-filter/js/filters.js":[function(require,module,exports){
module.exports = (function() {

	function noise() {
		return Math.random() * 0.5 + 0.5;
	};

	function clamp(component) {
		return Math.max(Math.min(255, component), 0);
	}

	function colorDistance(scale, dest, src) {
		return clamp(scale * dest + (1 - scale) * src);
	};

	function processBW(binaryData, l) {
		for (var i = 0; i < l; i += 4) {
			var r = binaryData[i];
			var g = binaryData[i + 1];
			var b = binaryData[i + 2];
			var luminance = r * 0.21 + g * 0.71 + b * 0.07;
			binaryData[i] = luminance;
			binaryData[i + 1] = luminance;
			binaryData[i + 2] = luminance;
		}
	};

	function processSepia(binaryData, l) {
		for (var i = 0; i < l; i += 4) {
			var r = binaryData[i];
			var g = binaryData[i + 1];
			var b = binaryData[i + 2];

			binaryData[i] = colorDistance(noise(), (r * 0.393) + (g * 0.769) + (b * 0.189), r);
			binaryData[i + 1] = colorDistance(noise(), (r * 0.349) + (g * 0.686) + (b * 0.168), g);
			binaryData[i + 2] = colorDistance(noise(), (r * 0.272) + (g * 0.534) + (b * 0.131), b);
		}
	};

	return {
		processBW : processBW,
		processSepia : processSepia
	}

})();
},{}],"/Users/MaxBarrett/Dev/img-filter/js/main.js":[function(require,module,exports){
(function() {
	"use strict";
	
	var filters = require('./filters.js');
	var source = document.getElementById("source");

	source.onload = function() {
		var start = new Date();

		var canvas = document.getElementById("target");
		canvas.width = source.clientWidth;
		canvas.height = source.clientHeight;

		if (!canvas.getContext) {
			log.innerHTML = "Canvas not supported. Please install a HTML5 compatible browser.";
			return;
		}

		var tempContext = canvas.getContext("2d");
		var len = canvas.width * canvas.height * 4;

		tempContext.drawImage(source, 0, 0, canvas.width, canvas.height);

		var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
		var binaryData = canvasData.data;
		filters.processSepia(binaryData, len);

		tempContext.putImageData(canvasData, 0, 0);
		var diff = new Date() - start;
		log.innerHTML = "Process done in " + diff + " ms";
	};

	source.src = "img/mop.jpg";
})();

},{"./filters.js":"/Users/MaxBarrett/Dev/img-filter/js/filters.js"}]},{},["/Users/MaxBarrett/Dev/img-filter/js/main.js"]);
