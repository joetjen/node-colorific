/**
 * Module dependencies
 */

import cc from 'colorific';

/**
 * Constants
 */

const ATTRIBUTES = ['default', 'bold', 'faint', 'underline', 'inverse'];
const COLORS = ['default', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
const BGCOLORS = COLORS.map((x) => `${x}Bg`);

/**
 * Functions
 */

const print = (x) => console.log(cc(x));

const pad = (x) => {
  let s = ` ${x} `;

  return s.length >= 13
    ? s
    : `${s}             `.substr(0, 13);
};

const colorize = (x) => `@${x}:${pad('Aa Bb Cc Dd')}@defaultBg:`;

const line = (f, cs, s = '@default:', e = '@reset:') =>
  cs.reduce((a, c) =>
    `${a} ${s}${f(c)}${e}`, '');

const printMatrix = (rs, cs) => {
  print(`@reset:@default:@defaultBg:${pad('')} ${line(pad, cs, '', '')}`);

  rs.forEach((r) => print(`@reset:@${r}:${pad(r)}@reset: ${line(colorize, cs, `@${r}:`)}`));
};

/**
 * Main
 */

console.log();

printMatrix(COLORS, BGCOLORS);

console.log();

printMatrix(COLORS, ATTRIBUTES);

console.log();
