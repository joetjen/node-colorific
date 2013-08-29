'use strict';

/**
 * Module dependencies.
 */
var cc = require('../src');

var helper = require('./helper');

var using = helper.using;

using(cc, function(p) {
	p('@black:a black string');
	p('@red:a red string');
	p('@green:a green string');
	p('@yellow:a yellow string');
});
