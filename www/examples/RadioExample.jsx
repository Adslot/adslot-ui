import React from 'react';
import Example from '../components/Example';
import { Radio } from 'adslot-ui';

class RadioExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState(prevState => ({
      isSelected: !prevState.isSelected,
    }));
  }

  render() {
    return (
      <Radio
        name="Radio button name"
        label="Radio button label"
        dts="radio-button-data-test-selector"
        value="Radio button value"
        checked={this.state.isSelected}
        onChange={this.handleChange}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Radio',
  notes: '',
  exampleCodeSnippet: `<Radio
  name="Radio button name"
  label="Radio button label"
  dts="radio-button-data-test-selector"
  value="Radio button value"
  checked={this.state.isSelected}
  onChange={this.handleChange}
/>`,
  propTypeSectionArray: [
    {
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
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'checked',
          type: 'bool',
          defaultValue: <code>false</code>,
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
    <RadioExample />
  </Example>
);
