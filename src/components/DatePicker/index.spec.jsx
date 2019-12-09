import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '.';

describe('DatePicker', () => {
  it('should render with defaults', () => {
    const component = shallow(<DatePicker className="test" />);
    expect(component.prop('className')).to.equal('test');
    expect(component.props().handleDateChangeRaw).toBeUndefined();
  });

  it('should render with onChangeRaw when disableInlineEditing = true', () => {
    const component = shallow(<DatePicker className="test" disableInlineEditing="true" />);
    expect(component.prop('className')).to.equal('test');
    expect(component.props().hasOwnProperty('handleDateChangeRaw')).toBe(true);
  });
});
