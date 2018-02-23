import React from 'react';
import Example from '../components/Example';
import { PagedGrid } from '../../src';

class PagedGridExample extends React.PureComponent {
  render() {
    return (
      <PagedGrid
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'givenName', label: 'Given Name', stretch: true },
          { key: 'surname', label: 'Surname', stretch: true },
        ]}
        items={[
          { givenName: 'John', id: 1, surname: 'Smith' },
          { givenName: 'Jane', id: 2, surname: 'Doe' },
          { givenName: 'Jack', id: 3, surname: 'White' },
        ]}
        verticalCellBorder
        perPage={2}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Paged Grid',
  exampleCodeSnippet: `<PagedGrid
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'givenName', label: 'Given Name', stretch: true },
    { key: 'surname', label: 'Surname', stretch: true },
  ]}
  items={[
    { givenName: 'John', id: 1, surname: 'Smith' },
    { givenName: 'Jane', id: 2, surname: 'Doe' },
    { givenName: 'Jack', id: 3, surname: 'White' },
  ]}
  verticalCellBorder
  perPage={2}
/>`,
  propTypes: [
    {
      propType: 'columns',
      type: 'arrayOf({ string: key, node: label, bool: stretch })',
    },
    {
      propType: 'emptyIcon',
      type: 'string',
    },
    {
      propType: 'emptyMessage',
      type: 'string',
    },
    {
      propType: 'emptySvgSymbol',
      type: (
        <span>
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
        </span>
      ),
    },
    {
      propType: 'items',
      type: 'arrayOf({ node: id })',
    },
    {
      propType: 'perPage',
      type: 'number',
    },
    {
      propType: 'verticalCellBorder',
      type: 'boolean',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PagedGridExample />
  </Example>
);
