import React from 'react';
import Example from '../components/Example';
import { Select } from '../../src';

class SelectExample extends React.PureComponent {
  state = { selected: null };

  onChangeHandler = value => {
    this.setState({ selected: value });
  };

  render() {
    return (
      <>
        <h3>Single selection</h3>
        <Select
          noOptionsMessage={() => "Sorry, couldn't find that country."}
          options={[
            { value: 'au', label: 'Australia' },
            { value: 'ca', label: 'Canada' },
            { value: 'jp', label: 'Japan' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
          isOptionDisabled={({ value }) => value === 'jp'}
          placeholder="Select single country"
          value={this.state.selected}
          onChange={this.onChangeHandler}
          isClearable
        />
        <br />
        <h3>Multiple selection</h3>
        <Select
          noOptionsMessage={({ inputValue }) =>
            inputValue ? "Sorry, couldn't find that country." : 'No more countries'
          }
          options={[
            { value: 'au', label: 'Australia' },
            { value: 'ca', label: 'Canada' },
            { value: 'jp', label: 'Japan' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
          closeMenuOnSelect={false}
          placeholder="Select multiple country"
          value={this.state.selected}
          onChange={this.onChangeHandler}
          isClearable
          isMulti
        />
      </>
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
  exampleCodeSnippet: `
  <Select
    noOptionsMessage={() => "Sorry, couldn't find that country."}
    options={[
      { value: 'au', label: 'Australia' },
      { value: 'ca', label: 'Canada' },
      { value: 'jp', label: 'Japan' },
      { value: 'uk', label: 'United Kingdom' },
    ]}
    isOptionDisabled={({ value }) => value === 'jp'}
    placeholder="Select single country"
    value={this.state.selected}
    onChange={this.onChangeHandler}
    isClearable
  />

  <Select
    noOptionsMessage={({ inputValue }) => inputValue ? "Sorry, couldn't find that country." : "No more countries"}
    options={[
      { value: 'au', label: 'Australia' },
      { value: 'ca', label: 'Canada' },
      { value: 'jp', label: 'Japan' },
      { value: 'uk', label: 'United Kingdom' },
    ]}
    closeMenuOnSelect={false}
    placeholder="Select multiple country"
    value={this.state.selected}
    onChange={this.onChangeHandler}
    isClearable
    isMulti
  />`,
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <SelectExample />
  </Example>
);
