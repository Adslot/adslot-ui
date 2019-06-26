import React from 'react';
import Example from '../components/Example';
import { TileGrid } from '../../src';

const exampleImageLink = './assets/tileGrid/example-image.jpg';

class TileGridExample extends React.PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return;
  }

  render() {
    return (
      <TileGrid
        title="Browse by category"
        items={[
          { id: '0', classSuffix: 'news', title: 'News', imgLink: exampleImageLink },
          { id: '1', classSuffix: 'sport', title: 'Sport', imgLink: exampleImageLink, imgAlign: 'center' },
          { id: '2', classSuffix: 'health', title: 'Health & Fitness', imgLink: exampleImageLink, imgAlign: 'right' },
          { id: '3', classSuffix: 'tech', title: 'Technology & Computing' },
        ]}
        onItemClick={this.onClick}
        distributed
      />
    );
  }
}

const exampleProps = {
  componentName: 'Tile Grid',
  exampleCodeSnippet: `
  <TileGrid
    title="Browse by category"
    items={[
      { id: '0', classSuffix: 'news', title: 'News', imgLink: exampleImageLink },
      { id: '1', classSuffix: 'sport', title: 'Sport', imgLink: exampleImageLink, imgAlign: 'center' },
      { id: '2', classSuffix: 'health', title: 'Health & Fitness', imgLink: exampleImageLink, imgAlign: 'right' },
      { id: '3', classSuffix: 'tech', title: 'Technology & Computing' },
    ]}
    onItemClick={this.onClick}
    distributed
  />`,
  propTypeSectionArray: [
    {
      label: 'TileGrid',
      propTypes: [
        {
          propType: 'title',
          type: 'string',
        },
        {
          propType: 'items',
          type: 'arrayOf(item object)',
          note: 'The shape of item object is defined below',
        },
        {
          propType: 'onItemClick',
          type: 'func',
        },
        {
          propType: 'distributed',
          type: 'bool',
          defaultValue: 'false',
          note: 'If distributed is true, each tile in this component will have a distributed width.',
        },
      ],
    },
    {
      label: '(Item Object)',
      propTypes: [
        {
          propType: 'id',
          type: 'string || number',
          note: 'required',
        },
        {
          propType: 'classSuffix',
          type: 'string',
          note: 'required',
        },
        {
          propType: 'title',
          type: 'string',
          note: 'required',
        },
        {
          propType: 'imgLink',
          type: 'string',
          note: 'Address link used for background image of each tile.',
        },
        {
          propType: 'width',
          type: 'number',
          defaultValue: '204',
          note: 'Defining width of each tile. (In pixels)',
        },
        {
          propType: 'maxWidth',
          type: 'number',
          defaultValue: '295',
          note: 'Defining max-width of each tile. (In pixels)',
        },
        {
          propType: 'imgAlign',
          type: `oneOf('left', 'right', 'center')`,
          defaultValue: 'left',
          note: 'Used for defining the position of background image. (Only working if imgLink is defined)',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TileGridExample />
  </Example>
);
