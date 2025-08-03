export interface OklchColor {
  id: string;
  name: string;
  lightness: number;
  chroma: number;
  hue: number;
  alpha?: number;
}

export interface CssVariable {
  name: string;
  value: string;
}

export interface OklchGeneratorState {
  colors: OklchColor[];
  cssVariables: CssVariable[];
}
