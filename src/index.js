/**
 * Module dependencies
 */

var _ = require('underscore');

/**
 * Constants
 */

var CSI = '\x1b';

var ANSI = {
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

var TAGFORMAT = '@@KEY:';

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
        .replace(/@KEY/, ['(', sortedKeys(ANSI).join('|'), ')'].join(''));
};

var closingTag = function(s) {
    return regExpcape(s);
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

var createAnsi = function(CODES) {
    return _.reduce(CODES, function(o, v, k) {
        return _.extend(o, _.object([k], [[csisify(v[0]), csisify(v[1])]]));
    }, {});
};

var colorific = function(matcher, str) {
    var s = str;
    var r = '';
    var c = [];
    for (var match = matcher[0].exec(s); match; match = matcher[1].exec(s)) {
        var t;
        if (!matcher[0].test(match[0])) {
            t = c.length ? c.pop() : match[0];
        }
        else {
            t = ansi[match[1]][0];
            c.push(ansi[match[1]][1]);
        }
        r += match.input.substr(0, match.index);
        r += t;
        s  = match.input.substr(match.index + match[0].length);
    }
    r += s;
    while (c.length) r += c.pop();
    return r;
};


/**
 * Initialize module
 */

var matcher = createRegExp(TAGFORMAT);
var ansi    = createAnsi(ANSI);

// log('ansi', ansi);

/**
 * Exports
 */

module.exports = _.partial(colorific, matcher);
