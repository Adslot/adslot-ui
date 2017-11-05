import React from 'react';
import Example from '../components/Example';
import {
  Grid,
  GridCell,
  GridRow,
} from '../../src/dist-entry';

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
          <GridCell stretch>Content</GridCell>
          <GridCell>Content</GridCell>
          <GridCell>Content</GridCell>
        </GridRow>
        <GridRow>
          <GridCell>Content</GridCell>
          <GridCell>Content</GridCell>
          <GridCell onClick={cellClicked}>This Cell logs clicks.</GridCell>
        </GridRow>
      </Grid>
    );
  }
}


const exampleProps = {
  componentName: 'Grid',
  exampleCodeSnippet: `<Grid>
  <GridRow type="header">
    <GridCell>Header</GridCell>
    <GridCell>Header</GridCell>
    <GridCell>Header</GridCell>
  </GridRow>
  <GridRow verticalCellBorder>
    <GridCell stretch>Content</GridCell>
    <GridCell>Content</GridCell>
    <GridCell>Content</GridCell>
  </GridRow>
  <GridRow>
    <GridCell>Content</GridCell>
    <GridCell>Content</GridCell>
    <GridCell onClick={cellClicked}>This Cell logs clicks.</GridCell>
  </GridRow>
</Grid>`,
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
};


export default () => <Example {...exampleProps}><GridExample /></Example>;
