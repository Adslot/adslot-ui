import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { CheckboxGroup, Checkbox } from '../../src';

const onChangeGroup = (value, event, name) => {
  _.noop();
};

const onChangeIndividual = (value, event, name) => {
  _.noop();
};

class CheckboxGroupExample extends React.PureComponent {
  render() {
    return (
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" onChange={onChangeIndividual} />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
  }
}

const exampleProps = {
  componentName: 'CheckboxGroup',
  notes: 'Contains individual checkboxes. The state of child checkboxes is held in an array.',
  exampleCodeSnippet: `<CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
  <Checkbox label="The Terminator" value="terminator" onChange={onChangeIndividual} />
  <Checkbox label="Predator" value="predator" />
  <Checkbox label="The Sound of Music" value="soundofmusic" />
</CheckboxGroup>`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'name',
          type: 'string',
        },
        {
          propType: 'value',
          type: 'arrayOf(string: value, ...)',
          note: "The strings must be the values of the group's child Checkboxes",
        },
        {
          propType: 'children',
          type: '<Checkbox /> elements',
        },
        {
          propType: 'onChange',
          type: 'Function',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CheckboxGroupExample />
  </Example>
);
