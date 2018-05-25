import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Checkbox } from 'adslot-ui';
import CheckboxGroup from '.';

describe('CheckboxGroup', () => {
  it('should render with props', () => {
    const component = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    expect(component.hasClass('custom-class')).to.equal(true);
    const childCheckboxes = component.find('Checkbox');
    expect(childCheckboxes.length).to.equal(3);
    expect(component.state().value).to.eql({ terminator: true, predator: true, soundofmusic: false });
  });

  it('should handle checkbox change events', () => {
    const onChangeGroup = sinon.spy();
    const onChangeIndividual = sinon.spy();
    const component = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" onChange={onChangeIndividual} />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
    const childCheckboxes = component.find('Checkbox');
    const firstChild = childCheckboxes.at(0);
    const event = { target: { value: 'terminator' } };
    firstChild.simulate('change', event);
    process.nextTick(() => {
      expect(component.state().value).to.eql({ terminator: false, predator: true, soundofmusic: false });
    });
    expect(onChangeGroup.callCount).to.equal(1);
    expect(onChangeIndividual.callCount).to.equal(1);
  });

  it('should render without onChange or value props', () => {
    const component = shallow(
      <CheckboxGroup name="movies">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const childCheckboxes = component.find('Checkbox');
    expect(childCheckboxes.length).to.equal(3);
  });

  it('should handle change events without a custom onChange handler', () => {
    const event = { target: { value: 'terminator' } };
    const component = shallow(
      <CheckboxGroup name="movies">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
    const firstChild = component.find('Checkbox').at(0);
    firstChild.simulate('change', event);
    process.nextTick(() => {
      expect(component.state().value).to.eql({ terminator: true, predator: false, soundofmusic: false });
    });
  });

  it('should handle props changes', () => {
    const component = mount(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
    component.setProps({ value: ['terminator', 'soundofmusic'] });
    expect(component.state().value).to.eql({ terminator: true, predator: false, soundofmusic: true });
  });

  it('should handle props changes when no value is given', () => {
    const component = mount(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
    component.setProps({});
    expect(component.state().value).to.eql({ terminator: true, predator: true, soundofmusic: false });
  });
});
