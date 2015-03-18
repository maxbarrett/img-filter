(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MaxBarrett/Dev/img-filter/js/filters.js":[function(require,module,exports){
module.exports = (function() {

	function noise() {
		//Returns a value between 0.5 and 1
		return Math.random() * 0.5 + 0.5;
	};

	function clamp(component) {
		return Math.max(Math.min(255, component), 0);
	}

	function colorDistance(scale, dest, src) {
		// returns a red, blue or green value for the 'sepia' pixel
    	// which is a weighted average of the original value and the calculated value
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

		// We use var start at the beginning of the code and stop at the end to measure turnaround time
		var start = new Date();

		var canvas = document.getElementById("target");
		canvas.width = source.clientWidth;
		canvas.height = source.clientHeight;

		// Testing canvas support
		if (!canvas.getContext) {
			log.innerHTML = "Canvas not supported. Please install a HTML5 compatible browser.";
			return;
		}

		var tempContext = canvas.getContext("2d");
		// len is the number of items in the binaryData array
        // it is 4 times the number of pixels in the canvas object
		var len = canvas.width * canvas.height * 4;

		tempContext.drawImage(source, 0, 0, canvas.width, canvas.height);

		var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
		var binaryData = canvasData.data;

		// run the filter
		filters.processSepia(binaryData, len);

		tempContext.putImageData(canvasData, 0, 0);
		var diff = new Date() - start;
		log.innerHTML = "Process done in " + diff + " ms";

		// save canvas image as data url (png format by default)
      	var dataURL = canvas.toDataURL();

      	// set download link href to dataURL so it can be saved
      	document.getElementById('download').href = dataURL;
	};

	source.src = "img/lik.jpg";
})();

},{"./filters.js":"/Users/MaxBarrett/Dev/img-filter/js/filters.js"}]},{},["/Users/MaxBarrett/Dev/img-filter/js/main.js"]);
