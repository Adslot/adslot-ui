import React from 'react';
import Example from '../components/Example';
import { SearchBar } from '../../src';

class SearchBarExample extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBarString: '',
    };
    this.setSearchBarString = this.setSearchBarString.bind(this);
    this.performSearchBarSearch = this.performSearchBarSearch.bind(this);
  }

  setSearchBarString(searchBarString) {
    this.setState({ searchBarString });
  }

  performSearchBarSearch() {
    return;
  }

  render() {
    return (
      <SearchBar
        searchString={this.state.searchBarString}
        searchPlaceholder="Enter a word or phrase to find matching items."
        searchIconHref="./docs/assets/svg-symbols.svg#search"
        onSearchStringChange={this.setSearchBarString}
        onSearch={this.performSearchBarSearch}
      />
    );
  }
}

const exampleProps = {
  componentName: 'SearchBar',
  designNotes: <p>Search Bar is commonly used above the pages designed to manage filter pills and search.</p>,
  exampleCodeSnippet: `
  <SearchBar
    searchString={this.state.searchBarString}
    searchPlaceholder="Enter a word or phrase to find matching items."
    searchIconHref="./docs/assets/svg-symbols.svg#search"
    onSearchStringChange={this.setSearchBarString}
    onSearch={this.performSearchBarSearch}
  />`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'additionalClassNames',
          type: 'array',
          defaultValue: <code>[]</code>,
          note: 'array of strings',
        },
        {
          propType: 'searchString',
          type: 'string',
          note: 'required',
        },
        {
          propType: 'searchPlaceholder',
          type: 'string',
        },
        {
          propType: 'searchIconHref',
          type: 'string',
          note: 'required',
        },
        {
          propType: 'onSearchStringChange',
          type: 'func',
          note: 'required',
        },
        {
          propType: 'onSearch',
          type: 'func',
          note: 'required',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SearchBarExample />
  </Example>
);
