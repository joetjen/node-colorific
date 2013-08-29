'use strict';

/**
 * Module dependencies.
 */

var colorific = function(string) {
	return string
		.replace(/@black:(.*)$/g,  '\x1b[30m$1\x1b[39m')
		.replace(/@red:(.*)$/g,    '\x1b[31m$1\x1b[39m')
		.replace(/@green:(.*)$/g,  '\x1b[32m$1\x1b[39m')
		.replace(/@yellow:(.*)$/g, '\x1b[33m$1\x1b[39m')
		.replace(/@blue:(.*)$/g,   '\x1b[34m$1\x1b[39m');
};

module.exports = colorific;
