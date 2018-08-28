import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Radio from '.';

describe('<Radio />', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'radio-name',
      value: 'radio-value',
      label: 'Radio 1',
      dts: 'radio-dts',
      id: 'radio-id',
      className: 'radio-class',
      disabled: false,
      checked: false,
      onChange: sinon.spy(),
      inline: false,
    };
  });

  it('should render with props', () => {
    const component = shallow(<Radio {...props} />);
    expect(component.find('input[type="radio"]')).to.have.length(1);
    expect(component.text()).to.equal('Radio 1');
    expect(component.find('[name="radio-name"]')).to.have.length(1);
    expect(component.find('[value="radio-value"]')).to.have.length(1);
    expect(component.find('[data-test-selector="radio-dts"]')).to.have.length(1);
  });

  it('should be mounted without error', () => {
    const component = mount(<Radio {...props} />);
    expect(component.find('input[type="radio"]')).to.have.length(1);
    expect(component.text()).to.equal('Radio 1');
  });

  it('should not render label if props.label is undefined', () => {
    delete props.label;
    const component = shallow(<Radio {...props} />);
    expect(component.text()).to.equal('');
  });

  it('should trigger `props.onChange` when the radio button is clicked', () => {
    const component = shallow(<Radio {...props} />);
    component.find('input').simulate('change');
    expect(props.onChange.calledOnce).to.equal(true);
  });

  it('should add inline class when inline prop in true', () => {
    const component = shallow(<Radio {...props} />);
    expect(component.hasClass('radio-component-inline')).to.equal(false);
    props.inline = true;
    component.setProps(props);
    expect(component.hasClass('radio-component-inline')).to.equal(true);
  });
});
