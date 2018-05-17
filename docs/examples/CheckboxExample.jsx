import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { Checkbox } from '../../src';

const onChange = (value, event, name) => {
  _.noop();
};

class CheckboxExample extends React.PureComponent {
  render() {
    return (
      <Checkbox
        name="Name goes here"
        label="Label goes here"
        value="Value goes here"
        dts="data-test-selector-goes-here"
        onChange={onChange}
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
	checked={true}
	disabled={true}
	dts="data-test-selector-goes-here"
/>`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
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
          note: 'Required.',
        },
        {
          propType: 'checked',
          type: 'bool',
        },
        {
          propType: 'disabled',
          type: 'bool',
        },
        {
          propType: 'dts',
          type: 'string',
        },
        {
          propType: 'onChange',
          type: 'function',
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
