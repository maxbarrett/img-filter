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
