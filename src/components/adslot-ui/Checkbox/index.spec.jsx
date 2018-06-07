import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Checkbox from '.';

describe('Checkbox', () => {
  it('should render with props', () => {
    const component = shallow(
      <Checkbox label="The Terminator" name="movies" value="terminator" dts="checkbox-terminator" />
    );
    const checkboxElement = component.find('input[type="checkbox"]');
    const labelElement = component.find('label');
    expect(labelElement.text()).to.equal('The Terminator');
    expect(checkboxElement).to.have.length(1);
    expect(checkboxElement.prop('checked')).to.equal(false);
    expect(component.find('[name="movies"]')).to.have.length(1);
    expect(component.find('[value="terminator"]')).to.have.length(1);
    expect(component.find('[data-test-selector="checkbox-terminator"]')).to.have.length(1);
  });

  it('should render with just label', () => {
    const component = shallow(<Checkbox label="Label goes here" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement).to.have.length(1);
    const labelElement = component.find('label');
    expect(labelElement.text()).to.equal('Label goes here');
  });

  it('should render with just onChange', () => {
    const onChangeHandler = sinon.spy();
    const component = shallow(<Checkbox onChange={onChangeHandler} />);
    const checkboxElement = component.find('input[type="checkbox"]');
    const event = { target: { checked: true } };
    checkboxElement.simulate('change', event);
    expect(onChangeHandler.callCount).to.equal(1);
    expect(component.state('checked')).to.equal(true);
  });

  it('should render with id, className', () => {
    const component = shallow(<Checkbox id="checkboxId" className="checkboxClass" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement.hasClass('checkboxClass')).to.equal(true);
    expect(component.find('#checkboxId')).to.have.length(1);
  });

  it('should handle change event', () => {
    const onChangeHandler = sinon.spy();
    const component = shallow(
      <Checkbox
        label="The Terminator"
        name="movies"
        value="terminator"
        onChange={onChangeHandler}
        dts="checkbox-terminator"
      />
    );
    const checkboxElement = component.find('input[type="checkbox"]');
    const event = { target: { checked: true } };
    checkboxElement.simulate('change', event);
    expect(onChangeHandler.callCount).to.equal(1);
    expect(component.state('checked')).to.equal(true);
  });

  it('should render without a label', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    const labelElement = component.find('label');
    expect(labelElement.text()).to.equal('');
  });

  it('should render with checked and disabled states', () => {
    const component = shallow(
      <Checkbox
        name="movies"
        value="terminator"
        checked={true} // eslint-disable-line
        disabled={true} // eslint-disable-line
      />
    );
    expect(component.state('checked')).to.equal(true);
  });

  it('should handle change events without a custom onChange handler', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    const event = { target: { checked: true } };
    checkboxElement.simulate('change', event);
    expect(component.state('checked')).to.equal(true);
  });

  it('should handle props changes', () => {
    const component = mount(<Checkbox name="movies" value="terminator" />);
    component.setProps({ checked: true });
    expect(component.state('checked')).to.equal(true);
  });

  it('should handle props changes when no relevant props are given', () => {
    const component = mount(<Checkbox name="movies" value="terminator" />);
    component.setProps({ foo: 'bar' });
    expect(component.state('checked')).to.equal(false);
  });

  describe('when hover over the checkbox', () => {
    it('should change `state.isHover` and render css class accordingly', () => {
      const component = mount(<Checkbox name="movies" value="terminator" />);
      expect(component.state('isHover')).to.equal(false);

      component.find('input').simulate('mouseEnter');
      expect(component.state('isHover')).to.equal(true);
      expect(component.find('.selection-component-icon').hasClass('hover')).to.equal(true);

      component.find('input').simulate('mouseLeave');
      expect(component.state('isHover')).to.equal(false);
      expect(component.find('.selection-component-icon').hasClass('hover')).to.equal(false);
    });
  });
});
