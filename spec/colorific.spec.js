describe('colorific', function() {
	var cc;

	beforeEach = function() {
		cc = require('../src');
	};

	it('should leave simple strings untouched', function() {
		expect(cc('a simple string')).toBe('a simple string');
	});

});
