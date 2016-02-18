import React from 'react';
import { Select } from 'components/distributionEntry';

const selectCountriesOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan', disabled: true },
  { value: 'uk', label: 'United Kingdom' },
];

const selectFlavoursOptions = [
  { label: 'Caramel', value: 'caramel' },
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

const ExampleSelect = () => (
  <div>
    <Select
      clearable={false}
      name="countriesSelect"
      noResultsText="Sorry, couldn't find that country."
      options={selectCountriesOptions}
      placeholder="Countries"
    />
    <br />
    <Select
      multi
      name="flavoursSelect"
      noResultsText="No flavours :("
      options={selectFlavoursOptions}
      placeholder="Select your favourites."
    />
  </div>
);

export default ExampleSelect;
