import type { Color } from './types';
import { namedColors } from './names';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function parseHex(str: string): Color | null {
  const match = str.match(/^#([0-9a-f]+)$/i);
  if (!match) return null;

  const hex = match[1];
  let r: number, g: number, b: number, a = 1;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    a = parseInt(hex[3] + hex[3], 16) / 255;
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseInt(hex.slice(6, 8), 16) / 255;
  } else {
    return null;
  }

  return { r, g, b, a: Math.round(a * 100) / 100 };
}

function parseRgb(str: string): Color | null {
  // rgb(r, g, b) or rgba(r, g, b, a) — comma or space syntax
  const commaMatch = str.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i,
  );
  if (commaMatch) {
    return {
      r: clamp(parseInt(commaMatch[1], 10), 0, 255),
      g: clamp(parseInt(commaMatch[2], 10), 0, 255),
      b: clamp(parseInt(commaMatch[3], 10), 0, 255),
      a: commaMatch[4] !== undefined ? clamp(parseFloat(commaMatch[4]), 0, 1) : 1,
    };
  }

  // Space syntax: rgb(r g b) or rgb(r g b / a)
  const spaceMatch = str.match(
    /^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+)\s*)?\)$/i,
  );
  if (spaceMatch) {
    return {
      r: clamp(parseInt(spaceMatch[1], 10), 0, 255),
      g: clamp(parseInt(spaceMatch[2], 10), 0, 255),
      b: clamp(parseInt(spaceMatch[3], 10), 0, 255),
      a: spaceMatch[4] !== undefined ? clamp(parseFloat(spaceMatch[4]), 0, 1) : 1,
    };
  }

  return null;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1: number, g1: number, b1: number;

  if (h < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

function parseHsl(str: string): Color | null {
  const match = str.match(
    /^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i,
  );
  if (!match) return null;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);
  const a = match[4] !== undefined ? clamp(parseFloat(match[4]), 0, 1) : 1;

  const [r, g, b] = hslToRgb(h, s, l);
  return { r, g, b, a };
}

function parseNamed(str: string): Color | null {
  const name = str.toLowerCase().trim();
  const rgb = namedColors[name];
  if (!rgb) return null;
  return { r: rgb[0], g: rgb[1], b: rgb[2], a: 1 };
}

export function parse(str: string): Color | null {
  const trimmed = str.trim();

  return (
    parseHex(trimmed) ??
    parseRgb(trimmed) ??
    parseHsl(trimmed) ??
    parseNamed(trimmed)
  );
}

function toHexComponent(n: number): string {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
}

export function toHex(color: Color): string {
  const hex = `#${toHexComponent(color.r)}${toHexComponent(color.g)}${toHexComponent(color.b)}`;
  if (color.a < 1) {
    return hex + toHexComponent(Math.round(color.a * 255));
  }
  return hex;
}

export function toRgb(color: Color): string {
  const r = clamp(Math.round(color.r), 0, 255);
  const g = clamp(Math.round(color.g), 0, 255);
  const b = clamp(Math.round(color.b), 0, 255);
  if (color.a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${color.a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) {
    return [0, 0, Math.round(l * 100)];
  }

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function toHsl(color: Color): string {
  const [h, s, l] = rgbToHsl(color.r, color.g, color.b);
  if (color.a < 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${color.a})`;
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function isValid(str: string): boolean {
  return parse(str) !== null;
}
