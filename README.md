# @philiprehberger/color-string

[![CI](https://github.com/philiprehberger/ts-color-string/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-color-string/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/color-string)](https://www.npmjs.com/package/@philiprehberger/color-string)
[![License](https://img.shields.io/github/license/philiprehberger/ts-color-string)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

Parse and stringify CSS color values -- hex, rgb, hsl, and named colors.

## Installation

```bash
npm install @philiprehberger/color-string
```

## Usage

```ts
import { parse, toHex, toRgb, toHsl, isValid } from '@philiprehberger/color-string';

const color = parse('#ff0000');
// => { r: 255, g: 0, b: 0, a: 1 }

parse('rgb(255, 0, 0)');
// => { r: 255, g: 0, b: 0, a: 1 }

parse('hsl(0, 100%, 50%)');
// => { r: 255, g: 0, b: 0, a: 1 }

parse('red');
// => { r: 255, g: 0, b: 0, a: 1 }

toHex({ r: 255, g: 0, b: 0, a: 1 });
// => "#ff0000"

toRgb({ r: 255, g: 0, b: 0, a: 1 });
// => "rgb(255, 0, 0)"

toHsl({ r: 255, g: 0, b: 0, a: 1 });
// => "hsl(0, 100%, 50%)"

isValid('red');
// => true

isValid('notacolor');
// => false
```

## API

### `parse(str: string): Color | null`

Parse a CSS color string into a `Color` object. Supports hex (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`), `rgb()`/`rgba()`, `hsl()`/`hsla()`, and named colors.

### `toHex(color: Color): string`

Convert a `Color` to a hex string. Includes alpha channel if `a < 1`.

### `toRgb(color: Color): string`

Convert a `Color` to an `rgb()` or `rgba()` string.

### `toHsl(color: Color): string`

Convert a `Color` to an `hsl()` or `hsla()` string.

### `isValid(str: string): boolean`

Returns `true` if the string can be parsed as a valid CSS color.

### `Color`

```ts
interface Color {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-1
}
```

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
