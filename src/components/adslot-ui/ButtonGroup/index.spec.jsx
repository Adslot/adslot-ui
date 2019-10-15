import React from 'react';
import { mount } from 'enzyme';
import ButtonGroup from 'adslot-ui/ButtonGroup';
import Button from 'third-party/Button';

describe('ButtonGroupComponent', () => {
  it('should render Button Group', () => {
    const wrapper = mount(
      <ButtonGroup>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>
    );
    expect(wrapper.find(ButtonGroup)).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(2);
  });

  it('should override child Button style', () => {
    const wrapper = mount(
      <ButtonGroup bsStyle="link" inverse>
        <Button bsStyle="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(
      wrapper
        .find(Button)
        .at(0)
        .props().bsStyle
    ).to.equal('link');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .props().inverse
    ).to.equal(true);
  });

  it('should disable child buttons', () => {
    const wrapper = mount(
      <ButtonGroup disabled>
        <Button bsStyle="primary">Test1</Button>
        <Button inverse={false}>Test2</Button>
      </ButtonGroup>
    );
    expect(
      wrapper
        .find(Button)
        .at(0)
        .props().disabled
    ).to.equal(true);
    expect(
      wrapper
        .find(Button)
        .at(1)
        .props().disabled
    ).to.equal(true);
  });

  it('should inject props to Button at any nested level', () => {
    const wrapper = mount(
      <ButtonGroup disabled bsSize="large">
        <div>
          <div>foo</div>
          <Button bsStyle="primary">Test1</Button>
        </div>
      </ButtonGroup>
    );
    expect(
      wrapper
        .find(Button)
        .at(0)
        .props().disabled
    ).to.equal(true);
  });

  it('should not crash when child is null', () => {
    const wrapper = mount(
      <ButtonGroup disabled>
        <div />
        {null}
      </ButtonGroup>
    );
    expect(wrapper.find(ButtonGroup)).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(0);
  });

  it('should apply dts to button group', () => {
    const wrapper = mount(
      <ButtonGroup dts="button-group">
        <Button dts="button-test-1">Test1</Button>
        <Button dts="button-test-2">Test2</Button>
      </ButtonGroup>
    );
    console.log(wrapper.debug());
    expect(wrapper.find("[data-test-selector='button-group']")).to.have.length(1);
    expect(wrapper.find(Button).find("[data-test-selector='button-test-1']")).to.have.length(1);
    expect(wrapper.find(Button).find("[data-test-selector='bbutton-test-2']")).to.have.length(1);
  });
});
