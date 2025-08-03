import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { cn } from '~/utils';

interface CssOutputProps {
  cssOutput: string;
  onCopy: () => Promise<boolean>;
  className?: string;
}

export function CssOutput({ cssOutput, onCopy, className }: CssOutputProps) {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    const success = await onCopy();
    setCopyStatus(success ? 'copied' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const getCopyButtonText = () => {
    switch (copyStatus) {
      case 'copied':
        return 'Copied!';
      case 'error':
        return 'Error';
      default:
        return 'Copy to Clipboard';
    }
  };

  const isEmpty = !cssOutput.trim() || cssOutput === '@theme {\n\n}';

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>CSS Output</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={isEmpty || copyStatus === 'copied'}
          className={cn(
            copyStatus === 'copied' && 'border-green-200 bg-green-50 text-green-700',
            copyStatus === 'error' && 'border-red-200 bg-red-50 text-red-700',
          )}
        >
          {getCopyButtonText()}
        </Button>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="text-muted-foreground flex items-center justify-center py-8">
            Add colors to see CSS output
          </div>
        ) : (
          <pre className="bg-muted overflow-x-auto rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
            {cssOutput}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
