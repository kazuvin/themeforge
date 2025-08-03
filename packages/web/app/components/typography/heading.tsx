import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils';

const headingVariants = cva('font-semibold text-foreground tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-2xl lg:text-3xl',
      h4: 'text-xl lg:text-2xl',
      h5: 'text-lg lg:text-xl',
      h6: 'text-base lg:text-lg',
    },
    variant: {
      default: '',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    level: 'h1',
    variant: 'default',
  },
});

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h1', variant, ...props }, ref) => {
    const Comp = level;
    return <Comp className={cn(headingVariants({ level, variant, className }))} ref={ref} {...props} />;
  },
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
