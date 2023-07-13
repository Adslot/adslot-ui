import type { Meta, StoryObj } from '@storybook/react';

import SearchableCheckList from './index';

const meta = {
  title: 'Pending Review/SearchableCheckList',
  component: SearchableCheckList,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchableCheckList>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { value: 'absolute-power', label: 'Absolute Power' },
  { value: 'almost-famous', label: 'Almost Famous' },
  { value: '25th-hour', label: '25th Hour' },
  { value: '12-angry-men', label: '12 Angry Men' },
  { value: '3-idiots', label: '3 Idiots' },
  { value: 'shrek', label: 'Shrek' },
  { value: 'spy-hard', label: 'Spy Hard' },
  { value: 'pacific-rim', label: 'Pacific Rim' },
  { value: 'paranormal-activity', label: 'Paranormal Activity' },
  { value: 'parasite', label: 'Parasite' },
  { value: 'sanjuro', label: 'Sanjuro' },
  { value: 'madagascar', label: 'Madagascar' },
  { value: 'meatballs', label: 'Meatballs' },
  { value: 'moon-child', label: 'Moon Child' },
];

export const Default: Story = {
  args: {
    context: { singularLabel: 'Movie', pluralLabel: 'Movies' },
    items: items,
    placeholder: 'Start Searching..',
    displayCount: 6,
  },
};
