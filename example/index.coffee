###
# Module dependencies
###
_      = require 'underscore'
helper = require './helper'
cc     = require '../src'

###
# Shortcuts
###
using = helper.using

###
# Main
###
using cc, (p) ->
	p '@black→a black string'
	p '@red→a red string'
	p '@green→a green string'
	p '@yellow→a yellow string'
	p '@magenta→a magenta string @red→red ... @default→default again'
