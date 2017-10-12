import React from 'react';
import Example from '../components/Example';
import Checkbox from 'react-icheck/lib/Checkbox';
import {
  ListPicker,
  Button,
} from '../../src/dist-entry';

const teamMember1 = { avatar: '//lorempixel.com/35/35/people/7', givenName: 'John', id: 1, surname: 'Smith' };
const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };
const listPickerItems = [teamMember1, teamMember2, teamMember3];
const listPickerInitialSelection = [teamMember2];
const labelFormatter = (item) => `${item.givenName} ${item.surname}`;
const addonFormatter = () => (<Checkbox />);
const listPickerItemHeaders = {
  label: 'Team',
  toggle: 'Primary',
  addon: 'Secondary',
};

class ListPickerExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showListPickerModal: false,
    };
    this.toggleListPickerModal = this.toggleListPickerModal.bind(this);
  }

  toggleListPickerModal() {
    this.setState({ showListPickerModal: !this.state.showListPickerModal });
  }

  render() {
    return (
      <div>
        <ListPicker
          allowMultiSelection={false}
          initialSelection={listPickerInitialSelection}
          itemHeaders={listPickerItemHeaders}
          items={listPickerItems}
          itemType="user"
          labelFormatter={labelFormatter}
          addonFormatter={addonFormatter}
          modalClose={this.toggleListPickerModal}
          modalApply={this.toggleListPickerModal}
          modalDescription="Please select the user that you want."
          modalFootnote="You can select one user."
          modalTitle="Select User"
          show={this.state.showListPickerModal}
        />
        <Button bsStyle="primary" className="btn-inverse" onClick={this.toggleListPickerModal}>Request Approval</Button>
      </div>
    );
  }
}


const exampleProps = {
  componentName: 'List Picker',
  exampleCodeSnippet: `
    <ListPicker
      allowMultiSelection={false}
      initialSelection={listPickerInitialSelection}
      itemHeaders={listPickerItemHeaders}
      items={listPickerItems}
      itemType="user"
      labelFormatter={labelFormatter}
      addonFormatter={addonFormatter}
      modalClose={this.toggleListPickerModal}
      modalApply={this.toggleListPickerModal}
      modalDescription="Please select the user that you want."
      modalFootnote="You can select one user."
      modalTitle="Select User"
      show={this.state.showListPickerModal}
    />
`,
  propTypes: [
    {
      propType: 'allowEmptySelection',
      type: 'boolean',
      defaultValue: 'true',
    },
    {
      propType: 'allowMultiSelection',
      type: 'boolean',
      defaultValue: 'true',
    },
    {
      propType: 'initialSelection',
      type: 'array',
    },
    {
      propType: 'itemHeaders',
      type: 'object',
    },
    {
      propType: 'items',
      type: 'array',
    },
    {
      propType: 'itemType',
      type: 'string',
    },
    {
      propType: 'labelFormatter',
      type: 'func',
    },
    {
      propType: 'addonFormatter',
      type: 'func',
    },
    {
      propType: 'modalClose',
      type: 'func',
    },
    {
      propType: 'modalApply',
      type: 'func',
    },
    {
      propType: 'modalDescription',
      type: 'string',
    },
    {
      propType: 'modalFootnote',
      type: 'string',
    },
    {
      propType: 'modalTitle',
      type: 'string',
    },
    {
      propType: 'show',
      type: 'boolean',
    },
  ],
};


export default () => <Example {...exampleProps}><ListPickerExample /></Example>;
