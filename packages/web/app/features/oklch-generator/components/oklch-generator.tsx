import { Button } from '~/components/ui/button';
import { cn } from '~/utils';
import { useOklchGenerator } from '../hooks';
import { generateRandomOklchColor } from '../utils';
import { OklchColorList } from './oklch-color-list';
import { CssOutput } from './css-output';
import { OklchImportDialog } from './oklch-import-dialog';

type OklchGeneratorProps = {
  className?: string;
};

export function OklchGenerator({ className }: OklchGeneratorProps) {
  const {
    colors,
    addColor,
    updateColor,
    removeColor,
    clearColors,
    duplicateColor,
    importColors,
  } = useOklchGenerator();

  const addDefaultColor = () => {
    addColor(generateRandomOklchColor());
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">OKLCH Color Generator</h1>
          <p className="text-muted-foreground">Create and manage OKLCH colors with CSS variable output</p>
        </div>
        <div className="flex gap-2">
          <OklchImportDialog onImport={importColors}>
            <Button variant="outline">Import CSS</Button>
          </OklchImportDialog>
          {colors.length > 2 && (
            <Button variant="outline" onClick={clearColors}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <OklchColorList
            colors={colors}
            onUpdate={updateColor}
            onRemove={removeColor}
            onDuplicate={duplicateColor}
            onAdd={addDefaultColor}
          />
        </div>

        <div>
          <CssOutput colors={colors} />
        </div>
      </div>
    </div>
  );
}
