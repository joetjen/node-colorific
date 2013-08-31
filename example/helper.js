/**
 * Module dependencies
 */

var _    = require('underscore');
var util = require('util');

var log    = console.log;
var format = util.format;

var VERBOSE = true;

/**
 * Functions
 */

var colorPrint = function(f, s) {
    var x = format.apply(this, _.flatten([s, _.rest(arguments, 2)]));
    var y = f(x)
    if (VERBOSE) {
        log('s   ', [s]);
        log('x   ', [x]);
        log('f(x)', [y]);
        log('       ', y);
        log('');
    }
    else {
        log(y);
    }
};

/**
 * Exports
 */

var using = module.exports.using = function(x, f) {
    var p = _.partial(colorPrint, x);
    f(p);
};
