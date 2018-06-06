import React from 'react';
import Example from '../components/Example';
import Radio from 'adslot-ui/Radio';

class RadioExample extends React.PureComponent {
  onChange(event) {
    _.noop();
  }

  render() {
    return (
      <Radio
        name="Radio button name"
        label="Radio button label"
        dts="radio-button-data-test-selector"
        value="Radio button value"
        onChange={this.onChange}
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
  onChange={this.onChange}
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
          type: 'string',
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
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <RadioExample />
  </Example>
);
