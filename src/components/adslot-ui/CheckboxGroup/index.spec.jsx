import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Checkbox } from 'adslot-ui';
import CheckboxGroup from '.';

describe('CheckboxGroup', () => {
  it('should render with props', () => {
    const component = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class" onChange={sinon.spy}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    expect(component.hasClass('custom-class')).to.equal(true);
    const childCheckboxes = component.find('Checkbox');
    expect(childCheckboxes.length).to.equal(3);
  });

  it('should handle checkbox change events when adding selection', () => {
    const onChangeGroup = sinon.spy();
    const component = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const childCheckboxes = component.find(Checkbox);
    childCheckboxes.at(0).simulate('change', { currentTarget: { value: 'terminator' } });
    expect(onChangeGroup.callCount).to.equal(1);
    expect(onChangeGroup.calledWith(['predator'], 'movies')).to.equal(true);
  });

  it('should handle checkbox change events when removing selection', () => {
    const onChangeGroup = sinon.spy();
    const component = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const childCheckboxes = component.find(Checkbox);
    childCheckboxes.at(2).simulate('change', { currentTarget: { value: 'soundofmusic' } });
    expect(onChangeGroup.callCount).to.equal(1);
    expect(onChangeGroup.calledWith(['terminator', 'predator', 'soundofmusic'], 'movies')).to.equal(true);
  });
});
