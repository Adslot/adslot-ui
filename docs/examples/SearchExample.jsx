import React from 'react';
import Example from '../components/Example';
import { Search } from '../../src';

class SearchExample extends React.PureComponent {
  state = {
    value: '',
  };

  onChange = value => {
    this.setState({
      value,
    });
  };

  searchOnInputChange = () => {
    this.setState({
      searchOnInputChangeLoading: true,
    });
    setTimeout(() => this.setState({ searchOnInputChangeLoading: false }), 950);
  };

  searchOnEnterKey = value => {
    this.setState({
      searchOnEnterKeyLoading: true,
    });
    setTimeout(
      () => this.setState({ searchOnEnterKeyLoading: false }, () => alert(`You are searching for '${value}'`)),
      950
    );
  };

  render() {
    return (
      <>
        Search on input Changed
        <Search
          placeholder="Search on Change"
          value={this.state.value}
          onChange={this.onChange}
          onSearch={this.searchOnInputChange}
          debounceInterval={500}
          isLoading={this.state.searchOnInputChangeLoading}
        />
        <br />
        Search on Enter key pressed
        <Search
          placeholder="Search on ENTER"
          isLoading={this.state.searchOnEnterKeyLoading}
          onSearch={this.searchOnEnterKey}
          searchOnEnter
        />
      </>
    );
  }
}

const exampleProps = {
  componentName: 'Search',
  notes:
    'Search with search button is commonly used above the pages designed to manage filter pills and search while Search without search button is more commonly used within the pickers and modals.',
  exampleCodeSnippet: `
  <Search
    placeholder="Search on ENTER" 
    onSearch={this.onSearch} 
    searchOnEnter
  />`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'className',
          type: 'string',
          defaultValue: '-',
        },
        {
          propType: 'debounceInterval',
          type: 'number',
          defaultValue: '0',
          note: 'Milliseconds',
        },
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: 'false',
          note: 'Determine whether the text area is disabled',
        },
        {
          propType: 'dts',
          type: 'string',
          defaultValue: '-',
          note: 'Render `data-test-selector` onto the component. It can be useful for testing',
        },
        {
          propType: 'icons',
          type: 'object',
          defaultValue: '{}',
          note: `{
            search: React.Node,
            loader: React.Node,
            close: React.Node
          }`,
        },
        {
          propType: 'isLoading',
          type: 'bool',
          defaultValue: 'false',
        },
        {
          propType: 'onChange',
          type: 'func',
          defaultValue: '-',
        },
        {
          propType: 'onClear',
          type: 'func',
          defaultValue: '-',
        },
        {
          propType: 'onSearch',
          type: 'func',
          defaultValue: '-',
          note: 'Required',
        },
        {
          propType: 'placeholder',
          type: 'string',
          defaultValue: '',
        },
        {
          propType: 'searchOnEnter',
          type: 'bool',
          defaultValue: 'false',
          note:
            'Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)',
        },
        {
          propType: 'value',
          type: 'string',
          defaultValue: '',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SearchExample />
  </Example>
);
