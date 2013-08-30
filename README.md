# node-colorific

Text coloring (with ANSI) for Node.js.

This package was heavily inspiried by Muslim-Idris/node-curly-colors and
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
	var cc = require('colorific').create('#@CODE[@TEXT]');
```

If you like to use one of the already predefined tag formats simply do:

```js
	var colorific = require('colorific');
	var cc        = colorific.create(colorific.CURLY);
```

## How to use

Once you have you colorific instance you can simply use that as function to convert
the ANSI codes embedded into a String to their correct ANSI representation. For
example:

```js
	var s = "Sometime I want my text to be @red:red!";

	console.log(cc(s));
```

If you have a `printf`-like formatted string simply do some like this:

```js
	var s = "Sometimes I want my %s to be @red:%s!";

	console.log(cc(s), "text", "red");
```

Another way to use colorific is to use the ANSI Code names (see below for a list)
as a function, like so:

```js
	var redText = cc.red('This text is red!');

	console.log(redText);
```

## Supported ANSI Codes

## Examples
