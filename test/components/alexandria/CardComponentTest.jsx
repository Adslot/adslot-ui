import React from 'react';
import { shallow } from 'enzyme';

import CardComponent from 'components/alexandria/CardComponent';

describe('CardContainerComponent', () => {
  it('should render and pass through children', () => {
    const children = <div className="test-class">Test Text</div>;
    const component = shallow(<CardComponent.Container>{children}</CardComponent.Container>);
    expect(component.prop('className')).to.equal('card-component');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Test Text');
  });

  it('should render with classNames', () => {
    const component = shallow(<CardComponent.Container className="red blue">Test Text</CardComponent.Container>);
    expect(component.prop('className')).to.equal('card-component red blue');
    expect(component.children()).to.have.length(1);
  });

  it('should render with accent', () => {
    const component = shallow(<CardComponent.Container accent="foo">Test Text</CardComponent.Container>);
    expect(component.prop('className')).to.equal('card-component accent accent-foo');
  });

  it('should render with appended and nested children', () => {
    const component = shallow(<CardComponent.Container accent="foo">
      <CardComponent.Content>Nested</CardComponent.Content>
      <CardComponent.Content append>Appended</CardComponent.Content>
    </CardComponent.Container>);

    expect(component.find(CardComponent.Content)).to.have.length(2); // Should have two card contents

    const nestedChild = component.find('.card-component-content-container').find(CardComponent.Content);
    expect(nestedChild).to.have.length(1);
    expect(nestedChild.children().text()).to.equal('Nested');
    expect(component.children(CardComponent.Content)).to.have.length(1);
    expect(component.children(CardComponent.Content).children().text()).to.equal('Appended');
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<CardComponent.Container dts="card-component-container">Test</CardComponent.Container>);
    expect(component.prop('data-test-selector')).to.equal('card-component-container');
  });
});

describe('CardContentComponent', () => {
  it('should render and pass through children', () => {
    const children = <div className="test-class">Test Text</div>;
    const component = shallow(<CardComponent.Content>{children}</CardComponent.Content>);
    expect(component.prop('className')).to.equal('card-component-content');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Test Text');
  });

  it('should render with "stretch" class', () => {
    const component = shallow(<CardComponent.Content stretch>Test Text</CardComponent.Content>);
    expect(component.prop('className')).to.equal('card-component-content stretch');
    expect(component.children()).to.have.length(1);
  });

  it('should render with "fill" class', () => {
    const component = shallow(<CardComponent.Content fill>Test Text</CardComponent.Content>);
    expect(component.prop('className')).to.equal('card-component-content fill');
    expect(component.children()).to.have.length(1);
  });

  it('should render with appended content', () => {
    const component = shallow(<CardComponent.Content append>Test Text</CardComponent.Content>);
    expect(component.prop('className')).to.equal('card-component-content append');
    expect(component.children()).to.have.length(1);
  });

  it('should render with custom classNames', () => {
    const component = shallow(<CardComponent.Content fill className="some classes">Test Text</CardComponent.Content>);
    expect(component.prop('className')).to.equal('card-component-content fill some classes');
    expect(component.children()).to.have.length(1);
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<CardComponent.Content dts="card-component-content">Test</CardComponent.Content>);
    expect(component.prop('data-test-selector')).to.equal('card-component-content');
  });
});
