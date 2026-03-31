# @philiprehberger/color-string

[![CI](https://github.com/philiprehberger/ts-color-string/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-color-string/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/color-string.svg)](https://www.npmjs.com/package/@philiprehberger/color-string)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-color-string)](https://github.com/philiprehberger/ts-color-string/commits/main)

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-color-string)

🐛 [Report issues](https://github.com/philiprehberger/ts-color-string/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-color-string/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
