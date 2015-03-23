(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/MaxBarrett/Dev/img-filter/js/apply-filter.js":[function(require,module,exports){
module.exports = (function(filter) {

	var filters = require('./filters.js');
	var source = document.getElementById('source');
	var canvas = document.getElementById('target');

	function init(filter){
		
		if (!canvas.getContext) {
			log.innerHTML = 'Canvas not supported. Please install a HTML5 compatible browser.';
			return;
		}

		//var start = new Date();

		canvas.width = source.clientWidth;
		canvas.height = source.clientHeight;

		var tempContext = canvas.getContext('2d');
		tempContext.drawImage(source, 0, 0, canvas.width, canvas.height); // copy image into canvas
		
		var len = canvas.width * canvas.height * 4; // number items in binaryData array: 4x canvas pixels 
		var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
		var filter = (filter === 'sepia') ? 'processSepia' : 'processBW'; // choose filter

		filters[filter](canvasData.data, len); // convert canvas binary data by applying filter

		tempContext.putImageData(canvasData, 0, 0); // put converted binary data into canvas

		//var diff = new Date() - start;
		//log.innerHTML = 'Process done in ' + diff + ' ms';

		saveFile(filter);
	}

	function saveFile(filter){
		var dataURL = canvas.toDataURL(); // save canvas image as data url
		var link = document.getElementById('download');

		link.href = dataURL; // set link href to save as png
		link.download = filter + '.png'; // set download filename
	}

	return { filter : init };

})();
},{"./filters.js":"/Users/MaxBarrett/Dev/img-filter/js/filters.js"}],"/Users/MaxBarrett/Dev/img-filter/js/filters.js":[function(require,module,exports){
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
	'use strict';
	
	var $ = function(el){ return document.querySelectorAll(el); }
	var image = require('./apply-filter.js');
	var button = $('#applyfilter')[0];

	button.addEventListener('click', function(e){
		e.preventDefault();

		var inputs = Array.prototype.slice.call($('input'));
		var checked = inputs.filter(function(item){
			return item.checked;
		});

		image.filter(checked[0].value);
	});

})();

},{"./apply-filter.js":"/Users/MaxBarrett/Dev/img-filter/js/apply-filter.js"}]},{},["/Users/MaxBarrett/Dev/img-filter/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHBseS1maWx0ZXIuanMiLCJqcy9maWx0ZXJzLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKGZpbHRlcikge1xuXG5cdHZhciBmaWx0ZXJzID0gcmVxdWlyZSgnLi9maWx0ZXJzLmpzJyk7XG5cdHZhciBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlJyk7XG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZ2V0Jyk7XG5cblx0ZnVuY3Rpb24gaW5pdChmaWx0ZXIpe1xuXHRcdFxuXHRcdGlmICghY2FudmFzLmdldENvbnRleHQpIHtcblx0XHRcdGxvZy5pbm5lckhUTUwgPSAnQ2FudmFzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSBpbnN0YWxsIGEgSFRNTDUgY29tcGF0aWJsZSBicm93c2VyLic7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly92YXIgc3RhcnQgPSBuZXcgRGF0ZSgpO1xuXG5cdFx0Y2FudmFzLndpZHRoID0gc291cmNlLmNsaWVudFdpZHRoO1xuXHRcdGNhbnZhcy5oZWlnaHQgPSBzb3VyY2UuY2xpZW50SGVpZ2h0O1xuXG5cdFx0dmFyIHRlbXBDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGVtcENvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTsgLy8gY29weSBpbWFnZSBpbnRvIGNhbnZhc1xuXHRcdFxuXHRcdHZhciBsZW4gPSBjYW52YXMud2lkdGggKiBjYW52YXMuaGVpZ2h0ICogNDsgLy8gbnVtYmVyIGl0ZW1zIGluIGJpbmFyeURhdGEgYXJyYXk6IDR4IGNhbnZhcyBwaXhlbHMgXG5cdFx0dmFyIGNhbnZhc0RhdGEgPSB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHR2YXIgZmlsdGVyID0gKGZpbHRlciA9PT0gJ3NlcGlhJykgPyAncHJvY2Vzc1NlcGlhJyA6ICdwcm9jZXNzQlcnOyAvLyBjaG9vc2UgZmlsdGVyXG5cblx0XHRmaWx0ZXJzW2ZpbHRlcl0oY2FudmFzRGF0YS5kYXRhLCBsZW4pOyAvLyBjb252ZXJ0IGNhbnZhcyBiaW5hcnkgZGF0YSBieSBhcHBseWluZyBmaWx0ZXJcblxuXHRcdHRlbXBDb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTsgLy8gcHV0IGNvbnZlcnRlZCBiaW5hcnkgZGF0YSBpbnRvIGNhbnZhc1xuXG5cdFx0Ly92YXIgZGlmZiA9IG5ldyBEYXRlKCkgLSBzdGFydDtcblx0XHQvL2xvZy5pbm5lckhUTUwgPSAnUHJvY2VzcyBkb25lIGluICcgKyBkaWZmICsgJyBtcyc7XG5cblx0XHRzYXZlRmlsZShmaWx0ZXIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2F2ZUZpbGUoZmlsdGVyKXtcblx0XHR2YXIgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gc2F2ZSBjYW52YXMgaW1hZ2UgYXMgZGF0YSB1cmxcblx0XHR2YXIgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3dubG9hZCcpO1xuXG5cdFx0bGluay5ocmVmID0gZGF0YVVSTDsgLy8gc2V0IGxpbmsgaHJlZiB0byBzYXZlIGFzIHBuZ1xuXHRcdGxpbmsuZG93bmxvYWQgPSBmaWx0ZXIgKyAnLnBuZyc7IC8vIHNldCBkb3dubG9hZCBmaWxlbmFtZVxuXHR9XG5cblx0cmV0dXJuIHsgZmlsdGVyIDogaW5pdCB9O1xuXG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRmdW5jdGlvbiBub2lzZSgpIHtcclxuXHRcdC8vUmV0dXJucyBhIHZhbHVlIGJldHdlZW4gMC41IGFuZCAxXHJcblx0XHRyZXR1cm4gTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNTtcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiBjbGFtcChjb21wb25lbnQpIHtcclxuXHRcdHJldHVybiBNYXRoLm1heChNYXRoLm1pbigyNTUsIGNvbXBvbmVudCksIDApO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29sb3JEaXN0YW5jZShzY2FsZSwgZGVzdCwgc3JjKSB7XHJcblx0XHQvLyByZXR1cm5zIGEgcmVkLCBibHVlIG9yIGdyZWVuIHZhbHVlIGZvciB0aGUgJ3NlcGlhJyBwaXhlbFxyXG4gICAgXHQvLyB3aGljaCBpcyBhIHdlaWdodGVkIGF2ZXJhZ2Ugb2YgdGhlIG9yaWdpbmFsIHZhbHVlIGFuZCB0aGUgY2FsY3VsYXRlZCB2YWx1ZVxyXG5cdFx0cmV0dXJuIGNsYW1wKHNjYWxlICogZGVzdCArICgxIC0gc2NhbGUpICogc3JjKTtcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiBwcm9jZXNzQlcoYmluYXJ5RGF0YSwgbCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcclxuXHRcdFx0dmFyIHIgPSBiaW5hcnlEYXRhW2ldO1xyXG5cdFx0XHR2YXIgZyA9IGJpbmFyeURhdGFbaSArIDFdO1xyXG5cdFx0XHR2YXIgYiA9IGJpbmFyeURhdGFbaSArIDJdO1xyXG5cdFx0XHR2YXIgbHVtaW5hbmNlID0gciAqIDAuMjEgKyBnICogMC43MSArIGIgKiAwLjA3O1xyXG5cdFx0XHRiaW5hcnlEYXRhW2ldID0gbHVtaW5hbmNlO1xyXG5cdFx0XHRiaW5hcnlEYXRhW2kgKyAxXSA9IGx1bWluYW5jZTtcclxuXHRcdFx0YmluYXJ5RGF0YVtpICsgMl0gPSBsdW1pbmFuY2U7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0ZnVuY3Rpb24gcHJvY2Vzc1NlcGlhKGJpbmFyeURhdGEsIGwpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSArPSA0KSB7XHJcblx0XHRcdHZhciByID0gYmluYXJ5RGF0YVtpXTtcclxuXHRcdFx0dmFyIGcgPSBiaW5hcnlEYXRhW2kgKyAxXTtcclxuXHRcdFx0dmFyIGIgPSBiaW5hcnlEYXRhW2kgKyAyXTtcclxuXHJcblx0XHRcdGJpbmFyeURhdGFbaV0gPSBjb2xvckRpc3RhbmNlKG5vaXNlKCksIChyICogMC4zOTMpICsgKGcgKiAwLjc2OSkgKyAoYiAqIDAuMTg5KSwgcik7XHJcblx0XHRcdGJpbmFyeURhdGFbaSArIDFdID0gY29sb3JEaXN0YW5jZShub2lzZSgpLCAociAqIDAuMzQ5KSArIChnICogMC42ODYpICsgKGIgKiAwLjE2OCksIGcpO1xyXG5cdFx0XHRiaW5hcnlEYXRhW2kgKyAyXSA9IGNvbG9yRGlzdGFuY2Uobm9pc2UoKSwgKHIgKiAwLjI3MikgKyAoZyAqIDAuNTM0KSArIChiICogMC4xMzEpLCBiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0cHJvY2Vzc0JXIDogcHJvY2Vzc0JXLFxyXG5cdFx0cHJvY2Vzc1NlcGlhIDogcHJvY2Vzc1NlcGlhXHJcblx0fVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0XG5cdHZhciAkID0gZnVuY3Rpb24oZWwpeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCk7IH1cblx0dmFyIGltYWdlID0gcmVxdWlyZSgnLi9hcHBseS1maWx0ZXIuanMnKTtcblx0dmFyIGJ1dHRvbiA9ICQoJyNhcHBseWZpbHRlcicpWzBdO1xuXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBpbnB1dHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkKCdpbnB1dCcpKTtcblx0XHR2YXIgY2hlY2tlZCA9IGlucHV0cy5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRyZXR1cm4gaXRlbS5jaGVja2VkO1xuXHRcdH0pO1xuXG5cdFx0aW1hZ2UuZmlsdGVyKGNoZWNrZWRbMF0udmFsdWUpO1xuXHR9KTtcblxufSkoKTtcbiJdfQ==
