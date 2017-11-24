import React from 'react';
import Example from '../components/Example';
import {
  Search,
} from '../../src/dist-entry';


class SearchExample extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  onSearch() {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => this.setState({ isLoading: false }), 950);
  }

  render() {
    return (<Search
      value={this.state.value}
      onChange={this.onChange}
      onSearch={this.onSearch}
      debounceInterval={350}
      isLoading={this.state.isLoading}
    />);
  }
}


const exampleProps = {
  componentName: 'Search',
  exampleCodeSnippet: `<Search
  value={this.state.value}
  onChange={this.onChange}
  onSearch={this.onSearch}
  debounceInterval={350}
  isLoading={this.state.isLoading}
/>`,
  propTypes: [
    {
      propType: 'disabled',
      type: 'bool',
      defaultValue: 'false',
      note: 'determine if the Search bar is disabled',
    },
    {
      propType: 'isLoading',
      type: 'bool',
      defaultValue: 'false',
    },
    {
      propType: 'onChange',
      type: 'func',
      note: <pre>onChange(value)</pre>,
    },
    {
      propType: 'onClear',
      type: 'func',
      note: <pre>onClear(value)</pre>,
    },
    {
      propType: 'onSearch',
      type: 'func',
      note: <pre>onSearch(value)</pre>,
    },
    {
      propType: 'placeholder',
      type: 'string',
      defaultValue: <pre>&apos;&apos;</pre>,
    },
    {
      propType: 'svgSymbolCancel',
      type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
      defaultValue: (
        <pre>
          {JSON.stringify({ classSuffixes: ['gray-darker'], href: './docs/assets/svg-symbols.svg#cancel' })}
        </pre>
      ),
    },
    {
      propType: 'svgSymbolSearch',
      type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
      defaultValue: (
        <pre>
          {JSON.stringify({ classSuffixes: ['gray-light'], href: './docs/assets/svg-symbols.svg#search' })}
        </pre>
      ),
    },
    {
      propType: 'value',
      type: 'string',
      defaultValue: <pre>&apos;&apos;</pre>,
      note: 'As value within search component is uncontrolled we need to pass in the search value externally.',
    },
    {
      propType: 'searchOnChange',
      type: 'bool',
      defaultValue: 'true',
      note: 'determine if onSearch() will be fired upon text changes',
    },
    {
      propType: 'searchOnEnterKey',
      type: 'bool',
      defaultValue: 'false',
      note: 'determine if onSearch() will be fired upon pressing Enter key',
    },
    {
      propType: 'debounceInterval',
      type: 'number',
      defaultValue: '0',
    },
  ],
};


export default () => <Example {...exampleProps}><SearchExample /></Example>;
