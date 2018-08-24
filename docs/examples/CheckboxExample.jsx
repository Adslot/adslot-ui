import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { Checkbox } from '../../src';

class CheckboxExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }));
  }

  render() {
    return (
      <Checkbox
        name="Name goes here"
        label="Label goes here"
        value="Value goes here"
        dts="data-test-selector-goes-here"
        onChange={this.handleChange}
        checked={this.state.isChecked}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Checkbox',
  notes: '',
  exampleCodeSnippet: `<Checkbox
  name="Name goes here"
  label="Label goes here"
  value="Value goes here"
  dts="data-test-selector-goes-here"
  onChange={this.handleChange}
  checked={this.state.isChecked}
/>`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'id',
          type: 'string',
        },
        {
          propType: 'className',
          type: 'string',
          note: 'This class will be applied to the input element',
        },
        {
          propType: 'name',
          type: 'string',
        },
        {
          propType: 'label',
          type: 'node',
        },
        {
          propType: 'value',
          type: 'string',
        },
        {
          propType: 'checked',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'dts',
          type: 'string',
        },
        {
          propType: 'onChange',
          type: 'func',
        },
        {
          propType: 'inline',
          type: 'bool',
          note: 'Set this component to be `display: inline-block`.',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CheckboxExample />
  </Example>
);
