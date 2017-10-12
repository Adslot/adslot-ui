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
  propTypes: [{
    propType: 'value',
    type: 'string',
    note: 'As value within search component is uncontrolled we need to pass in the search value externally.',
  }, {
    propType: 'onChange',
    type: 'func',
  }, {
    propType: 'onSearch',
    type: 'func',
  }, {
    propType: 'debounceInterval',
    type: 'number',
    defaultValue: '0',
  }, {
    propType: 'isLoading',
    type: 'bool',
    defaultValue: 'false',
  }],
};


export default () => <Example {...exampleProps}><SearchExample /></Example>;
