import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils';
import { headingVariants } from './variants';

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

export { Heading };
