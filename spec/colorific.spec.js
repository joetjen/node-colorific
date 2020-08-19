/**
 * Module dependencies
 */

import cc from 'colorific';
import chai from 'chai';

const expect = chai.expect;

/**
 * Tests
 */

describe('simple strings', function () {
  it('should be left untouched', function () {
    const source = 'a simple string';
    const result = cc(source);

    expect(result)
      .to.equal(source);
  });

  it('should retain printf like formatting', function () {
    const source = 'testing %s';
    const result = cc(source);

    expect(result)
      .to.equal(source);
  });
});

describe('simple color encodings', function () {
  describe('basic forground color support', function () {
    it('should return a black string', function () {
      const result = cc('@black:a black string');

      expect(result)
        .to.equal('\x1b[30ma black string\x1b[39m');
    });

    it('should return a red string', function () {
      const result = cc('@red:a red string');
      expect(result)

        .to.equal('\x1b[31ma red string\x1b[39m');
    });

    it('should return a green string', function () {
      const result = cc('@green:a green string');

      expect(result)
        .to.equal('\x1b[32ma green string\x1b[39m');
    });

    it('should return a yellow string', function () {
      const result = cc('@yellow:a yellow string');

      expect(result)
        .to.equal('\x1b[33ma yellow string\x1b[39m');
    });

    it('should return a blue string', function () {
      const result = cc('@blue:a blue string');

      expect(result)
        .to.equal('\x1b[34ma blue string\x1b[39m');
    });

    it('should return a magenta string', function () {
      const result = cc('@magenta:a magenta string');

      expect(result)
        .to.equal('\x1b[35ma magenta string\x1b[39m');
    });

    it('should return a cyan string', function () {
      const result = cc('@cyan:a cyan string');

      expect(result)
        .to.equal('\x1b[36ma cyan string\x1b[39m');
    });

    it('should return a white string', function () {
      const result = cc('@white:a white string');

      expect(result)
        .to.equal('\x1b[37ma white string\x1b[39m');
    });

    it('should return a default string', function () {
      const result = cc('@default:a default string');

      expect(result)
        .to.equal('\x1b[39ma default string');
    });
  });

  describe('basic background color support', function () {
    it('should return a string with black background', function () {
      const result = cc('@blackBg:a string with black background');

      expect(result)
        .to.equal('\x1b[40ma string with black background\x1b[49m');
    });

    it('should return a string with red background', function () {
      const result = cc('@redBg:a string with red background');

      expect(result)
        .to.equal('\x1b[41ma string with red background\x1b[49m');
    });

    it('should return a string with green background', function () {
      const result = cc('@greenBg:a string with green background');

      expect(result)
        .to.equal('\x1b[42ma string with green background\x1b[49m');
    });

    it('should return a string with yellow background', function () {
      const result = cc('@yellowBg:a string with yellow background');

      expect(result)
        .to.equal('\x1b[43ma string with yellow background\x1b[49m');
    });

    it('should return a string with blue background', function () {
      const result = cc('@blueBg:a string with blue background');

      expect(result)
        .to.equal('\x1b[44ma string with blue background\x1b[49m');
    });

    it('should return a string with magenta background', function () {
      const result = cc('@magentaBg:a string with magenta background');

      expect(result)
        .to.equal('\x1b[45ma string with magenta background\x1b[49m');
    });

    it('should return a string with cyan background', function () {
      const result = cc('@cyanBg:a string with cyan background');

      expect(result)
        .to.equal('\x1b[46ma string with cyan background\x1b[49m');
    });

    it('should return a string with white background', function () {
      const result = cc('@whiteBg:a string with white background');

      expect(result)
        .to.equal('\x1b[47ma string with white background\x1b[49m');
    });

    it('should return a string with default background', function () {
      const result = cc('@defaultBg:a string with default background');

      expect(result)
        .to.equal('\x1b[49ma string with default background');
    });
  });

  describe('multiple, unnested color ecodings', function () {
    it('should return a string with red and blue', function () {
      const result = cc('a string with @red:red @default:and @blue:blue');

      expect(result)
        .to.equal('a string with \x1b[31mred \x1b[39mand \x1b[34mblue\x1b[39m');
    });

    it('should return a string with red, green and blue', function () {
      const result = cc('a string with @red:red@default:, @green:green @default:and @blue:blue');

      expect(result)
        .to.equal('a string with \x1b[31mred\x1b[39m, \x1b[32mgreen \x1b[39mand \x1b[34mblue\x1b[39m');
    });
  });

  describe('multiple, nested color ecodings', function () {
    it('should return a string with red and blue on yellow background', function () {
      const result = cc('@yellowBg:a string with @red:red @default:and @blue:blue @default:on yellow background');

      expect(result)
        .to.equal('\x1b[43ma string with \x1b[31mred \x1b[39mand \x1b[34mblue \x1b[39mon yellow background\x1b[49m');
    });

    it('should return a string with red, green and blue on yellow background', function () {
      const result = cc('@yellowBg:a string with @red:red@default:, @green:green @default:and @blue:blue @default:on yellow background');

      expect(result)
        .to.equal('\x1b[43ma string with \x1b[31mred\x1b[39m, \x1b[32mgreen \x1b[39mand \x1b[34mblue \x1b[39mon yellow background\x1b[49m');
    });
  });
});
