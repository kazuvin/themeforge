import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '../header'

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    showMobileMenu: {
      control: 'boolean',
    },
    companyName: {
      control: 'text',
    },
    logoSrc: {
      control: 'text',
    },
    logoAlt: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithMobileMenuOpen: Story = {
  args: {
    showMobileMenu: true,
  },
}

export const CustomBranding: Story = {
  args: {
    companyName: 'ThemeForge',
    logoSrc: 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=purple&shade=600',
    navigationItems: [
      { label: 'Templates', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Themes', href: '#' },
      { label: 'About', href: '#' },
    ],
  },
}