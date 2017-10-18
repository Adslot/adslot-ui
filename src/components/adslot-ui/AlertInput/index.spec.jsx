/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Overlay from 'react-bootstrap/lib/Overlay';
import AlertInput from '.';

describe('AlertInput', () => {
  const initialState = {
    isFocused: false,
    isPopoverVisible: false,
  };

  describe('handleMouseEnter()', () => {
    it('should set `isPopoverVisible` to true if alert message exists', () => {
      const component = shallow(<AlertInput alertMessage="Hello" />);
      component.simulate('mouseenter');
      expect(component.state()).to.eql({
        isFocused: false,
        isPopoverVisible: true,
      });
    });

    it('should not set `isPopoverVisible` to true if no alert message exists', () => {
      const component = shallow(<AlertInput />);
      component.simulate('mouseenter');
      expect(component.state()).to.eql(initialState);
    });
  });

  describe('handleMouseLeave()', () => {
    it('should set `isPopoverVisible` to false', () => {
      const component = shallow(<AlertInput alertMessage="Hello" />);
      component.simulate('mouseenter');
      component.simulate('mouseleave');
      expect(component.state()).to.eql(initialState);
    });
  });

  describe('handleInputFocus()', () => {
    it('should set `isFocused` to true, and `isPopoverVisible` if there is an alert message', () => {
      const component = shallow(<AlertInput alertMessage="Hello" />);
      const inputElement = component.find('.alert-input-component-input');
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      inputElement.simulate('focus', focusEvent);
      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: true,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
    });

    it('should set `isFocused` to true, but not `isPopoverVisible` if no alert message', () => {
      const component = shallow(<AlertInput />);
      const inputElement = component.find('.alert-input-component-input');
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      inputElement.simulate('focus', focusEvent);
      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: false,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
    });

    it('should call prop `onFocus` if exists', () => {
      const onFocusSpy = sinon.spy();
      const focusEvent = {
        target: {
          select: sinon.spy(),
        },
      };
      const component = shallow(<AlertInput onFocus={onFocusSpy} />);
      const inputElement = component.find('.alert-input-component-input');

      inputElement.simulate('focus', focusEvent);

      expect(component.state()).to.eql({
        isFocused: true,
        isPopoverVisible: false,
      });
      expect(focusEvent.target.select.callCount).to.equal(1);
      expect(onFocusSpy.callCount).to.equal(1);
    });
  });

  describe('handleInputBlur ()', () => {
    it('should set `isFocused` and `isPopoverVisible` to false', () => {
      const component = shallow(<AlertInput />);
      const inputElement = component.find('.alert-input-component-input');
      const focusEvent = {
        target: {
          select: _.noop,
        },
      };
      inputElement.simulate('focus', focusEvent);
      inputElement.simulate('blur');
      expect(component.state()).to.eql(initialState);
    });

    it('should call `onBlur` if exists', () => {
      const onBlurSpy = sinon.spy();
      const component = shallow(<AlertInput onBlur={onBlurSpy} />);
      const inputElement = component.find('.alert-input-component-input');
      inputElement.simulate('blur');
      expect(onBlurSpy.callCount).to.equal(1);
    });
  });

  describe('render()', () => {
    it('should render with input props', () => {
      const props = {
        value: 100,
        type: 'number',
        min: 0,
        placeholder: 'Type a number',
        onValueChange: _.noop,
        onBlur: _.noop,
      };
      const component = shallow(<AlertInput {...props} />);
      expect(component.hasClass('alert-input-component')).to.equal(true);
      expect(component.prop('onMouseEnter')).to.be.a('function');
      expect(component.prop('onMouseLeave')).to.be.a('function');
      expect(component.children()).to.have.length(2);

      const inputElement = component.childAt(0).childAt(0);
      expect(inputElement.prop('className')).to.equal('alert-input-component-input');
      expect(inputElement.prop('type')).to.equal('number');
      expect(inputElement.prop('min')).to.equal(0);
      expect(inputElement.prop('placeholder')).to.equal('Type a number');
      expect(inputElement.prop('value')).to.equal(100);
      expect(inputElement.prop('onChange')).to.be.a('function');
      expect(inputElement.prop('onFocus')).to.be.a('function');
      expect(inputElement.prop('onBlur')).to.be.a('function');

      const overlayElement = component.childAt(1);
      expect(overlayElement.prop('show')).to.equal(false);
      expect(overlayElement.prop('target')).to.be.a('function');
      expect(overlayElement.prop('placement')).to.equal('bottom');
    });

    it('should also render with default props', () => {
      expect(shallow(<AlertInput />).find('input').prop('type')).to.equal('text');
    });

    it('should render with addons', () => {
      const props = {
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      const component = shallow(<AlertInput {...props} />);
      expect(component.children()).to.have.length(4);

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
    });

    it('should assign reference to root node', () => {
      const component = mount(<AlertInput />);
      const instance = component.instance();
      const overlay = component.find(Overlay);
      const targetFn = overlay.prop('target');
      expect(instance.root).to.equal(targetFn());
    });
  });
});
