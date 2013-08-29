/**
 * Module dependencies.
 */
var _ = require('underscore');

var DEFAULT_FG = '\x1b[39m';
var REGEX_FG   = /\u001b\[39m/g;

var DEFAULT_BG = '\x1b[49m';
var REGEX_BG   = /\u001b\[49m/g;0

// var ESCAPE_C7HAR = '\\\\';
// var ESCAPE_CHAR = '°';
var ESCAPE_CHAR = '`';

// ANSI codes
var ANSI = {

  // aixterm background colors (high intensity)
  'greyBg':      ['\x1b[100m', DEFAULT_BG],
  'grayBg':      ['\x1b[100m', DEFAULT_BG],
  'hiBlackBg':   ['\x1b[100m', DEFAULT_BG],
  'hiRedBg':     ['\x1b[101m', DEFAULT_BG],
  'hiGreenBg':   ['\x1b[102m', DEFAULT_BG],
  'hiYellowBg':  ['\x1b[103m', DEFAULT_BG],
  'hiBlueBg':    ['\x1b[104m', DEFAULT_BG],
  'hiMagentaBg': ['\x1b[105m', DEFAULT_BG],
  'hiCyanBg':    ['\x1b[106m', DEFAULT_BG],
  'hiWhiteBg':   ['\x1b[107m', DEFAULT_BG],

  // background colors
  'defaultBg':   [DEFAULT_BG,  ''],
  'blackBg':     ['\x1b[40m',  DEFAULT_BG],
  'redBg':       ['\x1b[41m',  DEFAULT_BG],
  'greenBg':     ['\x1b[42m',  DEFAULT_BG],
  'yellowBg':    ['\x1b[43m',  DEFAULT_BG],
  'blueBg':      ['\x1b[44m',  DEFAULT_BG],
  'magentaBg':   ['\x1b[45m',  DEFAULT_BG],
  'cyanBg':      ['\x1b[46m',  DEFAULT_BG],
  'whiteBg':     ['\x1b[47m',  DEFAULT_BG],

  // aixterm foreground colors (high intensity)
  'grey':        ['\x1b[90m',  DEFAULT_FG],
  'gray':        ['\x1b[90m',  DEFAULT_FG],
  'hiBlack':     ['\x1b[90m',  DEFAULT_FG],
  'hiRed':       ['\x1b[91m',  DEFAULT_FG],
  'hiGreen':     ['\x1b[92m',  DEFAULT_FG],
  'hiYellow':    ['\x1b[93m',  DEFAULT_FG],
  'hiBlue':      ['\x1b[94m',  DEFAULT_FG],
  'hiMagenta':   ['\x1b[95m',  DEFAULT_FG],
  'hiCyan':      ['\x1b[96m',  DEFAULT_FG],
  'hiWhite':     ['\x1b[97m',  DEFAULT_FG],

  // foreground colors
  'default':     [DEFAULT_FG,  ''],
  'black':       ['\x1b[30m',  DEFAULT_FG],
  'red':         ['\x1b[31m',  DEFAULT_FG],
  'green':       ['\x1b[32m',  DEFAULT_FG],
  'yellow':      ['\x1b[33m',  DEFAULT_FG],
  'blue':        ['\x1b[34m',  DEFAULT_FG],
  'magenta':     ['\x1b[35m',  DEFAULT_FG],
  'cyan':        ['\x1b[36m',  DEFAULT_FG],
  'white':       ['\x1b[37m',  DEFAULT_FG],

  //styles
  'bold':        ['\x1b[1m',   '\x1b[22m'],
  'italic':      ['\x1b[3m',   '\x1b[23m'],
  'underline':   ['\x1b[4m',   '\x1b[24m'],
  'blink':       ['\x1b[5m',   '\x1b[25m'],
  'blinkSlow':   ['\x1b[5m',   '\x1b[25m'],
  'slowBlink':   ['\x1b[5m',   '\x1b[25m'],
  'blinkRapid':  ['\x1b[6m',   '\x1b[25m'],
  'rapidBlink':  ['\x1b[6m',   '\x1b[25m'],
  'inverse':     ['\x1b[7m',   '\x1b[27m'],
  'overline':    ['\x1b[53m',  '\x1b[56m']

};

// Predefined formats
var PREDEFINED = {
  'COLORIFIC':  '@@CODE:',
  'CURLY':      '<{@CODE>@TEXT<}>',
  'SGML':       '<@CODE>@TEXT</@CODE>',
  'COLORIZE':   '#@CODE[@TEXT]',
  'COLOR_TMPL': '{@CODE}@TEXT{/@CODE}',
  'STY':        '#{@CODE: @TEXT}',
  'TERM':       '%@CODE'
};

var DEFAULT = PREDEFINED.COLORIFIC;

var ansify = function(code) {
  return ['\x1b[', code, 'm'].join('');
};

/**
 * Return the ANSI code for `key`.
 * @param  {string} key The verbose representation of the ANSI code
 *                      as defined in the ANSI array
 * @return {string}     the ANSI code string
 */
var ansiCode = function(key) {
  if (key) {
    var i = key[0] === '!';
    var k = key.replace(/^!?(.*)$/, "$1");

    if (_.has(ANSI, k)) {
      var a = ANSI[k];

      return i ? [a[1], a[0]] : a;
    }
  }

  return undefined;
};

var regify = function(tagFormat) {
  return [
    ['(^|[^', ESCAPE_CHAR, ']', '(?!', ESCAPE_CHAR, '))('].join(''),
    (/(@TEXT|@REST)/g.test(tagFormat) ? tagFormat : [tagFormat, '@REST'].join(''))
      .replace(/([$*+?.^()|{}\/\[\]\\])/g, '\\$1')

      .replace(/@CODE/,  ['(!?(?:', _.keys(ANSI).join('|'), '))'].join(''))
      .replace(/@CODE/g, '\\3')

      .replace(/@REST/,  ')(.*)(')
      .replace(/@REST/g, '\\4')

      .replace(/@TEXT/,  ')(.*?)(')
      .replace(/@TEXT/g, '\\4'),
    ')'
  ].join('');
};

/**
 * [colorize description]
 * @param  {[type]} match  [description]
 * @param  {[type]} start  [description]
 * @param  {[type]} code   [description]
 * @param  {[type]} text   [description]
 * @param  {[type]} close  [description]
 * @param  {[type]} offset [description]
 * @param  {[type]} str    [description]
 * @return {[type]}        [description]
 */
var colorize = function(match, esc, start, code, text, close, offset, str) {
  var ct = [text, close].join('');

  if (this.test(ct)) {
    return [esc, start, ct.replace(this, colorize.bind(this))].join('');
  }
  else {
    var cc = ansiCode(code) || [ start, close ];

    if (this.closing) {
      if (cc[1] === DEFAULT_FG) text = text.replace(REGEX_FG, [DEFAULT_FG, cc[0]].join(''));
      if (cc[1] === DEFAULT_BG) text = text.replace(REGEX_BG, [DEFAULT_BG, cc[0]].join(''));
    }
    return [esc, cc[0], text, cc[1]].join('');
  }
}

var OPT_LNGDUPES = /(\u001b\[\d+m)([^\u001b]*)(?:\1)+/;                         // remove duplicates long format
var OPT_UNNEEDED = /(\u001b\[(3|4)\dm)(\u001b\[\2\dm)/;                         // remove uneccessaries
var OPT_COMPRESS = /(\u001b\[\d+(?:;\d+)*)m\u001b\[(\d+(?:;\d+)*m)/;            // compress
var OPT_SRTDUPES = /(\u001b\[(?:\d+(?:;\d+)*)*)(\d+(?:;\d+)*);\2((?:;\d+)*m)/;  // remove compressed duplicates

var replaceAll = function(pat, sub, str) {
  // console.log('pat', pat);
  // console.log('pat', (new RegExp(pat, 'g').toString()));
  // console.log('sub', sub);
  // console.log('in ', str);
  // console.log('out', str.replace(new RegExp(pat, 'g'), sub));
  // console.log();
  return str.replace(new RegExp(pat, 'g'), sub);
}

var singleEscapes = _.partial(replaceAll, [ESCAPE_CHAR, '(?!', ESCAPE_CHAR, ')'].join(''), '');
var doubleEscapes = _.partial(replaceAll, [ESCAPE_CHAR,        ESCAPE_CHAR     ].join(''), ESCAPE_CHAR);

// var unescape = function(s) {
//   console.log([s]);
//   return s;
// };
var unescape = _.compose(doubleEscapes, singleEscapes);

_.mixin({
  optimize: function(str, re, repl) {
    if (!re.test(str)) return str;

    return this.optimize(str.replace(re, repl), re, repl);
  }
});

var normalize = function(str) {
  return _.chain(str)
    // .optimize(OPT_LNGDUPES, '$1$2')  // seems unnecessary
    .optimize(OPT_UNNEEDED, '$3')
    .optimize(OPT_COMPRESS, '$1;$2')
    .optimize(OPT_SRTDUPES, '$1$2$3')
    .value();
};

/**
 * Replace all ANSI encodings with the real ANSI codes. Uses the currently set format
 * to find all ANSI encodings.
 * @param  {string} str The string to perform the replacement on.
 * @return {string}     The string with ANSI codes
 */
var colorification = function(re, str) {
  var rv = str;

  while(re.test(rv)) rv = rv.replace(re, colorize.bind(re));

  return normalize([rv, DEFAULT_FG, DEFAULT_BG ].join(''));
};

var ansiWrap = function(ansi, str) {
  if (!ansi) return str;
  return normalize([ansi[0], str, ansi[1]].join(''));
}

var create = function(tagFormat) {
  var re = new RegExp(regify(tagFormat || DEFAULT), 'g');

  if (!/@REST/.test(tagFormat)) re.closing = true
  else                          re.closing = false;1

  var f = _.compose(unescape, _.partial(colorification, re));

  _.each(_.keys(PREDEFINED), function(e) {
    f[e] = PREDEFINED[e];
  });

  _.each(_.keys(ANSI), function(e) {
    f[e] = _.compose(unescape, _.partial(ansiWrap, ansiCode(e)));
  });

  return f;
};

exports = module.exports        = create(DEFAULT);
exports = module.exports.create = create;
