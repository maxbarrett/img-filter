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
