import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Grid from './index';
import GridRow from './Row';
import GridCell from './Cell';

const meta = {
  title: 'Pending Review/Grid',
  component: Grid,
  tags: ['autodocs'],
  subcomponents: { GridCell, GridRow },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Grid>
        <GridRow type="header">
          <GridCell>Header</GridCell>
          <GridCell>Header</GridCell>
          <GridCell>Header</GridCell>
        </GridRow>
        <GridRow verticalCellBorder>
          <GridCell stretch>Body</GridCell>
          <GridCell>Content</GridCell>
          <GridCell>Content</GridCell>
        </GridRow>
        <GridRow>
          <GridCell>Body</GridCell>
          <GridCell>Content</GridCell>

          <GridCell
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('cell clicked');
            }}
          >
            This Cell logs clicks.
          </GridCell>
        </GridRow>
        <GridRow>
          <GridCell addonClassNames={['full-width']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus suscipit velit quis tempor.
          </GridCell>
        </GridRow>
        <GridRow type="subfooter">
          <GridCell>Subfooter</GridCell>
        </GridRow>
        <GridRow type="footer">
          <GridCell>Footer</GridCell>
        </GridRow>
      </Grid>
    );
  },
};
