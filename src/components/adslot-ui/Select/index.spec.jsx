import React from 'react';
import SelectComponent from 'adslot-ui/Select';
import Select, { components } from 'react-select';
import { mount } from 'enzyme';

const defaultoptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
];

describe('SelectComponent', () => {
  it('should have base class', () => {
    const wrapper = mount(<SelectComponent />);
    expect(wrapper.find('div.select-component')).to.have.length(1);
  });

  it('should have custom option background', () => {
    const wrapper = mount(
      <SelectComponent options={defaultoptions} isOptionDisabled={({ value }) => value === 'jp'} menuIsOpen />
    );

    expect(wrapper.find('div.select-component__menu-list')).to.have.length(1);
    const options = wrapper.find('div.select-component__option');
    expect(options).to.have.length(4);
    options.at(0).prop('onClick')();
    options.at(1).prop('onMouseOver')();
    wrapper.update();
    expect(
      wrapper
        .find(components.Option)
        .at(0)
        .prop('isSelected')
    ).to.equal(true);
    expect(
      wrapper
        .find(components.Option)
        .at(1)
        .prop('isFocused')
    ).to.equal(true);
    expect(
      wrapper
        .find(components.Option)
        .at(2)
        .prop('isDisabled')
    ).to.equal(true);
  });

  it('should show cross icon for clear opration', () => {
    const wrapper = mount(<SelectComponent options={defaultoptions} menuIsOpen isClearable />);
    wrapper
      .find('.select-component__option')
      .at(0)
      .prop('onClick')();
    wrapper.update();
    expect(wrapper.find('div.select-component__indicator.select-component__clear-indicator')).to.have.length(1);
  });

  it('should handle multi selections', () => {
    const wrapper = mount(
      <SelectComponent options={defaultoptions} defaultValue={[defaultoptions[0], defaultoptions[1]]} isMulti />
    );
    const selectedPills = wrapper.find('.select-component__multi-value__label');
    expect(selectedPills).to.have.length(2);
    expect(selectedPills.map(pill => pill.text())).to.eql(['Australia', 'Canada']);
  });

  it('should have custom SelectContainer if dts is passed in', () => {
    const wrapper = mount(<SelectComponent options={defaultoptions} dts="test-dts" />);
    expect(wrapper.find(Select).prop('components')).to.have.all.keys(
      'DropdownIndicator',
      'ClearIndicator',
      'SelectContainer'
    );
  });

  it('should render select options in body if props.isInModal is true', () => {
    const wrapper = mount(<SelectComponent options={defaultoptions} isInModal />);
    expect(wrapper.find(Select).prop('menuPortalTarget')).to.eql(document.body);
    expect(
      wrapper
        .find(Select)
        .prop('styles')
        .menuPortal()
    ).to.deep.include({ zIndex: 9999 });
  });
});
