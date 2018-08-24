import React from 'react';
import { shallow } from 'enzyme';
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
    checkboxElement.simulate('change');
    expect(onChangeHandler.callCount).to.equal(1);
  });

  it('should render with id, className', () => {
    const component = shallow(<Checkbox id="checkboxId" className="checkboxClass" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement.hasClass('checkboxClass')).to.equal(true);
    expect(component.find('#checkboxId')).to.have.length(1);
  });

  it('should render without a label', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    const labelElement = component.find('label');
    expect(labelElement.text()).to.equal('');
  });

  it('should add inline class when inline prop in true', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    expect(component.hasClass('checkbox-component-inline')).to.equal(false);
    component.setProps({ inline: true });
    expect(component.hasClass('checkbox-component-inline')).to.equal(true);
  });
});
