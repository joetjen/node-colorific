/**
 * Module dependencies
 */

var _ = require('underscore');

/**
 * Constants
 */

var CSI = '\x1b';

var ANSI = {
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
    'black':     [30, 39],
    'red':       [31, 39],
    'green':     [32, 39],
    'yellow':    [33, 39],
    'blue':      [34, 39],
    'magenta':   [35, 39],
    'cyan':      [36, 39],
    'white':     [37, 39],
    'default':   [39, 39],

    // background colors
    'blackBg':   [40, 49],
    'redBg':     [41, 49],
    'greenBg':   [42, 49],
    'yellowBg':  [43, 49],
    'blueBg':    [44, 49],
    'magentaBg': [45, 49],
    'cyanBg':    [46, 49],
    'whiteBg':   [47, 49],
    'defaultBg': [49, 49]
};

var COLORIFIC      = '@@KEY:@TEXT';
var COLOR_TERMINAL = '%@KEY@TEXT';
var STYISH         = '#{@KEY \'@TEXT\'}';
var SGML           = '<@KEY>@TEXT</@KEY>';
var CURLY_COLORS   = '<{@KEY>@TEXT<}>';
var COLORS_TMPL    = '{@KEY}@TEXT{/@KEY}';
var XCOLOR         = '{{@KEY}}@TEXT{{/@KEY}}';

/**
 *
 */

var matcher;

/**
 * Shortcuts
 */

var log = console.log;

/**
 * Functions
 */

var sortedKeys = function(o) {
    return _.sortBy(_.keys(o), 'length').reverse();
};

var regExpcape = function(s) {
    if (!s) return '';
    return s.replace(/([.*?+^$()[\]{}\\\/])/g, '\\$1');
};

var openingTag = function(s) {
    return regExpcape(s)
        .replace(/@KEY/, ['(', sortedKeys(ANSI).join('|'), ')'].join(''))
        .replace(/\s+/,  '\\s+');
};

var closingTag = function(s) {
    return regExpcape(s)
        .replace(/\s+/,  '\\s+');
};

var regExpify = function(s) {
    return new RegExp(s || '');
};

var createRegExp = function(s) {
    var x = s.split('@TEXT');
    var o = openingTag(x[0]);
    var c = closingTag(x[1]);
    var z = c ? ['(?:', o, '|', c, ')'].join('') : o;
    return [regExpify(o), regExpify(z)];
};

var csisify = function(code) {
    return [CSI, '[', code, 'm'].join('');
};

var createANSI = function(CODES) {
    return _.reduce(CODES, function(o, v, k) {
        return _.extend(o, _.object([k], [[csisify(v[0]), csisify(v[1])]]));
    }, {});
};

var decodeANSI = function(matcher, str) {
    var s = str;
    var r = '';
    var c = [];
    var m = matcher[0];
    var k = /@KEY/.test(matcher[1].toString());
    for (var match = m.exec(s); match; match = m.exec(s)) {
        var t;
        if (!matcher[0].test(match[0])) {
            if (c.length > 0) {
                var x = c.pop();
                t = x[0];
                m = !k ? matcher[1] : x[1];
            }
            else {
                t = match[0];
                m = matcher[1];
            }
        }
        else {
            var y = m;
            t = ansi[match[1]][0];
            m = !k ? matcher[1] : regExpify(
                matcher[1]
                    .toString()
                    .replace(/(^\/|\/$)/g, '')
                    .replace('@KEY', match[1]));
            c.push([ansi[match[1]][1], y]);
        }
        r += match.input.substr(0, match.index);
        r += t;
        s  = match.input.substr(match.index + match[0].length);
    }
    r += s;
    while (c.length) r += c.pop()[0];
    return r;
};

_.mixin({
    'replaceAll': function(str, re, sub) {
        var s = str;
        while (re.test(s)) s = s.replace(re, sub);
        return s;
    }
});

var COMPRESS = {
    // compact multiple codes into a color separated list
    'shrink': [
        /(\x1b\[\d+(?:;\d+)*)m\x1b\[(\d+(?:;\d+)*m)/,
        '$1;$2'
    ],
    // remove duplicate codes within a list
    'dedupe': [
        /(\x1b\[)((?:\d+;)*?)(\d+)((?:;\d+)*?);\3((?:;\d+)*m)/,
        '$1$2$3$5'
    ],
    // remove same code with only text in between
    'trash1': [
        /(\x1b\[(?:\d+;)*(\d+)(?:;\d)*m)([^\x1b]*)(\x1b\[)((?:\d+;)*)\2((?:;\d+)*m)/,
        '$1$3$4$5$6'
    ],
    // remove left over colons from lists
    'trash2': [
        /(\x1b\[)((?:\d+;)*);((?:;\d+)*m)/,
        '$1$2$3'
    ],
    // remove left over colons at the start of lists
    'trash3': [
        /(\x1b\[);((?:\d+;)*)(\d+m)/,
        '$1$2$3'
    ],
    // remove empty lists
    'trash4': [
        /\x1b\[m/,
        ''
    ]
};

var compressANSI = function(str) {
    var s = str;
    s = _.chain(s)
            .replaceAll(COMPRESS.shrink[0],  COMPRESS.shrink[1])
            .replaceAll(COMPRESS.dedupe[0],  COMPRESS.dedupe[1])
            .replaceAll(COMPRESS.trash1[0],  COMPRESS.trash1[1])
            .replaceAll(COMPRESS.trash2[0],  COMPRESS.trash2[1])
            .replaceAll(COMPRESS.trash3[0],  COMPRESS.trash3[1])
            .replaceAll(COMPRESS.trash4[0],  COMPRESS.trash4[1])
            .value();
    return s;
};

var colorific = function(matcher, str) {
    return compressANSI(decodeANSI(matcher, str));
};


/**
 * Initialize module
 */

var matcher = createRegExp(COLORIFIC);
var ansi    = createANSI(ANSI);

/**
 * Exports
 */

module.exports = _.partial(colorific, matcher);

// console.log(matcher);
// console.log(module.exports("<red>this <blue>should</red> be red</red> and this not"));
// process.exit();
