import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse, toHex, toRgb, toHsl, isValid } from '../../dist/index.js';

describe('parse', () => {
  it('should parse 6-digit hex', () => {
    const color = parse('#ff0000');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('should parse 3-digit hex', () => {
    const color = parse('#f00');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('should parse rgb()', () => {
    const color = parse('rgb(255, 0, 0)');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('should parse rgb() without spaces', () => {
    const color = parse('rgb(255,0,0)');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('should parse hsl() for red', () => {
    const color = parse('hsl(0, 100%, 50%)');
    assert.ok(color !== null);
    assert.equal(color.r, 255);
    assert.equal(color.g, 0);
    assert.equal(color.b, 0);
    assert.equal(color.a, 1);
  });

  it('should parse named color "red"', () => {
    const color = parse('red');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('should return null for invalid input', () => {
    assert.equal(parse('invalid'), null);
  });

  it('should parse 8-digit hex with alpha', () => {
    const color = parse('#ff000080');
    assert.ok(color !== null);
    assert.equal(color.r, 255);
    assert.equal(color.g, 0);
    assert.equal(color.b, 0);
    assert.ok(Math.abs(color.a - 0.5) < 0.02);
  });

  it('should parse rgba()', () => {
    const color = parse('rgba(255, 0, 0, 0.5)');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 0.5 });
  });

  it('should parse named colors case-insensitively', () => {
    const color = parse('RED');
    assert.deepEqual(color, { r: 255, g: 0, b: 0, a: 1 });
  });
});

describe('toHex', () => {
  it('should convert to hex string', () => {
    assert.equal(toHex({ r: 255, g: 0, b: 0, a: 1 }), '#ff0000');
  });

  it('should include alpha when less than 1', () => {
    const hex = toHex({ r: 255, g: 0, b: 0, a: 0.5 });
    assert.equal(hex, '#ff000080');
  });
});

describe('toRgb', () => {
  it('should convert to rgb string', () => {
    assert.equal(toRgb({ r: 255, g: 0, b: 0, a: 1 }), 'rgb(255, 0, 0)');
  });

  it('should convert to rgba string when alpha < 1', () => {
    assert.equal(toRgb({ r: 255, g: 0, b: 0, a: 0.5 }), 'rgba(255, 0, 0, 0.5)');
  });
});

describe('toHsl', () => {
  it('should convert red to hsl', () => {
    const result = toHsl({ r: 255, g: 0, b: 0, a: 1 });
    assert.equal(result, 'hsl(0, 100%, 50%)');
  });
});

describe('isValid', () => {
  it('should return true for valid color strings', () => {
    assert.equal(isValid('red'), true);
    assert.equal(isValid('#ff0000'), true);
    assert.equal(isValid('rgb(255, 0, 0)'), true);
  });

  it('should return false for invalid color strings', () => {
    assert.equal(isValid('notacolor'), false);
    assert.equal(isValid(''), false);
  });
});
