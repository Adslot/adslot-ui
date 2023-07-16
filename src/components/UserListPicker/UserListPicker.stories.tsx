import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import UserListPicker from './index';
import SvgSymbol from '../SvgSymbol';
import Button from '../Button';

const meta = {
  title: 'Pending Review/UserListPicker',
  component: UserListPicker,
  tags: ['autodocs'],
} satisfies Meta<typeof UserListPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const avatarColor = (user) => (user.avatar ? '' : 'cyan');
  const emptySvgSymbol = <SvgSymbol href="./svg-symbols.svg#checklist-incomplete" />;
  const teamMember1 = {
    avatar: '../user-avatar.jpeg',
    givenName: 'John',
    id: 1,
    surname: 'Smith',
  };
  const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
  const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };
  const listPickerItems = [teamMember1, teamMember2, teamMember3];
  const listPickerInitialSelection = [teamMember2];
  const listPickerItemHeaders = {
    label: 'Team',
    toggle: 'Member',
    addon: 'Required',
  };

  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <UserListPicker
        avatarColor={avatarColor}
        emptySvgSymbol={emptySvgSymbol}
        initialSelection={listPickerInitialSelection}
        modalClose={toggleModal}
        modalApply={toggleModal}
        modalDescription="Please select the users you want."
        modalTitle="Select Users"
        show={showModal}
        userHeaders={listPickerItemHeaders}
        users={listPickerItems}
      />
      <Button variant="inverse" onClick={toggleModal}>
        Assign Team
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
  args: {},
};
