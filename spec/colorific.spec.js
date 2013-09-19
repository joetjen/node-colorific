/**
 * Tests
 */

describe('simple strings', function() {
    var cc;

    beforeEach(function() {
        cc = require('../src');
    });

    it('should be left untouched', function() {
        var source = 'a simple string';
        var result = cc(source);
        expect(result)
            .toBe(source);
    });

    it('should retain printf like formatting', function() {
        var source = 'testing %s';
        var result = cc(source);
        expect(result)
            .toBe(source);
    });
});

describe('simple color encodings', function() {
    var cc;

    beforeEach(function() {
        cc = require('../src');
    });

    describe('basic forground color support', function() {
        it('should return a black string', function() {
            var result = cc('@black:a black string');
            expect(result)
                .toEqual('\x1b[30ma black string\x1b[39m');
        });

        it('should return a red string', function() {
            var result = cc('@red:a red string');
            expect(result)
                .toEqual('\x1b[31ma red string\x1b[39m');
        });

        it('should return a green string', function() {
            var result = cc('@green:a green string');
            expect(result)
                .toEqual('\x1b[32ma green string\x1b[39m');
        });

        it('should return a yellow string', function() {
            var result = cc('@yellow:a yellow string');
            expect(result)
                .toEqual('\x1b[33ma yellow string\x1b[39m');
        });

        it('should return a blue string', function() {
            var result = cc('@blue:a blue string');
            expect(result)
                .toEqual('\x1b[34ma blue string\x1b[39m');
        });

        it('should return a magenta string', function() {
            var result = cc('@magenta:a magenta string');
            expect(result)
                .toEqual('\x1b[35ma magenta string\x1b[39m');
        });

        it('should return a cyan string', function() {
            var result = cc('@cyan:a cyan string');
            expect(result)
                .toEqual('\x1b[36ma cyan string\x1b[39m');
        });

        it('should return a white string', function() {
            var result = cc('@white:a white string');
            expect(result)
                .toEqual('\x1b[37ma white string\x1b[39m');
        });

        it('should return a default string', function() {
            var result = cc('@default:a default string');
            expect(result)
                .toEqual('\x1b[39ma default string');
        });
    });

    describe('basic background color support', function() {
        it('should return a string with black background', function() {
            var result = cc('@blackBg:a string with black background');
            expect(result)
                .toEqual('\x1b[40ma string with black background\x1b[49m');
        });

        it('should return a string with red background', function() {
            var result = cc('@redBg:a string with red background');
            expect(result)
                    .toEqual('\x1b[41ma string with red background\x1b[49m');
        });

        it('should return a string with green background', function() {
            var result = cc('@greenBg:a string with green background');
            expect(result)
                .toEqual('\x1b[42ma string with green background\x1b[49m');
        });

        it('should return a string with yellow background', function() {
            var result = cc('@yellowBg:a string with yellow background');
            expect(result)
                .toEqual('\x1b[43ma string with yellow background\x1b[49m');
        });

        it('should return a string with blue background', function() {
            var result = cc('@blueBg:a string with blue background');
            expect(result)
                .toEqual('\x1b[44ma string with blue background\x1b[49m');
        });

        it('should return a string with magenta background', function() {
            var result = cc('@magentaBg:a string with magenta background');
            expect(result)
                .toEqual('\x1b[45ma string with magenta background\x1b[49m');
        });

        it('should return a string with cyan background', function() {
            var result = cc('@cyanBg:a string with cyan background');
            expect(result)
                .toEqual('\x1b[46ma string with cyan background\x1b[49m');
        });

        it('should return a string with white background', function() {
            var result = cc('@whiteBg:a string with white background');
            expect(result)
                .toEqual('\x1b[47ma string with white background\x1b[49m');
        });

        it('should return a string with default background', function() {
            var result = cc('@defaultBg:a string with default background');
            expect(result)
                .toEqual('\x1b[49ma string with default background');
        });
    });

    describe('multiple, unnested color ecodings', function() {
        it('should return a string with red and blue', function() {
            var result = cc('a string with @red:red @default:and @blue:blue');
            expect(result)
                .toEqual('a string with \x1b[31mred \x1b[39mand \x1b[34mblue\x1b[39m');
        });

        it('should return a string with red, green and blue', function() {
            var result = cc('a string with @red:red@default:, @green:green @default:and @blue:blue');
            expect(result)
                .toEqual('a string with \x1b[31mred\x1b[39m, \x1b[32mgreen \x1b[39mand \x1b[34mblue\x1b[39m');
        });
    });

    describe('multiple, nested color ecodings', function() {
        it('should return a string with red and blue on yellow background', function() {
            var result = cc('@yellowBg:a string with @red:red @default:and @blue:blue @default:on yellow background');
            expect(result)
                .toEqual('\x1b[43ma string with \x1b[31mred \x1b[39mand \x1b[34mblue \x1b[39mon yellow background\x1b[49m');
        });

        it('should return a string with red, green and blue on yellow background', function() {
            var result = cc('@yellowBg:a string with @red:red@default:, @green:green @default:and @blue:blue @default:on yellow background');
            expect(result)
                .toEqual('\x1b[43ma string with \x1b[31mred\x1b[39m, \x1b[32mgreen \x1b[39mand \x1b[34mblue \x1b[39mon yellow background\x1b[49m');
        });
    });
});
