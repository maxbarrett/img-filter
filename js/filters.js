﻿'use strict';

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