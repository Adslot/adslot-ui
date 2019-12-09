import React from 'react';
import sinon from 'sinon';
import ReactDatePicker from 'react-datepicker';
import { shallow } from 'enzyme';
import DatePicker from '.';

describe('DatePicker', () => {
  it('should render with defaults', () => {
    const component = shallow(<DatePicker className="test" />);
    expect(component.find(ReactDatePicker).prop('onChangeRaw')).to.equal(undefined);
  });

  it('should render with onChangeRaw when disableInlineEditing = true', () => {
    const component = shallow(<DatePicker className="test" disableInlineEditing />);
    expect(component.find(ReactDatePicker).prop('onChangeRaw')).to.be.a('function');
  });

  it('should call event.preventDeault function', () => {
    const component = shallow(<DatePicker className="test" disableInlineEditing />);
    const event = new Event('change');
    sinon.spy(event, 'preventDefault');
    component.find(ReactDatePicker).prop('onChangeRaw')(event);
    expect(event.preventDefault.called).to.equal(true);
  });
});
