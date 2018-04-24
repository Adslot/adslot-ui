import React from 'react';
import Checkbox from 'react-icheck/lib/Checkbox';
import Example from '../components/Example';
import { ListPicker, Button } from '../../src';

const teamMember1 = {
  avatar: '//lorempixel.com/35/35/people/7',
  givenName: 'John',
  id: 1,
  surname: 'Smith',
};
const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };
const listPickerItems = [teamMember1, teamMember2, teamMember3];
const listPickerInitialSelection = [teamMember2];
const labelFormatter = item => `${item.givenName} ${item.surname}`;
const addonFormatter = () => <Checkbox />;
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
        <Button bsStyle="primary" className="btn-inverse" onClick={this.toggleListPickerModal}>
          Request Approval
        </Button>
      </div>
    );
  }
}

const exampleProps = {
  componentName: 'List Picker',
  designNotes: (
    <p>
      <span className="text-bold">List picker</span> displays lists in modals for users to make selections and apply as
      required. This same pattern is used in the <span>UserListPicker</span>.
    </p>
  ),
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
  propTypeSectionArray: [
    {
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
          propType: 'emptyIcon',
          type: 'string',
        },
        {
          propType: 'emptyMessage',
          type: 'string',
        },
        {
          propType: 'emptySvgSymbol',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
        },
        {
          propType: 'initialSelection',
          type: 'array',
          defaultValue: <code>[]</code>,
        },
        {
          propType: 'itemHeaders',
          type: 'shapeOf { string: label, string: toggle, string: addon }',
        },
        {
          propType: 'itemInfo',
          type: 'shapeOf { string: label, arrayOf({ string: label, string: value }): properties, string: addon }',
        },
        {
          propType: 'items',
          type: 'array',
          defaultValue: <code>[]</code>,
        },
        {
          propType: 'itemType',
          type: 'string',
          defaultValue: 'item',
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
          propType: 'linkButtons',
          type: 'arrayOf(node|{ string: label, string: href })',
        },
        {
          propType: 'modalApply',
          type: 'func',
          defaultValue: "() => { throw new Error('AdslotUi ListPicker needs a modalApply handler'); }",
        },
        {
          propType: 'modalDescription',
          type: 'string',
        },
        {
          propType: 'modalClassName',
          type: 'string',
          defaultValue: 'listpicker-component',
        },
        {
          propType: 'modalClose',
          type: 'func',
          defaultValue: "() => { throw new Error('AdslotUi ListPicker needs a modalClose handler'); }",
        },
        {
          propType: 'modalFootnote',
          type: 'string',
        },
        {
          propType: 'modalTitle',
          type: 'string',
          defaultValue: 'Select Items',
        },
        {
          propType: 'show',
          type: 'boolean',
          defaultValue: 'false',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <ListPickerExample />
  </Example>
);
