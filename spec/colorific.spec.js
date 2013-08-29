'use strict';

describe('colorific', function() {
	var cc;

	beforeEach(function() {
		cc = require('../src');
	});

	describe('simple strings', function() {
		it('should left untouched', function() {
			expect(cc('a simple string'))
				.toBe('a simple string');
		});

		it('should retain07 printf like formatting', function() {
			expect(cc('testing %s'))
				.toBe('testing %s');
		});
	});

	describe('simple color encodings', function() {
		describe('basic forground color support', function() {
			it('should return a black string', function() {
				expect(cc('@black:a black string'))
					.toEqual('\x1b[30ma black string\x1b[39m');
			});

			it('should return a red string', function() {
				expect(cc('@red:a red string'))
					.toEqual('\x1b[31ma red string\x1b[39m');
			});

			it('should return a red string', function() {
				expect(cc('@red:a red string'))
					.toEqual('\x1b[31ma red string\x1b[39m');
			});

			it('should return a green string', function() {
				expect(cc('@green:a green string'))
					.toEqual('\x1b[32ma green string\x1b[39m');
			});

			it('should return a yellow string', function() {
				expect(cc('@yellow:a yellow string'))
					.toEqual('\x1b[33ma yellow string\x1b[39m');
			});

			it('should return a blue string', function() {
				expect(cc('@blue:a blue string'))
					.toEqual('\x1b[34ma blue string\x1b[39m');
			});
		});
	});
});
