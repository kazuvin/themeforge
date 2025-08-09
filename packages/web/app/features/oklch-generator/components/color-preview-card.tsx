import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { OklchColor } from '../types';

type ColorPreviewCardProps = {
  colors: OklchColor[];
  className?: string;
};

export function ColorPreviewCard({ colors, className }: ColorPreviewCardProps) {
  if (colors.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Color Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex items-center justify-center py-8">Add colors to see preview</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Color Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((color) => {
            const oklchValue = `oklch(${color.lightness}% ${color.chroma} ${color.hue}${color.alpha !== undefined ? ` / ${color.alpha}` : ''})`;

            return (
              <div key={color.id} className="space-y-2">
                <div
                  className="border-border/50 aspect-square rounded-lg border shadow-sm"
                  style={{ backgroundColor: oklchValue }}
                />
                <div className="space-y-1">
                  <p className="truncate text-xs font-medium" title={color.name}>
                    {color.name}
                  </p>
                  <p className="text-muted-foreground truncate font-mono text-xs" title={oklchValue}>
                    {oklchValue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

