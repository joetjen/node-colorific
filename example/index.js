/**
 * Module dependencies
 */

var _ = require('underscore');
var helper = require('./helper');
var cc = require('../lib');

/**
 * Shortcuts
 */

var using = helper.using;

/**
 * Main
 */

var time = function (repeat, f) {
  var s = new Date();
  for (var i = 0; i < repeat; ++i) {
    f();
  }
  var e = new Date();
  return e.getTime() - s.getTime();
};

using(cc, function (p) {
  var x;

  x = ' Aa Bb Cc Dd  ' + '@blackBg: Aa Bb Cc Dd @defaultBg: ' + '@redBg: Aa Bb Cc Dd @defaultBg: ' + '@greenBg: Aa Bb Cc Dd @defaultBg: ' + '@yellowBg: Aa Bb Cc Dd @defaultBg: ' + '@blueBg: Aa Bb Cc Dd @defaultBg: ' + '@magentaBg: Aa Bb Cc Dd @defaultBg: ' + '@cyanBg: Aa Bb Cc Dd @defaultBg: ' + '@whiteBg: Aa Bb Cc Dd @defaultBg: ';

  p('              defaultBg    blackBg       redBg         greenBg       yellowBg      blueBg        magentaBg     cyanBg        whiteBg');
  p('    ' + '@black:black    ' + x);
  p('    ' + '@red:red      ' + x);
  p('    ' + '@green:green    ' + x);
  p('    ' + '@yellow:yellow   ' + x);
  p('    ' + '@blue:blue     ' + x);
  p('    ' + '@magenta:magenta  ' + x);
  p('    ' + '@cyan:cyan     ' + x);
  p('    ' + '@white:white    ' + x);

  console.log();

  x = ' Aa Bb Cc Dd  ' + '@bold: Aa Bb Cc Dd @boldOff: ' + '@faint: Aa Bb Cc Dd @faintOff: ' + '@underline: Aa Bb Cc Dd @underlineOff: ' + '@inverse: Aa Bb Cc Dd @inverseOff: ';

  p('              default       bold          faint        underline     inverse');
  p('    ' + '@black:black    ' + x);
  p('    ' + '@red:red      ' + x);
  p('    ' + '@green:green    ' + x);
  p('    ' + '@yellow:yellow   ' + x);
  p('    ' + '@blue:blue     ' + x);
  p('    ' + '@magenta:magenta  ' + x);
  p('    ' + '@cyan:cyan     ' + x);
  p('    ' + '@white:white    ' + x);

  console.log();
});

// var i = 1000000;
// var t = time(i, function() {
//     cc('this is @magenta:a magenta string @red:red ... @default:default again');
// });

// console.log(t);
// console.log(t/i);
