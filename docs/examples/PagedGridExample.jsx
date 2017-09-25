import React from 'react';
import Example from '../components/Example';
import {
  PagedGrid,
} from '../../src/dist-entry';

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
      type: 'array',
    },
    {
      propType: 'items',
      type: 'array',
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


export default () => <Example {...exampleProps}><PagedGridExample /></Example>;
