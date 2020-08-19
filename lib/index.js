/**
 * Module dependencies
 */

const _ = require('lodash');

/**
 * Constants
 */

const COMPRESS = {
  // compact multiple codes into a color separated list
  'shrink': [
    /(\x1b\[\d+(?:;\d+)*)m\x1b\[(\d+(?:;\d+)*m)/, '$1;$2'
  ],
  // remove duplicate codes within a list
  'dedupe': [
    /(\x1b\[)((?:\d+;)*?)(\d+)((?:;\d+)*?);\3((?:;\d+)*m)/, '$1$2$3$5'
  ],
  // remove same code with only text in between
  'trash1': [
    /(\x1b\[(?:\d+;)*(\d+)(?:;\d)*m)([^\x1b]*)(\x1b\[)((?:\d+;)*)\2((?:;\d+)*m)/, '$1$3$4$5$6'
  ],
  // remove left over colons from lists
  'trash2': [
    /(\x1b\[)((?:\d+;)*);((?:;\d+)*m)/, '$1$2$3'
  ],
  // remove left over colons at the start of lists
  'trash3': [
    /(\x1b\[);((?:\d+;)*)(\d+m)/, '$1$2$3'
  ],
  // remove empty lists
  'trash4': [
    /\x1b\[m/, ''
  ]
};

const CSI = '\x1b';

const ANSI = _.reduce({
  'reset':        [ 0,  0],
  'bold':         [ 1, 22],
  'boldOff':      [22, 22],
  'faint':        [ 2, 22],
  'faintOff':     [22, 22],
  'underline':    [ 4, 24],
  'underlineOff': [24, 24],
  'inverse':      [ 7, 27],
  'inverseOff':   [27, 27],

  // foreground colors
  'black':        [30, 39],
  'red':          [31, 39],
  'green':        [32, 39],
  'yellow':       [33, 39],
  'blue':         [34, 39],
  'magenta':      [35, 39],
  'cyan':         [36, 39],
  'white':        [37, 39],
  'default':      [39, 39],

  // background colors
  'blackBg':      [40, 49],
  'redBg':        [41, 49],
  'greenBg':      [42, 49],
  'yellowBg':     [43, 49],
  'blueBg':       [44, 49],
  'magentaBg':    [45, 49],
  'cyanBg':       [46, 49],
  'whiteBg':      [47, 49],
  'defaultBg':    [49, 49],
}, (o, v, k) => _.set(o, k, _.map(v, (code) => `${CSI}[${code}m`)), {});

const COLORIFIC      = '@@KEY:@TEXT';
const COLOR_TERMINAL = '%@KEY@TEXT';
const STYISH         = '#{@KEY \'@TEXT\'}';
const SGML           = '<@KEY>@TEXT</@KEY>';
const CURLY_COLORS   = '<{@KEY>@TEXT<}>';
const COLORS_TMPL    = '{@KEY}@TEXT{/@KEY}';
const XCOLOR         = '{{@KEY}}@TEXT{{/@KEY}}';

/**
 * Initialize module
 */

_.mixin({
  'replaceAll': (str, re, sub) => {
    let s = str;

    while (re.test(s)) {
      s = s.replace(re, sub);
    }

    return s;
  }
});

/**
 * Functions
 */

const sortedKeys = (o) =>
  _.sortBy(_.keys(o), 'length').reverse();

const regExpcape = (s) =>
  !s ? '' : s.replace(/([.*?+^$()[\]{}\\\/])/g, '\\$1');

const openingTag = (s) => regExpcape(s)
    .replace(/@KEY/, `(${sortedKeys(ANSI).join("|")})`)
    .replace(/\s+/, "\\s+");

const closingTag = (s) => regExpcape(s)
  .replace(/\s+/, '\\s+');

const regExpify = (s) => new RegExp(s || '');

const createRegExp = (s) => {
  const x = s.split("@TEXT");
  const o = openingTag(x[0]);
  const c = closingTag(x[1]);
  const z = c ? `(?:${o}|${c})` : o;

  return [regExpify(o), regExpify(z)];
};

const decodeANSI = (matcher, str) => {
  const c = [];
  const k = /@KEY/.test(matcher[1].toString());

  let s = str;
  let r = '';
  let m = matcher[0];

  for (let match = m.exec(s); match; match = m.exec(s)) {
    let t;

    if (!matcher[0].test(match[0])) {
      if (c.length > 0) {
        const x = c.pop();

        t = x[0];
        m = !k ? matcher[1] : x[1];
      }
      else {
        t = match[0];
        m = matcher[1];
      }
    }
    else {
      const y = m;

      t = ANSI[match[1]][0];
      m = !k ? matcher[1] : regExpify(matcher[1].toString().replace(/(^\/|\/$)/g, "").replace("@KEY", match[1]));

      c.push([ANSI[match[1]][1], y]);
    }
    r += match.input.substr(0, match.index);
    r += t;
    s = match.input.substr(match.index + match[0].length);
  }
  r += s;

  while (c.length) {
    r += c.pop()[0];
  }

  return r;
};

const compressANSI = (str) => _.chain(str)
  .replaceAll(...COMPRESS.shrink)
  .replaceAll(...COMPRESS.dedupe)
  .replaceAll(...COMPRESS.trash1)
  .replaceAll(...COMPRESS.trash2)
  .replaceAll(...COMPRESS.trash3)
  .replaceAll(...COMPRESS.trash4)
  .value();

const colorific = (matcher, str) => compressANSI(decodeANSI(matcher, str));

const create = (tagFormat) => _.partial(colorific, createRegExp(tagFormat));

/**
 * Exports
 */
exports = module.exports = create(COLORIFIC);

exports.create = create;

exports.COLORIFIC = COLORIFIC;
exports.COLOR_TERMINAL = COLOR_TERMINAL;
exports.STYISH = STYISH;
exports.SGML = SGML;
exports.CURLY_COLORS = CURLY_COLORS;
exports.COLORS_TMPL = COLORS_TMPL;
exports.XCOLOR = XCOLOR;
