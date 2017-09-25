import React from 'react';
import Example from '../components/Example';
import {
  Button,
  UserListPicker,
} from '../../src/dist-entry';

const avatarColor = () => 'cyan';
const emptySvgSymbol = { href: '/assets/svg-symbols.svg#checklist-incomplete' };
const teamMember1 = { avatar: '//lorempixel.com/35/35/people/7', givenName: 'John', id: 1, surname: 'Smith' };
const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };
const listPickerItems = [teamMember1, teamMember2, teamMember3];
const listPickerInitialSelection = [teamMember2];
const listPickerItemHeaders = {
  label: 'Team',
  toggle: 'Member',
  addon: 'Required',
};

class UserListPickerExample extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserListPickerModal: false,
    };
    this.toggleUserListPickerModal = this.toggleUserListPickerModal.bind(this);
  }

  toggleUserListPickerModal() {
    this.setState({ showUserListPickerModal: !this.state.showUserListPickerModal });
  }

  render() {
    return (
      <div>
        <UserListPicker
          avatarColor={avatarColor}
          emptySvgSymbol={emptySvgSymbol}
          initialSelection={listPickerInitialSelection}
          modalClose={this.toggleUserListPickerModal}
          modalApply={this.toggleUserListPickerModal}
          modalDescription="Please select the users you want."
          modalTitle="Select Users"
          show={this.state.showUserListPickerModal}
          userHeaders={listPickerItemHeaders}
          users={listPickerItems}
        />
        <Button className="btn-inverse" onClick={this.toggleUserListPickerModal}>Assign Team</Button>
      </div>
    );
  }
}


const exampleProps = {
  componentName: 'UserListPicker',
  notes: <span>Implements <a href="#list-picker-example">List Picker</a> Component</span>,
  exampleCodeSnippet: `
    <UserListPicker
      avatarColor={avatarColor}
      emptySvgSymbol={emptySvgSymbol}
      initialSelection={listPickerInitialSelection}
      modalClose={this.toggleUserListPickerModal}
      modalApply={this.toggleUserListPickerModal}
      modalDescription="Please select the users you want."
      modalTitle="Select Users"
      show={this.state.showUserListPickerModal}
      userHeaders={listPickerItemHeaders}
      users={listPickerItems}
    />
  `,
  propTypes: [{
    propType: 'avatarColor',
    type: 'func',
    note: 'avatarColor({ avatar, givenName, id, surname })',
  }, {
    propType: 'users',
    type: 'arrayOf {string: avatar, string: givenName, number: id, string: surname}',
    defaultValue: '[]',
  }],
};


export default () => <Example {...exampleProps}><UserListPickerExample /></Example>;
