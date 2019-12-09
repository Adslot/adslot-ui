import { Spinner } from 'adslot-ui';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import TreePickerNodeExpander from '.';

describe('TreePickerNodeExpanderComponent', () => {
  it('should render with default isLoading false', () => {
    const onClickMock = sinon.spy();
    const component = shallow(<TreePickerNodeExpander onClick={onClickMock} />);
    expect(component.prop('dts')).to.equal('expander');
    expect(component.children()).to.have.length(1);
    expect(component.find(Spinner)).to.have.length(0);
    component.simulate('click');
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should render with isLoading true', () => {
    const onClickMock = sinon.spy();
    const component = shallow(<TreePickerNodeExpander onClick={onClickMock} isLoading />);
    expect(component.children()).to.have.length(1);
    expect(component.find(Spinner)).to.have.length(1);
    component.simulate('click');
    expect(onClickMock.callCount).to.equal(0);
  });
});
