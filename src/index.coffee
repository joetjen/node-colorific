###
# Module dependencies
###
_ = require 'underscore'

###
# Constants
###
CSI  = '\x1b'

ANSI =
	black:   30,
	red:     31,
	green:   32,
	yellow:  33,
	blue:    34,
	magenta: 35,
	cyan:    36,
	white:   37,
	default: 39

###
#
###
code = {}

###
# Shortcuts
###

log     = console.log
replace = String::replace

###
# Functions
###

ansify = (c...) ->
	"#{ CSI }[#{ c.join ';' }m"

createCode = (o, c) ->
	_.extend o, _.object [c], [{
		regex:   (new RegExp "@#{ c }→(.*)$", 'g'),
		replace: "#{ ansify ANSI[c] }$1#{ ansify ANSI.default }"
	}]

replaceCode = (s, c) ->
	return s if (_.isEmpty c)
	replaceCode (replace.apply s, _.toArray (_.head c)), _.tail c

colorific = (s) ->
	replaceCode s, (_.flatten (_.toArray code))

###
# Initialize module
###

code = _.reduceRight (_.keys ANSI), createCode, {}

###
# Exports
###
module.exports = colorific
