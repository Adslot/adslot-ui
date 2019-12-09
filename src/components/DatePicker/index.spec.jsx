import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '.';

describe('DatePicker', () => {
  it('should render with defaults', () => {
    const component = shallow(<DatePicker className="test" />);
    expect(component.props().handleDateChangeRaw).to.be.undefined;
  });

  it('should render with onChangeRaw when disableInlineEditing = true', () => {
    const component = shallow(<DatePicker className="test" disableInlineEditing={true} />);
    expect(component.props().hasOwnProperty('handleDateChangeRaw')).to.be(true);
  });
});
