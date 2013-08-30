###
# Module dependencies.
###
cc = require '../src'

helper = require './helper'

using = helper.using

using cc, (p) ->
	p '@black:a black string'
	p '@red:a red string'
	p '@green:a green string'
	p '@yellow:a yellow string'
