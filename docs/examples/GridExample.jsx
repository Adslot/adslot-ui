import React from 'react';
import Example from '../components/Example';
import { Grid, GridCell, GridRow } from '../../src';

const cellClicked = () => console.log('Cell clicked');

class GridExample extends React.PureComponent {
  render() {
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
          <GridCell onClick={cellClicked}>This Cell logs clicks.</GridCell>
        </GridRow>
        <GridRow>
          <GridCell addonClassNames={['full-width']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus suscipit velit quis tempor. Nunc
            non lorem viverra, tincidunt dui ut, dictum enim. Nam quis ligula ac mi egestas scelerisque. Phasellus
            posuere tellus quis nisl vulputate efficitur. Nulla laoreet ut ex vitae pharetra. Vivamus felis eros,
            finibus fringilla turpis ut, convallis maximus mi.
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
  }
}

const exampleProps = {
  componentName: 'Grid',
  exampleCodeSnippet: `
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
      <GridCell onClick={cellClicked}>This Cell logs clicks.</GridCell>
    </GridRow>
    <GridRow>
      <GridCell addonClassNames={['full-width']}> //full-width { width: 100%; }
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus suscipit velit quis tempor. Nunc
      non lorem viverra, tincidunt dui ut, dictum enim. Nam quis ligula ac mi egestas scelerisque. Phasellus
      posuere tellus quis nisl vulputate efficitur. Nulla laoreet ut ex vitae pharetra. Vivamus felis eros,
      finibus fringilla turpis ut, convallis maximus mi.
      </GridCell>
    </GridRow>
    <GridRow type="subfooter">
      <GridCell>Subfooter</GridCell>
    </GridRow>
    <GridRow type="footer">
      <GridCell>Footer</GridCell>
    </GridRow>
  </Grid>`,
  propTypeSectionArray: [
    {
      label: 'Grid',
      propTypes: [
        {
          propType: 'children',
          type: 'node',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
      ],
    },
    {
      label: 'GridRow',
      propTypes: [
        {
          propType: 'children',
          type: 'node',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'horizontalBorder',
          type: 'bool',
          defaultValue: 'true',
          note: 'If setting to true, it will show the border between two GridRows.',
        },
        {
          propType: 'short',
          type: 'bool',
          defaultValue: 'false',
          note: 'If setting to true, it will have less padding.',
        },
        {
          propType: 'type',
          type: `oneOf('body', 'header', 'subfooter', 'footer')`,
          defaultValue: `'body'`,
          note: 'Providing 4 pre-configured styles.',
        },
        {
          propType: 'verticalCellBorder',
          type: 'bool',
          defaultValue: 'false',
          note: 'If setting to true, it will show the border between each GridCells.',
        },
      ],
    },
    {
      label: 'GridCell',
      propTypes: [
        {
          propType: 'addonClassNames',
          type: 'arrayOf(String)',
          note: 'Used to apply custom classes to this cell.',
        },
        {
          propType: 'children',
          type: 'node',
        },
        {
          propType: 'classSuffixes',
          type: 'arrayOf(String)',
          defaultValue: <pre>[]</pre>,
          note: `Every element provided in this prop, will generate a className like 'grid-component-cell-something'.`,
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'onClick',
          type: 'func',
          note: 'A function triggerd when user clicks this cell.',
        },
        {
          propType: 'stretch',
          type: 'bool',
          defaultValue: 'false',
          note: `The stretch cell will use most space is this row and minimize other cells' space.`,
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <GridExample />
  </Example>
);
