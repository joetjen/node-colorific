'use strict';

/**
 * Module dependencies;
 */
var _ = require('underscore');

var colorPrint = function(f, s) {
	console.log.apply(this, _.flatten([f(s), _.tail(arguments, 2)]));
};

var using = function(x, f) {
	var p = _.partial(print, x);

	f(p);
};

var module = module || {};

module.exports.print = print;
module.exports.using = using;
