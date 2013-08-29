#!/usr/bin/env node

var _  = require('underscore');
var cc = require('../src');

var VERBOSE = false;

var print = function(cc, fmt) {
  var a = _.toArray(arguments);

  a.shift();
  a.shift();

  if (VERBOSE) {
    console.log('-------------------------------------------------------------------------------------');
    console.log([fmt.replace('%', '%%')]);
    console.log([cc(fmt)]);
    console.log.apply(this, _.flatten(['[ ' + cc(fmt) + ' ]', a]));
    console.log();
  }
  else {
    console.log.apply(this, _.flatten([cc(fmt), a]));
  }
};

console.log('DEFAULT:', cc.DEFAULT);
print(cc, '@white:white');
print(cc, '@grey:grey');
print(cc, '@red:red');
print(cc, '@red:%s', 'red');
print(cc, 'default @red:red @reset:default');
print(cc, 'default @red:%s @reset:default', 'red');
print(cc, 'default @red:red @reset:default @green:green @reset:default');
print(cc, 'default @red:%s @reset:default @green:%s @reset:default', 'red', 'green');
print(cc, '@green:green @yellow:yellow @reset:green @magenta:magenta @reset:green');
print(cc, '@bold:bold @yellow:yellow @reset:bold @magenta:magenta @reset:bold @!bold:normal again');
print(cc, '@bluebg:bold @yellow:yellow @red:@green:@blue:@yellow:yellow @reset:@yellowbg:bold @magenta:magenta');

console.log();
console.log('CURLY:', cc.CURLY);
var crl = cc.create(cc.CURLY);
print(crl, '<{red>red<}>');
print(crl, 'default <{red>red<}> default');
print(crl, 'default <{red>red<}> default <{green>green<}> default');
print(crl, '<{green>green <{yellow>yellow<}> green <{magenta>magenta<}> green<}>');
print(crl, '<{bold>bold <{yellow>yellow<}> bold <{magenta>magenta<}> bold<}>');

console.log();
console.log('SGML:', cc.SGML);
var sqml = cc.create(cc.SGML);
print(sqml, '<red>red</red>');
print(sqml, 'default <red>red</red> default');
print(sqml, 'default <red>red</red> default <green>green</green> default');
print(sqml, '<green>green <yellow>yellow</yellow> green <magenta>magenta</magenta> green</green>');
print(sqml, '<bold>bold °<yellow>yellow</yellow> bold <magenta>magenta</magenta> bold</bold>');

console.log();
console.log('COLORIZE:', cc.COLORIZE);
var col = cc.create(cc.COLORIZE);
print(col, '#red[red]');
print(col, 'default #red[red] default');
print(col, 'default #red[red] default #green[green] default');
print(col, '#green[green #yellow[yellow] green #magenta[magenta] green]');
print(col, '#bold[bold #yellow[yellow] bold #magenta[magenta] bold]');

console.log();
console.log('COLOR_TMPL:', cc.COLOR_TMPL);
var ct = cc.create(cc.COLOR_TMPL);
print(ct, '{red}red{/red}');
print(ct, 'default {red}red{/red} default');
print(ct, 'default {red}red{/red} default {green}green{/green} default');
print(ct, '{green}green {yellow}yellow{/yellow} green {magenta}magenta{/magenta} green{/green}');
print(ct, '{bold}bold {yellow}yellow{/yellow} bold {magenta}magenta{/magenta} bold{/bold}');

console.log();
console.log('STY:', cc.STY);
var sty = cc.create(cc.STY);
print(sty, '#{red: red}');
print(sty, 'default #{red: red} default');
print(sty, 'default #{red: red} default #{green: green} default');
print(sty, '#{green: green #{yellow: yellow} green #{magenta: magenta} green}');
print(sty, '#{bold: bold #{yellow: yellow} bold #{magenta: magenta} bold} normal');
