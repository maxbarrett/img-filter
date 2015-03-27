(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var filters = require('./filters.js');
var source = document.getElementById('source');
var canvas = document.getElementById('target');

var init = function(filter){
	
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

var saveFile = function(filter){
	var dataURL = canvas.toDataURL(); // save canvas image as data url
	var link = document.getElementById('download');

	link.href = dataURL; // set link href to save as png
	link.download = filter + '.png'; // set download filename
}

exports.filter = init;
},{"./filters.js":2}],2:[function(require,module,exports){
'use strict';

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

exports.processBW = processBW;
exports.processSepia = processSepia;
},{}],3:[function(require,module,exports){
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

},{"./apply-filter.js":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHBseS1maWx0ZXIuanMiLCJqcy9maWx0ZXJzLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZpbHRlcnMgPSByZXF1aXJlKCcuL2ZpbHRlcnMuanMnKTtcbnZhciBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlJyk7XG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhcmdldCcpO1xuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKGZpbHRlcil7XG5cdFxuXHRpZiAoIWNhbnZhcy5nZXRDb250ZXh0KSB7XG5cdFx0bG9nLmlubmVySFRNTCA9ICdDYW52YXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIGluc3RhbGwgYSBIVE1MNSBjb21wYXRpYmxlIGJyb3dzZXIuJztcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvL3ZhciBzdGFydCA9IG5ldyBEYXRlKCk7XG5cblx0Y2FudmFzLndpZHRoID0gc291cmNlLmNsaWVudFdpZHRoO1xuXHRjYW52YXMuaGVpZ2h0ID0gc291cmNlLmNsaWVudEhlaWdodDtcblxuXHR2YXIgdGVtcENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0dGVtcENvbnRleHQuZHJhd0ltYWdlKHNvdXJjZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTsgLy8gY29weSBpbWFnZSBpbnRvIGNhbnZhc1xuXHRcblx0dmFyIGxlbiA9IGNhbnZhcy53aWR0aCAqIGNhbnZhcy5oZWlnaHQgKiA0OyAvLyBudW1iZXIgaXRlbXMgaW4gYmluYXJ5RGF0YSBhcnJheTogNHggY2FudmFzIHBpeGVscyBcblx0dmFyIGNhbnZhc0RhdGEgPSB0ZW1wQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0dmFyIGZpbHRlciA9IChmaWx0ZXIgPT09ICdzZXBpYScpID8gJ3Byb2Nlc3NTZXBpYScgOiAncHJvY2Vzc0JXJzsgLy8gY2hvb3NlIGZpbHRlclxuXG5cdGZpbHRlcnNbZmlsdGVyXShjYW52YXNEYXRhLmRhdGEsIGxlbik7IC8vIGNvbnZlcnQgY2FudmFzIGJpbmFyeSBkYXRhIGJ5IGFwcGx5aW5nIGZpbHRlclxuXG5cdHRlbXBDb250ZXh0LnB1dEltYWdlRGF0YShjYW52YXNEYXRhLCAwLCAwKTsgLy8gcHV0IGNvbnZlcnRlZCBiaW5hcnkgZGF0YSBpbnRvIGNhbnZhc1xuXG5cdC8vdmFyIGRpZmYgPSBuZXcgRGF0ZSgpIC0gc3RhcnQ7XG5cdC8vbG9nLmlubmVySFRNTCA9ICdQcm9jZXNzIGRvbmUgaW4gJyArIGRpZmYgKyAnIG1zJztcblxuXHRzYXZlRmlsZShmaWx0ZXIpO1xufVxuXG52YXIgc2F2ZUZpbGUgPSBmdW5jdGlvbihmaWx0ZXIpe1xuXHR2YXIgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gc2F2ZSBjYW52YXMgaW1hZ2UgYXMgZGF0YSB1cmxcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bmxvYWQnKTtcblxuXHRsaW5rLmhyZWYgPSBkYXRhVVJMOyAvLyBzZXQgbGluayBocmVmIHRvIHNhdmUgYXMgcG5nXG5cdGxpbmsuZG93bmxvYWQgPSBmaWx0ZXIgKyAnLnBuZyc7IC8vIHNldCBkb3dubG9hZCBmaWxlbmFtZVxufVxuXG5leHBvcnRzLmZpbHRlciA9IGluaXQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gbm9pc2UoKSB7XHJcblx0Ly9SZXR1cm5zIGEgdmFsdWUgYmV0d2VlbiAwLjUgYW5kIDFcclxuXHRyZXR1cm4gTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNsYW1wKGNvbXBvbmVudCkge1xyXG5cdHJldHVybiBNYXRoLm1heChNYXRoLm1pbigyNTUsIGNvbXBvbmVudCksIDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xvckRpc3RhbmNlKHNjYWxlLCBkZXN0LCBzcmMpIHtcclxuXHQvLyByZXR1cm5zIGEgcmVkLCBibHVlIG9yIGdyZWVuIHZhbHVlIGZvciB0aGUgJ3NlcGlhJyBwaXhlbFxyXG5cdC8vIHdoaWNoIGlzIGEgd2VpZ2h0ZWQgYXZlcmFnZSBvZiB0aGUgb3JpZ2luYWwgdmFsdWUgYW5kIHRoZSBjYWxjdWxhdGVkIHZhbHVlXHJcblx0cmV0dXJuIGNsYW1wKHNjYWxlICogZGVzdCArICgxIC0gc2NhbGUpICogc3JjKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NCVyhiaW5hcnlEYXRhLCBsKSB7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcclxuXHRcdHZhciByID0gYmluYXJ5RGF0YVtpXTtcclxuXHRcdHZhciBnID0gYmluYXJ5RGF0YVtpICsgMV07XHJcblx0XHR2YXIgYiA9IGJpbmFyeURhdGFbaSArIDJdO1xyXG5cdFx0dmFyIGx1bWluYW5jZSA9IHIgKiAwLjIxICsgZyAqIDAuNzEgKyBiICogMC4wNztcclxuXHRcdGJpbmFyeURhdGFbaV0gPSBsdW1pbmFuY2U7XHJcblx0XHRiaW5hcnlEYXRhW2kgKyAxXSA9IGx1bWluYW5jZTtcclxuXHRcdGJpbmFyeURhdGFbaSArIDJdID0gbHVtaW5hbmNlO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NTZXBpYShiaW5hcnlEYXRhLCBsKSB7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcclxuXHRcdHZhciByID0gYmluYXJ5RGF0YVtpXTtcclxuXHRcdHZhciBnID0gYmluYXJ5RGF0YVtpICsgMV07XHJcblx0XHR2YXIgYiA9IGJpbmFyeURhdGFbaSArIDJdO1xyXG5cclxuXHRcdGJpbmFyeURhdGFbaV0gPSBjb2xvckRpc3RhbmNlKG5vaXNlKCksIChyICogMC4zOTMpICsgKGcgKiAwLjc2OSkgKyAoYiAqIDAuMTg5KSwgcik7XHJcblx0XHRiaW5hcnlEYXRhW2kgKyAxXSA9IGNvbG9yRGlzdGFuY2Uobm9pc2UoKSwgKHIgKiAwLjM0OSkgKyAoZyAqIDAuNjg2KSArIChiICogMC4xNjgpLCBnKTtcclxuXHRcdGJpbmFyeURhdGFbaSArIDJdID0gY29sb3JEaXN0YW5jZShub2lzZSgpLCAociAqIDAuMjcyKSArIChnICogMC41MzQpICsgKGIgKiAwLjEzMSksIGIpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydHMucHJvY2Vzc0JXID0gcHJvY2Vzc0JXO1xyXG5leHBvcnRzLnByb2Nlc3NTZXBpYSA9IHByb2Nlc3NTZXBpYTsiLCIoZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0XG5cdHZhciAkID0gZnVuY3Rpb24oZWwpeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCk7IH1cblx0dmFyIGltYWdlID0gcmVxdWlyZSgnLi9hcHBseS1maWx0ZXIuanMnKTtcblx0dmFyIGJ1dHRvbiA9ICQoJyNhcHBseWZpbHRlcicpWzBdO1xuXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBpbnB1dHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkKCdpbnB1dCcpKTtcblx0XHR2YXIgY2hlY2tlZCA9IGlucHV0cy5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRyZXR1cm4gaXRlbS5jaGVja2VkO1xuXHRcdH0pO1xuXG5cdFx0aW1hZ2UuZmlsdGVyKGNoZWNrZWRbMF0udmFsdWUpO1xuXHR9KTtcblxufSkoKTtcbiJdfQ==
