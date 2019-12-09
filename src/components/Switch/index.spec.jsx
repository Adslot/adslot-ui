import _ from 'lodash';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Switch from '.';

describe('Switch', () => {
  let sandbox = null;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should correctly render defaults', () => {
    const wrapper = mount(<Switch />);
    const inputElement = wrapper.find('input');

    expect(inputElement).to.have.lengthOf(1);

    const inputElementProps = inputElement.props();
    expect(inputElementProps.checked).to.equal(false);
    expect(inputElementProps['data-test-selector']).to.equal('switch-component');
  });

  it('should correctly render controlled Switch', () => {
    const wrapper = mount(<Switch checked onChange={_.noop} />);
    const inputElement = wrapper.find('input');

    expect(inputElement).to.have.lengthOf(1);
    expect(inputElement.props().checked).to.equal(true);
  });

  it('should throw warning if checked is provided without onChange', () => {
    sandbox.stub(console, 'warn');
    mount(<Switch checked />);

    expect(
      console.warn.calledWith(
        'Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.'
      )
    ).to.equal(true);
  });

  it('should throw warning if both defaultChecked and checked are provided', () => {
    sandbox.stub(console, 'warn');
    mount(<Switch defaultChecked checked onChange={_.noop} />);

    expect(
      console.warn.calledWith(
        'Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled'
      )
    ).to.equal(true);
  });

  it('should correctly call onChange for controlled Switch', () => {
    const onChangeSpy = sinon.spy();

    const wrapper = mount(<Switch checked onChange={onChangeSpy} />);
    const inputElement = wrapper.find('input');

    expect(inputElement).to.have.lengthOf(1);
    expect(inputElement.props().checked).to.equal(true);

    inputElement.simulate('change');

    expect(onChangeSpy.calledOnce).to.equal(true);
  });

  it('should correctly change switch checked for uncontrolled Switch', () => {
    const wrapper = mount(<Switch defaultChecked={false} />);

    const inputElement = wrapper.find('input');
    expect(inputElement).to.have.lengthOf(1);
    expect(inputElement.props().checked).to.equal(false);

    inputElement.simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.find('input').props().checked).to.equal(true);
  });

  it('should correctly apply className', () => {
    const wrapper = mount(<Switch className="some-class" />);

    const inputElement = wrapper.find('input');
    expect(inputElement).to.have.lengthOf(1);
    expect(inputElement.props().className).to.equal('some-class');
  });
});
