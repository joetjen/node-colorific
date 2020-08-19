/**
 * Module dependencies
 */

var _ = require('lodash');
var cc = require('../lib');

/**
 * Constants
 */

const ATTRIBUTES = ['default', 'bold', 'faint', 'underline', 'inverse'];
const COLORS     = ['default', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const BGCOLORS   = _.map(COLORS, (x) => `${x}Bg`);

/**
 * Functions
 */

const print = (x) => console.log(cc(x));

const pad = (x) => _.padEnd(` ${x} `, 13, ' ');
const colorize = (x) => `@${x}:${pad('Aa Bb Cc Dd')}@defaultBg:`;

const line = (f, cols, before = '@default:', after = '@reset:' ) =>
  _.reduce(cols, (acc, col) =>
    `${acc} ${before}${f(col)}${after}`, '');

const printMatrix = (rows, cols) => {
  print(`@reset:@default:@defaultBg:${pad('')} ${line(pad, cols, '', '')}`);

  _.each(rows, (row) => print(`@reset:@${row}:${pad(row)}@reset: ${line(colorize, cols, `@${row}:`)}`));
};

/**
 * Main
 */

console.log();

printMatrix(COLORS, BGCOLORS);

console.log();

printMatrix(COLORS, ATTRIBUTES);

console.log();
