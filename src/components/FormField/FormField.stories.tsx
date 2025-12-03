import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TextInput from '../TextInput';
import FormField from './index';
import Select from '../Select';
import DatePicker from '../DatePicker';
import FilePicker from '../FilePicker';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
    label: {
      control: {
        type: 'text',
      },
    },
    labelTooltip: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormFieldDemo = (props) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [gender, setGender] = React.useState();
  const [dob, setDob] = React.useState(() => new Date());
  const [hobbies, setHobbies] = React.useState([]);
  const [homepage, setHomepage] = React.useState('');
  const [motto, setMotto] = React.useState('');
  const [sports, setSports] = React.useState([]);

  return (
    <>
      <FormField label="First Name" isRequired {...props}>
        <TextInput value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
      </FormField>
      <FormField label="Surname" isRequired {...props}>
        <TextInput value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
      </FormField>

      <FormField label="Nick Name" labelTooltip="A nick name" {...props}>
        <TextInput value={nickname} variant="line" onChange={(e) => setNickname(e.currentTarget.value)} />
      </FormField>

      <FormField label="Portrait" {...props}>
        <FilePicker onSelect={() => {}} />
      </FormField>

      <FormField label="Gender" {...props}>
        <Select
          value={gender}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          onChange={(option) => setGender(option)}
        />
      </FormField>

      <FormField label="Gender" {...props}>
        <RadioGroup value={gender} onChange={setGender}>
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
        </RadioGroup>
      </FormField>

      <FormField label="Date of birth" {...props}>
        <DatePicker key={dob} selected={dob} onChange={setDob} />
      </FormField>

      <FormField label="Hobbies" {...props}>
        <Select
          isMulti
          value={hobbies}
          options={[
            { value: 'sport', label: 'Sport' },
            { value: 'music', label: 'Music' },
            { value: 'game', label: 'Game' },
            { value: 'food', label: 'Food' },
          ]}
          onChange={(option) => setHobbies(option)}
        />
      </FormField>

      <FormField label="Home Page" required labelTooltip="A URL for your home page" {...props}>
        <TextInput
          isLoading
          placeholder="https://"
          clickToInsert
          value={homepage}
          onChange={(e) => setHomepage(e.currentTarget.value)}
        />
      </FormField>

      <FormField label="Motto" {...props}>
        <TextInput maxLength={90} value={motto} onChange={(e) => setMotto(e.currentTarget.value)} />
      </FormField>

      <FormField label="Sports" {...props}>
        <CheckboxGroup value={sports} onChange={setSports}>
          <CheckboxGroup.Item value="swimming" label="Swimming" />
          <CheckboxGroup.Item value="soccer" label="Soccer" />
          <CheckboxGroup.Item value="badminton" label="Badminton" />
        </CheckboxGroup>
      </FormField>
    </>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
      <FormFieldDemo {...args} />
    </form>
  ),
};

export const SmallForm: Story = {
  args: { size: 'small' },
  render: (args) => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
      <FormFieldDemo {...args} />
    </form>
  ),
};

export const InlineForm: Story = {
  args: { variant: 'inline' },
  render: (args) => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 600 }}>
      <FormFieldDemo {...args} />
    </form>
  ),
};
