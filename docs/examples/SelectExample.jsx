import React from 'react';
import Example from '../components/Example';
import { Select } from '../../src';

class SelectExample extends React.Component {
  constructor() {
    super();
    this.state = { selected: '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(value) {
    this.setState({ selected: value });
  }

  render() {
    return (
      <Select
        clearable={false}
        name="countriesSelect"
        noResultsText="Sorry, couldn't find that country."
        options={[
          { value: 'au', label: 'Australia' },
          { value: 'ca', label: 'Canada' },
          { value: 'jp', label: 'Japan', disabled: true },
          { value: 'uk', label: 'United Kingdom' },
        ]}
        placeholder="Countries"
        value={this.state.selected}
        onChange={this.onChangeHandler}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Select',
  designNotes: (
    <p>
      <span className="text-bold">Select</span> When a single selection from more than 3 options is required the select
      drop down should be used.
    </p>
  ),
  notes: (
    <p>
      See <a href="https://github.com/JedWatson/react-select">React Select Documentation</a>
    </p>
  ),
  exampleCodeSnippet: `<Select
    clearable={false}
    name="countriesSelect"
    noResultsText="Sorry, couldn't find that country."
    options={[
      { value: 'au', label: 'Australia' },
      { value: 'ca', label: 'Canada' },
      { value: 'jp', label: 'Japan', disabled: true },
      { value: 'uk', label: 'United Kingdom' },
    ]}
    placeholder="Countries"
    value={this.state.selected}
    onChange={this.onChangeHandler}
  />`,
  propTypes: [],
};

export default () => (
  <Example {...exampleProps}>
    <SelectExample />
  </Example>
);
