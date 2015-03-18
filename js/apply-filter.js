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