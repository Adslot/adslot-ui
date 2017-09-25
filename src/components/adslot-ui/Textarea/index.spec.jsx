/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Textarea from '.';

describe('Textarea', () => {
  it('should render a textarea element', () => {
    const component = shallow(<Textarea />);
    const textarea = component.find('textarea');
    expect(textarea).to.have.length(1);
  });

  it('should render a countdown span when maxLength is specified', () => {
    const component = shallow(<Textarea maxLength={120} statusClass="someclass" />);
    expect(component.find('span').text()).to.equal('120 characters remaining');
    expect(component.find('span').hasClass('someclass')).to.equal(true);
  });

  it('should give additional className to the textarea', () => {
    const component = shallow(<Textarea maxLength={120} className="someclass" />);
    expect(component.find('textarea').hasClass('form-control someclass')).to.equal(true);
  });

  it('should trigger onChange handler', () => {
    const props = { onChange: sinon.spy(), maxLength: 120 };
    const component = shallow(<Textarea {...props} />);
    component.find('textarea').simulate('change', { target: { value: 'abcde' } });
    expect(props.onChange.callCount).to.equal(1);
  });

  it('should update the remaining character count on textarea change', () => {
    const setStateSpy = sinon.spy(Textarea.prototype, 'setState');
    const component = shallow(<Textarea maxLength={120} />);
    component.find('textarea').simulate('change', { target: { value: 'abcde' } });
    expect(setStateSpy.callCount).to.equal(1);
    expect(component.state('charCountRemaining')).to.equal(115);
    setStateSpy.restore();
  });

  it('should not update the remaining character count when maxLength is not specified', () => {
    const setStateSpy = sinon.spy(Textarea.prototype, 'setState');
    const component = shallow(<Textarea />);
    component.find('textarea').simulate('change', { target: { value: 'abcde' } });
    expect(setStateSpy.callCount).to.equal(0);
    setStateSpy.restore();
  });

  it('should pass on additional props to textarea element', () => {
    const component = shallow(<Textarea placeholder="hello" maxLength={120} />);
    const textarea = component.find('textarea');
    expect(textarea.prop('maxLength')).to.equal(120);
    expect(textarea.prop('placeholder')).to.equal('hello');
  });
});
