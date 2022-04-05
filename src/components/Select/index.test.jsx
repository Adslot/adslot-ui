import { mount } from 'enzyme';
import React from 'react';
import ReactSelect from 'react-select';
import SelectComponent from '.';

const defaultOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
];

describe('Select', () => {
  it('should render select options in body if props.isInModal is true', () => {
    const wrapper = mount(<SelectComponent options={defaultOptions} isInModal />);
    expect(wrapper.find(ReactSelect).prop('menuPortalTarget')).toEqual(document.body);
    expect(wrapper.find(ReactSelect).prop('styles').menuPortal()).toEqual({ zIndex: 9999 });
  });
});
