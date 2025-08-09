import { formatHex, formatRgb, formatHsl } from 'culori';
import type { OklchColor } from '~/features/oklch-generator/types';

export interface ColorFormat {
  label: string;
  value: string;
}

export const convertOklchToHex = (color: OklchColor): string => {
  const oklchColor = {
    mode: 'oklch' as const,
    l: color.lightness / 100,
    c: color.chroma,
    h: color.hue,
    alpha: color.alpha,
  };
  return formatHex(oklchColor) || '#000000';
};

export const convertOklchToRgb = (color: OklchColor): string => {
  const oklchColor = {
    mode: 'oklch' as const,
    l: color.lightness / 100,
    c: color.chroma,
    h: color.hue,
    alpha: color.alpha,
  };
  return formatRgb(oklchColor) || 'rgb(0, 0, 0)';
};

export const convertOklchToHsl = (color: OklchColor): string => {
  const oklchColor = {
    mode: 'oklch' as const,
    l: color.lightness / 100,
    c: color.chroma,
    h: color.hue,
    alpha: color.alpha,
  };
  return formatHsl(oklchColor) || 'hsl(0, 0%, 0%)';
};

export const formatOklchValue = (color: OklchColor): string => {
  const { lightness, chroma, hue, alpha } = color;
  const alphaValue = alpha !== undefined ? ` / ${alpha}` : '';
  return `oklch(${lightness}% ${chroma} ${hue}${alphaValue})`;
};

export const getColorFormats = (color: OklchColor): ColorFormat[] => [
  {
    label: 'OKLCH',
    value: formatOklchValue(color),
  },
  {
    label: 'HEX',
    value: convertOklchToHex(color),
  },
  {
    label: 'RGB',
    value: convertOklchToRgb(color),
  },
  {
    label: 'HSL',
    value: convertOklchToHsl(color),
  },
];
