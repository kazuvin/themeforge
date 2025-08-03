import type { Meta, StoryObj } from '@storybook/react';
import { CssOutput } from '../css-output';

const sampleCssOutput = `@theme {
  --color-primary: oklch(55% 0.224 264);
  --color-secondary: oklch(96.1% 0.014 264);
  --color-destructive: oklch(55% 0.206 27);
  --color-accent-with-alpha: oklch(73.9% 0.155 53 / 0.8);
}`;

const meta: Meta<typeof CssOutput> = {
  title: 'Features/OKLCH Generator/CSS Output',
  component: CssOutput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onCopy: { action: 'copied' },
  },
};

export default meta;

type Story = StoryObj<typeof CssOutput>;

export const Default: Story = {
  args: {
    cssOutput: sampleCssOutput,
    onCopy: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    },
  },
};

export const Empty: Story = {
  args: {
    cssOutput: '@theme {\n\n}',
    onCopy: async () => true,
  },
};

export const CopyError: Story = {
  args: {
    cssOutput: sampleCssOutput,
    onCopy: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return false;
    },
  },
};
