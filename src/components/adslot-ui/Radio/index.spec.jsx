import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
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

  it('should not render label if props.label is undefined', () => {
    delete props.label;
    const component = shallow(<Radio {...props} />);
    expect(component.text()).to.equal('');
  });

  it('should trigger state change and `props.onChange` when change event is triggered', () => {
    const component = shallow(<Radio {...props} />);
    const event = { target: { checked: true } };

    expect(component.state('checked')).to.equal(false);

    component.find('input').simulate('change', event);
    expect(component.state('checked')).to.equal(true);
    expect(props.onChange.calledOnce).to.equal(true);
  });

  it('should still trigger state change when `props.onChange` is not present', () => {
    delete props.onChange;
    const component = shallow(<Radio {...props} />);
    const event = { target: { checked: true } };

    expect(component.state('checked')).to.equal(false);

    component.find('input').simulate('change', event);
    expect(component.state('checked')).to.equal(true);
  });

  it('should override state value when `prop.value` changes', () => {
    const component = shallow(<Radio {...props} />);
    expect(component.state('checked')).to.equal(false);

    props.checked = true;
    component.setProps(props);
    expect(component.state('checked')).to.equal(true);
  });

  it('should NOT override state value when other props change', () => {
    const component = shallow(<Radio {...props} />);
    expect(component.state('checked')).to.equal(false);

    _.assign(props, {
      name: 'some-other-name',
      label: 'New Label',
    });
    component.setProps(props);
    expect(component.state('checked')).to.equal(false);
  });
});
