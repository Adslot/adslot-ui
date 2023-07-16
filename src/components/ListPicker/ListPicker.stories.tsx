import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import Checkbox from '../Checkbox';
import ListPicker from './index';

const meta = {
  title: 'Pending Review/ListPicker',
  component: ListPicker,
  tags: ['autodocs'],
} satisfies Meta<typeof ListPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const teamMember1 = { givenName: 'John', id: 1, surname: 'Smith' };
const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

const listPickerItems = [teamMember1, teamMember2, teamMember3];
const listPickerInitialSelection = [teamMember2];

const UncontrolledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} />;
};

const labelFormatter = (item) => `${item.givenName} ${item.surname}`;
const addonFormatter = () => <UncontrolledCheckbox />;

const listPickerItemHeaders = {
  label: 'Team',
  toggle: 'Primary',
  addon: 'Secondary',
};

const itemInfo = {
  label: 'Company Details',
  properties: [
    { label: 'Name', value: 'Paperworks Ltd.' },
    { label: 'Location', value: 'Melbourne' },
    { label: 'Department', value: 'Legal' },
  ],
};

const Render = (args) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showInfoPane, setShowInfoPane] = React.useState(false);

  const toggleListPickerModal = () => {
    setShowModal(!showModal);
  };

  const toggleShowInfoPane = () => {
    setShowInfoPane(!showInfoPane);
  };

  return (
    <div>
      <ListPicker
        {...(showInfoPane ? { itemInfo } : {})}
        modalClose={toggleListPickerModal}
        modalApply={toggleListPickerModal}
        show={showModal}
        {...args}
      />
      <div style={{ display: 'flex', width: '320px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button color="primary" variant="inverse" onClick={toggleListPickerModal}>
          Open List Picker
        </Button>
        <Checkbox checked={showInfoPane} onChange={toggleShowInfoPane} label="Show Info Panel in List Picker" />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: Render,
  args: {
    items: listPickerItems,
    allowMultiSelection: false,
    initialSelection: listPickerInitialSelection,
    itemHeaders: listPickerItemHeaders,
    labelFormatter,
    addonFormatter,
    modalDescription: 'Please select the user that you want.',
    modalFootnote: 'You can select one user.',
    modalTitle: 'Select User',
    itemType: 'user',
  },
};
