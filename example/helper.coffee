###
# Module dependencies
###
_ = require 'underscore'

###
# Functions
###
colorPrint = (f, s, a...) ->
	console.log.apply @, (_.flatten [f s, a])

using = (x, f) ->
	p = _.partial colorPrint, x
	f p

###
# Exports
###
module.exports.using = using
