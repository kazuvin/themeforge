import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import type { OklchColor } from '../types';
import { formatOklchValue } from '../utils';

interface OklchColorListProps {
  colors: OklchColor[];
  onUpdate: (id: string, updates: Partial<Omit<OklchColor, 'id'>>) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onAdd: () => void;
  className?: string;
}

interface ColorItemProps {
  color: OklchColor;
  onUpdate: (updates: Partial<Omit<OklchColor, 'id'>>) => void;
  onRemove: () => void;
  onDuplicate: () => void;
}

function ColorItem({ color, onUpdate, onRemove, onDuplicate }: ColorItemProps) {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editName, setEditName] = React.useState(color.name);

  const handleNameEdit = () => {
    if (isEditingName) {
      onUpdate({ name: editName.trim() });
    }
    setIsEditingName(!isEditingName);
  };

  const handleInputBlur = () => {
    // Use setTimeout to allow button click to execute first
    setTimeout(() => {
      if (isEditingName) {
        onUpdate({ name: editName.trim() });
        setIsEditingName(false);
      }
    }, 0);
  };

  const handleValueChange = (field: keyof OklchColor, value: number) => {
    onUpdate({ [field]: value });
  };

  const colorValue = formatOklchValue(color);

  return (
    <div className="border-border flex flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div
          className="border-border h-16 w-16 flex-shrink-0 rounded-md border"
          style={{ backgroundColor: colorValue }}
        />

        <div className="min-w-0 flex-1">
          {isEditingName ? (
            <Input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameEdit();
                if (e.key === 'Escape') {
                  setEditName(color.name);
                  setIsEditingName(false);
                }
              }}
              className="h-8 px-2 py-1 text-xs font-medium"
              autoFocus
            />
          ) : (
            <div className="space-y-1">
              <h4 className="truncate text-sm font-medium">{color.name}</h4>
              <p className="text-muted-foreground font-mono text-xs">{colorValue}</p>
            </div>
          )}
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNameEdit}
            onMouseDown={(e) => e.preventDefault()}
            className="h-8 w-8 p-0"
          >
            {isEditingName ? '✓' : '✎'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDuplicate} className="h-8 w-8 p-0">
            ⧉
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Lightness (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={color.lightness}
            onChange={(e) => handleValueChange('lightness', parseFloat(e.target.value) || 0)}
            className="h-8 px-2 py-1 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Chroma</label>
          <Input
            type="number"
            min="0"
            max="0.5"
            step="0.001"
            value={color.chroma}
            onChange={(e) => handleValueChange('chroma', parseFloat(e.target.value) || 0)}
            className="h-8 px-2 py-1 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Hue (°)</label>
          <Input
            type="number"
            min="0"
            max="360"
            step="1"
            value={color.hue}
            onChange={(e) => handleValueChange('hue', parseFloat(e.target.value) || 0)}
            className="h-8 px-2 py-1 text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Alpha</label>
          <Input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={color.alpha || 1}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 1;
              onUpdate({ alpha: value === 1 ? undefined : value });
            }}
            className="h-8 px-2 py-1 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

function AddColorButton({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="border-border hover:border-ring hover:bg-accent/50 flex w-full cursor-pointer flex-col gap-3 rounded-lg border-2 border-dashed p-4 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="border-border bg-muted/50 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md border-2 border-dashed">
          <span className="text-muted-foreground text-2xl">+</span>
        </div>
        <div className="flex-1 text-left">
          <h4 className="text-muted-foreground text-sm font-medium">Add New Color</h4>
          <p className="text-muted-foreground text-xs">Click to add a new OKLCH color</p>
        </div>
      </div>
    </button>
  );
}

export function OklchColorList({ colors, onUpdate, onRemove, onDuplicate, onAdd, className }: OklchColorListProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Colors ({colors.length})</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          Add Color
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {colors.map((color) => (
          <ColorItem
            key={color.id}
            color={color}
            onUpdate={(updates) => onUpdate(color.id, updates)}
            onRemove={() => onRemove(color.id)}
            onDuplicate={() => onDuplicate(color.id)}
          />
        ))}
        <AddColorButton onAdd={onAdd} />
      </CardContent>
    </Card>
  );
}
