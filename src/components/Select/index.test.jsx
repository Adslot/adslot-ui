import { shallow } from 'enzyme';
import React from 'react';
import Select from 'react-select';
import SelectComponent from '.';

const defaultOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
];

describe('SelectComponent', () => {
  it('should render select options in body if props.isInModal is true', () => {
    const wrapper = shallow(<SelectComponent options={defaultOptions} isInModal />);
    expect(wrapper.find(Select).prop('menuPortalTarget')).toEqual(document.body);
    expect(wrapper.find(Select).prop('styles').menuPortal()).toEqual({ zIndex: 9999 });
  });
});
