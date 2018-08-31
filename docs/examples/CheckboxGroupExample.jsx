import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { CheckboxGroup, Checkbox } from '../../src';

class CheckboxGroupExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movies: ['terminator', 'predator'],
    };
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleGroupChange(movies) {
    this.setState({ movies });
  }

  render() {
    return (
      <React.Fragment>
        <CheckboxGroup name="movies" value={this.state.movies} onChange={this.handleGroupChange}>
          <Checkbox label="The Terminator" value="terminator" />
          <Checkbox label="Predator" value="predator" />
          <Checkbox label="The Sound of Music" value="soundofmusic" />
        </CheckboxGroup>
        <br />
        <h3>Inline CheckboxGroup</h3>
        <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={this.handleGroupChange} inline>
          <Checkbox label="The Terminator" value="terminator" />
          <Checkbox label="Predator" value="predator" />
          <Checkbox label="The Sound of Music" value="soundofmusic" />
        </CheckboxGroup>
      </React.Fragment>
    );
  }
}

const exampleProps = {
  componentName: 'CheckboxGroup',
  notes: 'Contains individual checkboxes. The state of child checkboxes is held in an array.',
  exampleCodeSnippet: `<CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup} inline={true|false}>
  <Checkbox label="The Terminator" value="terminator" />
  <Checkbox label="Predator" value="predator" />
  <Checkbox label="The Sound of Music" value="soundofmusic" />
</CheckboxGroup>`,
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
        },
        {
          propType: 'name',
          type: 'string',
          note: (
            <span>
              <strong>Required.</strong> All Checkboxes within this group will have the same name
            </span>
          ),
        },
        {
          propType: 'value',
          type: 'arrayOf(string: value, ...)',
          note: "The strings must be the values of the group's child Checkboxes",
        },
        {
          propType: 'children',
          type: 'arrayOf <Checkbox /> elements',
          note: <strong>Required.</strong>,
        },
        {
          propType: 'onChange',
          type: 'func',
          note: 'Triggers when selection changes.',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'inline',
          type: 'bool',
          note: 'Passing to each Checkbox component.',
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
