/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import AlertInput from '.';

describe('AlertInput', () => {
  it('should render with input props', () => {
    const props = {
      value: 'lorem',
      onValueChange: _.noop,
    };
    const component = shallow(<AlertInput {...props} />);
    expect(component.hasClass('alert-input-component')).to.equal(true);
    expect(component.children()).to.have.length(1);

    const inputElement = component.childAt(0);
    expect(inputElement.prop('className')).to.equal('alert-input-component-input');
    expect(inputElement.prop('type')).to.equal('text');
    expect(inputElement.prop('value')).to.equal('lorem');
    expect(inputElement.prop('onClick')).to.be.a('function');
    expect(inputElement.prop('onChange')).to.be.a('function');
  });

  it('should render with addons', () => {
    const props = {
      prefixAddon: '$',
      suffixAddon: '.00',
    };
    const component = shallow(<AlertInput {...props} />);
    expect(component.children()).to.have.length(3);

    const prefixElement = component.childAt(0);
    expect(prefixElement.text()).to.equal('$');

    const suffixElement = component.childAt(2);
    expect(suffixElement.text()).to.equal('.00');
  });

  it('should render with alert status', () => {
    const props = {
      alertStatus: 'error',
    };
    const component = shallow(<AlertInput {...props} />);
    expect(component.prop('className')).to.equal('alert-input-component error');
    expect(component.children()).to.have.length(1);
  });

  it('should render OverlayTrigger and Popover', () => {
    const props = {
      alertStatus: 'error',
      alertMessage: 'Lorem ipsum dolor sit amet.',
    };
    const component = shallow(<AlertInput {...props} />);
    expect(component.prop('trigger')).to.eql(['hover', 'focus']);
    expect(component.prop('placement')).to.equal('bottom');

    const popover = component.prop('overlay');
    expect(popover.props.className).to.equal('alert-input-component-popover error');
    expect(popover.props.id).to.equal('alert-input-popover');
  });

  it('should handle input change event', () => {
    const props = {
      value: 'abc',
      onValueChange: sinon.spy(),
    };
    const component = shallow(<AlertInput {...props} />);
    const inputElement = component.find('.alert-input-component-input');
    inputElement.simulate('change', 'xyz');
    expect(props.onValueChange.callCount).to.equal(1);
    expect(props.onValueChange.args[0][0]).to.equal('xyz');
  });

  it('should call selectAll() on input click', () => {
    const component = shallow(<AlertInput />);
    const inputElement = component.find('.alert-input-component-input');
    const onInputClick = inputElement.prop('onClick');
    const eventSpy = {
      target: {
        select: sinon.spy(),
      },
    };
    onInputClick(eventSpy);
    expect(eventSpy.target.select.callCount).to.equal(1);
  });
});
