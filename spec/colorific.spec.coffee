###
# Tests
###

describe 'simple strings', ->
	cc = null

	beforeEach ->
		cc = require '../src'

	it 'should be left untouched', ->
		source = 'a simple string'
		result = cc source
		expect(result)
		.toBe source

	it 'should retain printf like formatting', ->
		source = 'testing %s'
		result = cc source
		expect(result)
		.toBe source

describe 'simple color encodings', ->
	cc = null

	beforeEach ->
		cc = require '../src'

	describe 'basic forground color support', ->
		it 'should return a black string', ->
			result = cc '@black→a black string'
			expect(result)
			.toEqual '\x1b[30ma black string\x1b[39m'

		it 'should return a red string', ->
			result = cc '@red→a red string'
			expect(result)
				.toEqual '\x1b[31ma red string\x1b[39m'

		it 'should return a red string', ->
			result = cc '@red→a red string'
			expect(result)
			.toEqual '\x1b[31ma red string\x1b[39m'

		it 'should return a green string', ->
			result = cc '@green→a green string'
			expect(result)
			.toEqual '\x1b[32ma green string\x1b[39m'

		it 'should return a yellow string', ->
			result = cc '@yellow→a yellow string'
			expect(result)
			.toEqual '\x1b[33ma yellow string\x1b[39m'

		it 'should return a blue string', ->
			result = cc '@blue→a blue string'
			expect(result)
			.toEqual '\x1b[34ma blue string\x1b[39m'

		it 'should return a magenta string', ->
			result = cc '@magenta→a magenta string'
			expect(result)
			.toEqual '\x1b[35ma magenta string\x1b[39m'

		it 'should return a cyan string', ->
			result = cc '@cyan→a cyan string'
			expect(result)
			.toEqual '\x1b[36ma cyan string\x1b[39m'

		it 'should return a white string', ->
			result = cc '@white→a white string'
			expect(result)
			.toEqual '\x1b[37ma white string\x1b[39m'

		it 'should return a default string', ->
			result = cc '@default→a default string'
			expect(result)
			.toEqual '\x1b[39ma default string\x1b[39m'

	describe 'basic background color support', ->
		it 'should return a black string', ->
			result = cc '@black→a black string'
			expect(result)
			.toEqual '\x1b[40ma black string\x1b[49m'

		xit 'should return a red string', ->
			result = cc '@red→a red string'
			expect(result)
				.toEqual '\x1b[31ma red string\x1b[39m'

		xit 'should return a red string', ->
			result = cc '@red→a red string'
			expect(result)
			.toEqual '\x1b[31ma red string\x1b[39m'

		xit 'should return a green string', ->
			result = cc '@green→a green string'
			expect(result)
			.toEqual '\x1b[32ma green string\x1b[39m'

		xit 'should return a yellow string', ->
			result = cc '@yellow→a yellow string'
			expect(result)
			.toEqual '\x1b[33ma yellow string\x1b[39m'

		xit 'should return a blue string', ->
			result = cc '@blue→a blue string'
			expect(result)
			.toEqual '\x1b[34ma blue string\x1b[39m'

		xit 'should return a magenta string', ->
			result = cc '@magenta→a magenta string'
			expect(result)
			.toEqual '\x1b[35ma magenta string\x1b[39m'

		xit 'should return a cyan string', ->
			result = cc '@cyan→a cyan string'
			expect(result)
			.toEqual '\x1b[36ma cyan string\x1b[39m'

		xit 'should return a white string', ->
			result = cc '@white→a white string'
			expect(result)
			.toEqual '\x1b[37ma white string\x1b[39m'

		xit 'should return a default string', ->
			result = cc '@default→a default string'
			expect(result)
			.toEqual '\x1b[39ma default string\x1b[39m'
