import _ from 'lodash';
import { Checkbox } from 'adslot-ui';
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import CheckboxGroup from '.';

describe('CheckboxGroup', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should render with props', () => {
    const wrapper = shallow(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} className="custom-class" onChange={sinon.spy}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    expect(wrapper.hasClass('custom-class')).to.equal(true);
    const childCheckboxes = wrapper.find(Checkbox);
    expect(childCheckboxes.length).to.equal(3);
  });

  it('should handle checkbox change events when adding selection', () => {
    const onChangeGroup = sinon.spy();
    const wrapper = mount(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const inputComponents = wrapper.find('input');
    inputComponents.at(0).simulate('change');
    expect(onChangeGroup.callCount).to.equal(1);
    expect(onChangeGroup.calledWith(['predator'], 'movies')).to.equal(true);
  });

  it('should handle checkbox change events when removing selection', () => {
    const onChangeGroup = sinon.spy();
    const wrapper = mount(
      <CheckboxGroup name="movies" value={['terminator', 'predator']} onChange={onChangeGroup}>
        <Checkbox label="The Terminator" value="terminator" />
        <Checkbox label="Predator" value="predator" />
        <Checkbox label="The Sound of Music" value="soundofmusic" />
      </CheckboxGroup>
    );

    const inputComponents = wrapper.find('input');
    inputComponents.at(2).simulate('change');
    expect(onChangeGroup.callCount).to.equal(1);
    expect(onChangeGroup.calledWith(['terminator', 'predator', 'soundofmusic'], 'movies')).to.equal(true);
  });

  it('should print warning if child is not a Checkbox component', () => {
    sandbox.stub(console, 'error');
    shallow(
      <CheckboxGroup name="movies" value={['test']} onChange={_.noop}>
        <div>Not a Checkbox</div>
      </CheckboxGroup>
    );
    expect(console.error.calledWith("ERROR: CheckboxGroup's children should be an array of Checkbox")).to.equal(true);
  });
});
