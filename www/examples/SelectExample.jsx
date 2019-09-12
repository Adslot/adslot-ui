import React from 'react';
import Example from '../components/Example';
import { Select } from '../../src';

const countryOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan', disabled: true },
  { value: 'uk', label: 'United Kingdom' },
];

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
      <React.Fragment>
        <h3>Single Select</h3>
        <Select
          isClearable={false}
          name="countriesSelect"
          noOptionsMessage={() => "Sorry, couldn't find that country."}
          options={countryOptions}
          placeholder="Countries"
          value={this.state.selected}
          onChange={this.onChangeHandler}
          dts="test-dts"
        />
        <h3>Multiple Select</h3>
        <Select
          isMulti
          name="countriesMultiSelect"
          noOptionsMessage={() => "Sorry, couldn't find that country."}
          options={countryOptions}
          placeholder="Countries"
          value={this.state.selected}
          onChange={this.onChangeHandler}
        />
        <h3>Creatable option</h3>
        <Select.Creatable
          isMulti
          name="countriesCreatableSelect"
          options={countryOptions}
          onChange={this.onChangeHandler}
          value={this.state.selected}
        />
      </React.Fragment>
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
  exampleCodeSnippet: `<h3>Single Select</h3>
<Select
  isClearable={false}
  name="countriesSelect"
  noOptionsMessage={() => "Sorry, couldn't find that country."}
  options={countryOptions}
  placeholder="Countries"
  value={this.state.selected}
  onChange={this.onChangeHandler}
/>
<h3>Multiple Select</h3>
<Select
  isMulti
  name="countriesMultiSelect"
  noOptionsMessage={() => "Sorry, couldn't find that country."}
  options={countryOptions}
  placeholder="Countries"
  value={this.state.selected}
  onChange={this.onChangeHandler}
/>
<h3>Creatable option</h3>
<Select.Creatable
  isMulti
  name="countriesCreatableSelect"
  options={countryOptions}
  onChange={this.onChangeHandler}
  value={this.state.selected}
/>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'isInModal',
          type: 'bool',
          defaultValue: <pre>false</pre>,
          note: 'can be used to display <Select /> in Modal, allow select options to overflow the modal container',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SelectExample />
  </Example>
);
