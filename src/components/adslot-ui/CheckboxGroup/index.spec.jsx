import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
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
    expect(component.state().checkedValues).to.eql(['terminator', 'predator']);
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
    childCheckboxes.at(0).simulate('change', { currentTarget: { value: 'terminator' } });
    expect(component.state().checkedValues).to.eql(['predator']);
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
    const component = shallow(
      <CheckboxGroup name="movies">
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );
    const firstChild = component.find('Checkbox').at(0);
    firstChild.simulate('change', { currentTarget: { value: 'terminator' } });
    expect(component.state().checkedValues).to.eql(['terminator']);
  });
});
