import { mount } from 'enzyme';
import React from 'react';
import Switch from '.';

describe('Switch', () => {
  it('should correctly change switch checked for uncontrolled Switch', () => {
    const wrapper = mount(<Switch defaultChecked={false} />);

    const inputElement = wrapper.find('input');
    expect(inputElement).toHaveLength(1);
    expect(inputElement.prop('checked')).toEqual(false);

    inputElement.simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.find('input').prop('checked')).toEqual(true);
  });
});
