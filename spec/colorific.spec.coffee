###
# tests
###

describe 'colorific', ->
	cc = null

	beforeEach ->
		cc = require '../src'

	describe 'simple strings', ->
		it 'should left untouched', ->
			result = cc 'a simple string'
			expect result
				.toBe 'a simple string'

		it 'should retain07 printf like formatting', ->
			result = cc 'testing %s'
			expect(result)
				.toBe 'testing %s'

	describe 'simple color encodings', ->
		describe 'basic forground color support', ->
			it 'should return a black string', ->
				result = cc '@black:a black string'
				expect(result)
					.toEqual '\x1b[30ma black string\x1b[39m'

			it 'should return a red string', ->
				result = cc '@red:a red string'
				expect(result)
					.toEqual '\x1b[31ma red string\x1b[39m'

			it 'should return a red string', ->
				result = cc '@red:a red string'
				expect(result)
					.toEqual '\x1b[31ma red string\x1b[39m'

			it 'should return a green string', ->
				result = cc '@green:a green string'
				expect(result)
					.toEqual '\x1b[32ma green string\x1b[39m'

			it 'should return a yellow string', ->
				result = cc '@yellow:a yellow string'
				expect(result)
					.toEqual '\x1b[33ma yellow string\x1b[39m'

			it 'should return a blue string', ->
				result = cc '@blue:a blue string'
				expect(result)
					.toEqual '\x1b[34ma blue string\x1b[39m'

