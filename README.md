# node-colorific

Text coloring (with ANSI) for Node.js.

This package was heavily inspiried by
[Muslim Idris' node-curly-colors](https://npmjs.org/package/curly-colors) and
several other ANSI/Color - specific packages available on the npm repository.

The reason - for me - to write yet another coloring package was that I
personally don't like having any properties and/or functions attached to
the String object and find it preferably to encode the colorinformation
within the String itself. That leaves the possibility to save my messages in
some JSON file and retrieve them later - making it easy to write
internationalization functions. In addition I noticed that there are quite a
couple of different format tags out there and people seem to like various
different styles. So instead of inventing yet another fixed format library I
tried to enable all kinds of custom format supporting - almost - every format
that is currently already available.

## TODOs

- [ ] implement some kind of theming

## Installation

	$ npm install colorific

## How to include

To use the default (Colorific) tag format (see below for more information),
simply require the package as usual.

```js
	var cc = require('colorific');
```

You can however also use a different tag format using the following format:

```js
	var cc = require('colorific').create('#@KEY[@TEXT]');
```

If you like to use one of the already predefined tag formats simply do:

```js
	var colorific = require('colorific');
	var cc        = colorific.create(colorific.CURLY_COLORS);
```

## How to use

Once you have you colorific instance you can simply use that as function to
convert the ANSI codes embedded into a String to their correct ANSI
representation. For example:

```js
	var s = "Sometime I want my text to be @red:red!";

	console.log(cc(s));
```

If you have a `printf`-like formatted string simply do some like this:

```js
	var s = "Sometimes I want my %s to be @red:%s!";

	console.log(cc(s), "text", "red");
```

## (Predefined) Tag Formats

A tag format string can basically be any string. There are two special 'markers'
in a tag format string which are `@KEY` and `@TEXT`. `@KEY` is a placeholder for
a valid ANSI Code from the list below. `@TEXT` is used to represent the text to
format. Anything before `@TEXT` is consider the opening 'tag', anything after is
the closing 'tag'. If the is nothing after `@TEXT` the tag format is considered
closing-tag-less and possible closing code will be appended to the resuling,
ansi-encoded string. Any `@KEY` in the closing tag is used to represent a match
to the ANSI Code used in the corresponding opening tag.

Base on the tag format colorific will generate internal regular expressions to
represent the tag format.

There are already several tag formats predefined:

* COLORIFIC `@@KEY:@TEXT`

  My default format. Chosen to make be short but still easily distinguishable in
  a string.

  Example: `@red:this is red`

* COLOR_TERMINAL `%@KEY@TEXT`

  Inspired by [color-terminal](https://npmjs.org/package/color-terminal)

  Example: `%redthis is red`

* STYISH `#{@KEY \'@TEXT\'}`

  Inspired by [sty](https://npmjs.org/package/sty)

  Example: `#{red 'this is red'}`

* SGML `<@KEY>@TEXT</@KEY>`

  SGML-like representation of color codes in string.

  Example: `<red>this is red</red>`

* CURLY_COLORS `<{@KEY>@TEXT<}>`

  Inspired by [curly-colors](https://npmjs.org/package/curly-colors)

  Example: `<{red>this is red<}>`

* COLORS_TMPL `{@KEY}@TEXT{/@KEY}`

  Inspired by [colors-tmpl](https://npmjs.org/package/colors-tmpl)

  Example: `{red}:this is red{/red}`

* XCOLOR `{{@KEY}}@TEXT{{/@KEY}}`

  Inspired by [xcolor](https://npmjs.org/package/xcolor)

  Example: `{{red}}:this is red{{/red}}`


## Supported ANSI Codes

Currently the following codes are supported:

* Foreground Colors
	* default
	* black
	* red
	* green
	* yellow
	* blue
	* magenta
	* cyan
	* white

* Background Colors
	* default
	* black
	* red
	* green
	* yellow
	* blue
	* magenta
	* cyan
	* white

* Miscellaneous Styles
	* reset
	* bold
	* faint
	* underline
	* inverse
	
* Automatic when using a tag format with closings
	* boldOff
	* faintOff
	* underlineOff
	* inverseOff

## Examples

![colorific terminal output](http://screencloud.net/img/screenshots/fea9e35a8ce98a419e87cb03fd6167ca.png "Exemplary colorifc output")

Also check the index.js in the example directory which generates the above output.

## License

The MIT License (MIT)

Copyright (c) 2013 Jan Oetjen <oetjenj@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
