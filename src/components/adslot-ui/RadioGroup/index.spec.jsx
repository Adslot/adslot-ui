import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Radio from '../Radio';
import RadioGroup from '.';

describe('<RadioGroup />', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'radio-group-id',
      className: 'radio-group-custom-class',
      name: 'hobbies',
      value: 'badminton',
      onChange: sinon.spy(),
      dts: 'radio-group-dts',
    };
  });

  it('should render with props', () => {
    const component = shallow(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );

    expect(component.find(Radio)).to.have.length(3);
    expect(component.find('#radio-group-id')).to.have.length(1);
    expect(component.find('.radio-group-custom-class')).to.have.length(1);
    expect(component.find('[data-test-selector="radio-group-dts"]')).to.have.length(1);
  });

  it('should trigger props.onChange when selection changes', () => {
    const component = shallow(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" />
        <Radio label="Soccer" value="soccer" />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );
    component
      .find(Radio)
      .at(0)
      .simulate('change', { currentTarget: { value: 'swimming' } });
    expect(props.onChange.calledOnce).to.equal(true);
    expect(props.onChange.calledWith('swimming')).to.equal(true);
  });

  it('should call Radio props.onChange when selecting that radio button', () => {
    const onChangeSwimming = sinon.spy();
    const onChangeSoccer = sinon.spy();

    const component = shallow(
      <RadioGroup {...props}>
        <Radio label="Swimming" value="swimming" onChange={onChangeSwimming} />
        <Radio label="Soccer" value="soccer" onChange={onChangeSoccer} />
        <Radio label="Badminton" value="badminton" />
      </RadioGroup>
    );

    component
      .find(Radio)
      .at(0)
      .simulate('change', { currentTarget: { value: 'swimming' } });
    expect(onChangeSwimming.calledOnce).to.equal(true);
    expect(onChangeSoccer.called).to.equal(false);
    expect(props.onChange.calledOnce).to.equal(true);
  });
});
