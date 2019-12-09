import { shallow, mount } from 'enzyme';
import React from 'react';
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

  it('should be mounted without error', () => {
    const component = mount(<Checkbox label="The Terminator" name="movies" value="terminator" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement).to.have.length(1);
  });

  it('should render with just label', () => {
    const component = shallow(<Checkbox label="Label goes here" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement).to.have.length(1);
    const labelElement = component.find('label');
    expect(labelElement.text()).to.equal('Label goes here');
  });

  it('should render with id, className', () => {
    const component = shallow(<Checkbox id="checkboxId" className="checkboxClass" />);
    const checkboxElement = component.find('input[type="checkbox"]');
    expect(checkboxElement.hasClass('checkboxClass')).to.equal(true);
    expect(component.find('#checkboxId')).to.have.length(1);
  });

  it('should render without a label', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    expect(component.find('.checkbox-component-label')).to.have.length(0);
  });

  it('should add inline class when inline prop in true', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    expect(component.hasClass('checkbox-component-inline')).to.equal(false);
    component.setProps({ inline: true });
    expect(component.hasClass('checkbox-component-inline')).to.equal(true);
  });

  it('should be disabled when "disable" prop is true', () => {
    const component = shallow(<Checkbox name="movies" value="terminator" />);
    expect(component.hasClass('disabled')).to.equal(false);
    component.setProps({ disabled: true });
    expect(component.hasClass('disabled')).to.equal(true);
  });

  it('should pass next state valut to the onChange function', () => {
    const handleChange = sinon.spy();
    const component = shallow(<Checkbox name="name" value="value" onChange={handleChange} />);
    component.find('input').simulate('change');
    expect(handleChange.args[0]).to.eql([true, 'name', 'value']);
    component.setProps({ checked: true });
    component.find('input').simulate('change');
    expect(handleChange.args[1]).to.eql([false, 'name', 'value']);
    component.setProps({ checked: 'partial' });
    component.find('input').simulate('change');
    expect(handleChange.args[2]).to.eql([false, 'name', 'value']);
  });
});
