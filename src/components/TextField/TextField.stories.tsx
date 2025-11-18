import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TextField from './index';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const TextFieldDemo = (props) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [homepage, setHomepage] = React.useState('');
  const [motto, setMotto] = React.useState('');

  const isHomePageValid = !homepage || homepage.startsWith('https://');

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextField
        {...props}
        name="firstName"
        label="First Name"
        required
        variant="inline"
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <TextField
        {...props}
        name="lastName"
        label="Last Name"
        required
        variant="inline"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      <TextField
        {...props}
        name="nickname"
        label="Nick Name"
        tooltip="A nick name"
        value={nickname}
        onChange={(e) => setNickname(e.currentTarget.value)}
      />
      <TextField
        {...props}
        name="homepage"
        label="Home Page"
        required
        prefill="https://"
        tooltip="A URL for your home page"
        value={homepage}
        onChange={(e) => setHomepage(e.currentTarget.value)}
        color={!isHomePageValid ? 'danger' : undefined}
        helperText={isHomePageValid ? null : `Must starts with "https://"`}
      />
      <TextField
        {...props}
        name="motto"
        label="Motto"
        maxLength={30}
        value={motto}
        onChange={(e) => setMotto(e.currentTarget.value)}
      />
    </form>
  );
};

export const DefaultTextField: Story = {
  args: {},

  render: (args) => <TextFieldDemo {...args} />,
};
