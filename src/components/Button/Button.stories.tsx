import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    theme: { control: false },
    inverse: { control: false },
    children: { control: 'text' },
    icon: {
      options: ['Add Icon', 'Filter Icon'],
      control: { type: 'select' },
      mapping: {
        'Add Icon': (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="svg-icon" width="16" height="16">
            <path d="M8 2c-.3 0-.6.3-.6.6v4.8H2.6c-.3 0-.6.3-.6.6s.3.6.6.6h4.8v4.8c0 .3.3.6.6.6.2 0 .3-.1.4-.2.1-.1.2-.3.2-.4V8.6h4.8c.2 0 .3-.1.4-.2.1-.1.2-.2.2-.4 0-.3-.3-.6-.6-.6H8.6V2.6c0-.3-.3-.6-.6-.6z"></path>
          </svg>
        ),
        'Filter Icon': (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.2 40.2" className="svg-icon" width="16" height="16">
            <path d="M3.4 7.2V33c0 2.3 1.8 4.1 4.1 4.1h25.8c2.3 0 4.1-1.8 4.1-4.1V7.2c0-2.3-1.8-4.1-4.1-4.1H7.5c-2.3 0-4.1 1.8-4.1 4.1zm29.9-2.7c1.5 0 2.7 1.2 2.7 2.7V33c0 1.5-1.2 2.7-2.7 2.7H7.5c-1.5 0-2.7-1.2-2.7-2.7V7.2c0-1.5 1.2-2.7 2.7-2.7h25.8z"></path>
            <path d="M10.1 27.2h-.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h.4c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H17.2c-.3-1.7-1.8-2.9-3.6-2.9-1.7 0-3.2 1.2-3.5 2.9zm5.7.7c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.3 0 2.2 1 2.2 2.2zm6.7-8.6H9.6c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h12.8c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-1.4c-.3-1.7-1.8-2.9-3.6-2.9-1.7-.1-3.2 1.2-3.5 2.9zm5.7.7c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-1.2 1-2.2 2.2-2.2s2.2.9 2.2 2.2zm-14.6-8.4h-4c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h4c.3 1.7 1.8 2.9 3.6 2.9s3.2-1.3 3.6-2.9H31c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H20.7c-.3-1.7-1.8-2.9-3.6-2.9s-3.2 1.3-3.5 2.9zm5.8.7c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2 2.2 1 2.2 2.2z"></path>
          </svg>
        ),
      },
    },
    round: { if: { arg: 'icon' } },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'solid',
    children: 'Button',
    color: 'default',
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Solid',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ILhnLAeRObDeYARnBkHJeN/Solid-Buttons?type=design&node-id=0%3A1&mode=design&t=HMXgDOa3qkm4yVem-1',
    },
  },
  render: (args) => (
    <>
      <Button {...args} color="default" />
      <Button {...args} color="primary" />
      <Button {...args} color="secondary" />
      <Button {...args} color="danger" />
      <Button {...args} color="info" />
      <Button {...args} color="success" />
      <Button {...args} color="warning" />
    </>
  ),
};

export const Borderless: Story = {
  args: {
    variant: 'borderless',
    children: 'Borderless',
  },
  render: Solid.render,
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    children: 'Inverse',
  },
  render: Solid.render,
};

/**
 * A link look-alike button. For actual href redirects, please use [Anchor](?path=/docs/components-anchor--docs) component
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
  parameters: {
    controls: { exclude: ['color'] },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width',
  },
  render: (args) => (
    <div style={{ display: 'flex', width: 600, gap: 24 }}>
      <Button {...args}>Secondary</Button>
      <Button {...args} color="primary">
        Primary
      </Button>
    </div>
  ),
};

export const IconButton: Story = {
  args: {
    'aria-label': 'add',
    icon: 'Add Icon',
  },
  argTypes: {
    'aria-label': { type: { required: true, name: 'string' }, description: 'Controls the label for the icon button.' },
  },
  render: Solid.render,
};

/**
 * Round buttons are only available when there is only icon
 */
export const IconButtonRound: Story = {
  args: {
    'aria-label': 'add',
    icon: 'Add Icon',
    round: true,
  },
  argTypes: {
    'aria-label': { type: { required: true, name: 'string' } },
  },
  parameters: {
    controls: { exclude: ['children'] },
  },
  render: Solid.render,
};

export const IconButtonWithLabel: Story = {
  args: {
    icon: 'Filter Icon',
    children: 'Filter',
  },
  parameters: {
    controls: { exclude: ['round'] },
  },
};
