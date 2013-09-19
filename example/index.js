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
 };

using(cc, function(p) {
    p('@red:this is a red string');
    p('a string with @red:red @default:and @blue:blue');
});

// var i = 1000000;
// var t = time(i, function() {
//     cc('this is @magenta:a magenta string @red:red ... @default:default again');
// });

// console.log(t);
// console.log(t/i);
