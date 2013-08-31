/**
 * Module dependencies
 */

var _      = require('underscore');
var helper = require('./helper');
var cc     = require('../src');

/**
 * Shortcuts
 */

var using = helper.using;

/**
 * Main
 */

 var time = function(repeat, f) {
    var s = new Date();
    for (var i = 0; i < repeat; ++i) f();
    var e = new Date();
    return e.getTime() - s.getTime();
 }

using(cc, function(p) {
    p('this is @black:a black string');
    p('this is @red:a red string');
    p('this is @green:a green string');
    p('this is @yellow:a yellow string');
    p('this is @magenta:a magenta string @red:red ... @default:default again');
});

var t = time(1000000, function() {
    cc('this is @magenta:a magenta string @red:red ... @default:default again');
});

console.log(t);