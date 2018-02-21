import React from 'react';
import Example from '../components/Example';
import { Pagination } from '../../src';

class PaginationExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };

    this.onSelect = pageNumber => {
      this.setState({ activePage: pageNumber });
    };
  }

  render() {
    const props = {
      items: 10,
      activePage: this.state.activePage,
      onSelect: this.onSelect,
      next: true,
      prev: true,
    };

    return (
      <div>
        <p>Current page is {this.state.activePage}</p>
        <Pagination {...props} />
      </div>
    );
  }
}

export const exampleProps = {
  componentName: 'Pagination',
  notes: (
    <p>
      See{' '}
      <a href="https://getbootstrap.com/docs/3.3/components/#pagination" target="_blank" rel="noopener noreferrer">
        Bootstrap documentation
      </a>{' '}
    </p>
  ),
  designNotes: '',
  exampleCodeSnippet: `<div>
  <Pagination
    items={10}
    activePage={1}
    onSelect={this.onSelect}
    next
    prev 
  />
</div>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'items',
          type: 'number',
          defaultValue: '',
          note: (
            <span>
              <strong>Required</strong>, a number determines the max page count
            </span>
          ),
        },
        {
          propType: 'activePage',
          type: 'number',
          defaultValue: 1,
          note: 'A number determines the current active page, should be between 1 and `items`',
        },
        {
          propType: 'onSelect',
          type: 'func',
          defaultValue: '',
          note: 'Required, a callback function for when clicking on previous, next and pagination buttons',
        },
        {
          propType: 'next',
          type: 'bool',
          defaultValue: <code>true</code>,
          note: 'determines if Next buton is displayed or not',
        },
        {
          propType: 'prev',
          type: 'bool',
          defaultValue: <code>true</code>,
          note: 'determines if Previous buton is displayed or not',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PaginationExample />
  </Example>
);
