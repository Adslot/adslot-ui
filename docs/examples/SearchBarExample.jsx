import React from 'react';
import Example from '../components/Example';
import {
  SearchBar,
} from '../../src/dist-entry';

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
        searchIconHref="/assets/svg-symbols.svg#search"
        onSearchStringChange={this.setSearchBarString}
        onSearch={this.performSearchBarSearch}
      />
    );
  }
}


const exampleProps = {
  componentName: 'SearchBar',
  exampleCodeSnippet: `<SearchBar
  searchString={this.state.searchBarString}
  searchPlaceholder="Enter a word or phrase to find matching items."
  searchIconHref="/assets/svg-symbols.svg#search"
  onSearchStringChange={this.setSearchBarString}
  onSearch={this.performSearchBarSearch}
/>`,
  propTypes: [
    {
      propType: 'additionalClassNames',
      type: 'array',
      defaultValue: '',
      note: 'array of strings',
    },
    {
      propType: 'searchString',
      type: 'string',
      defaultValue: '',
      note: 'required',
    },
    {
      propType: 'searchPlaceholder',
      type: 'string',
      defaultValue: '',
      note: '',
    },
    {
      propType: 'searchIconHref',
      type: 'string',
      defaultValue: '',
      note: 'required',
    },
    {
      propType: 'onSearchStringChange',
      type: 'func',
      defaultValue: '',
      note: 'required',
    },
    {
      propType: 'onSearch',
      type: 'func',
      defaultValue: '',
      note: 'required',
    },
    {
      propType: 'dts',
      type: 'string',
      defaultValue: '',
      note: '',
    },
  ],
};


export default () => <Example {...exampleProps}><SearchBarExample /></Example>;
