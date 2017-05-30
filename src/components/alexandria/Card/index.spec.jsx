/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

describe('Card.Container', () => {
  it('should render and pass through children', () => {
    const children = <div className="test-class">Test Text</div>;
    const component = shallow(<Card.Container>{children}</Card.Container>);
    expect(component.prop('className')).to.equal('card-component');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Test Text');
  });

  it('should render with classNames', () => {
    const component = shallow(<Card.Container className="red blue">Test Text</Card.Container>);
    expect(component.prop('className')).to.equal('card-component red blue');
    expect(component.children()).to.have.length(1);
  });

  it('should render with accent', () => {
    const component = shallow(<Card.Container accent="foo">Test Text</Card.Container>);
    expect(component.prop('className')).to.equal('card-component accent accent-foo');
  });

  it('should render with appended and nested children', () => {
    const component = shallow(<Card.Container accent="foo">
      <Card.Content>Nested</Card.Content>
      <Card.Content append>Appended</Card.Content>
    </Card.Container>);

    expect(component.find(Card.Content)).to.have.length(2); // Should have two card contents

    const nestedChild = component.find('.card-component-content-container').find(Card.Content);
    expect(nestedChild).to.have.length(1);
    expect(nestedChild.children().text()).to.equal('Nested');
    expect(component.children(Card.Content)).to.have.length(1);
    expect(component.children(Card.Content).children().text()).to.equal('Appended');
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<Card.Container dts="card-component-container">Test</Card.Container>);
    expect(component.prop('data-test-selector')).to.equal('card-component-container');
  });
});

describe('Card.Content', () => {
  it('should render and pass through children', () => {
    const children = <div className="test-class">Test Text</div>;
    const component = shallow(<Card.Content>{children}</Card.Content>);
    expect(component.prop('className')).to.equal('card-component-content');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Test Text');
  });

  it('should render with "stretch" class', () => {
    const component = shallow(<Card.Content stretch>Test Text</Card.Content>);
    expect(component.prop('className')).to.equal('card-component-content stretch');
    expect(component.children()).to.have.length(1);
  });

  it('should render with "fill" class', () => {
    const component = shallow(<Card.Content fill>Test Text</Card.Content>);
    expect(component.prop('className')).to.equal('card-component-content fill');
    expect(component.children()).to.have.length(1);
  });

  it('should render with appended content', () => {
    const component = shallow(<Card.Content append>Test Text</Card.Content>);
    expect(component.prop('className')).to.equal('card-component-content append');
    expect(component.children()).to.have.length(1);
  });

  it('should render with custom classNames', () => {
    const component = shallow(<Card.Content fill className="some classes">Test Text</Card.Content>);
    expect(component.prop('className')).to.equal('card-component-content fill some classes');
    expect(component.children()).to.have.length(1);
  });

  it('should apply data-test-selector', () => {
    const component = shallow(<Card.Content dts="card-component-content">Test</Card.Content>);
    expect(component.prop('data-test-selector')).to.equal('card-component-content');
  });
});
