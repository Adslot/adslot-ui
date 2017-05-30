/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import SvgSymbolCircleComponent from 'components/alexandria/SvgSymbol/Circle';
import EmptyComponent from '.';

describe('EmptyComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<EmptyComponent />);
    expect(component.prop('className')).to.equal('empty-component');

    const svgSymbolEl = component.find(SvgSymbolCircleComponent);
    expect(svgSymbolEl.prop('href')).to.equal(undefined);
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['gray-darker', '70', 'circle']);

    const textElement = component.find('.empty-component-text');
    expect(textElement.text()).to.equal('Nothing to show.');
  });

  it('should render an empty div when passed a non-empty collection Array', () => {
    const component = shallow(<EmptyComponent collection={[1]} />);
    expect(component.prop('className')).to.be.an('undefined');
    expect(component.children()).to.have.length(0);
  });

  it('should render an empty div when passed a non-empty collection Object', () => {
    const component = shallow(<EmptyComponent collection={{ foo: 1 }} />);
    expect(component.prop('className')).to.be.an('undefined');
    expect(component.children()).to.have.length(0);
  });

  it('should render with custom SVG symbol', () => {
    const svgSymbol = { href: '//wherever.svg#id', classSuffixes: ['class'] };
    const props = { svgSymbol, text: 'Where is everybody?' };
    const component = shallow(<EmptyComponent {...props} />);
    expect(component.prop('className')).to.equal('empty-component');

    const svgSymbolEl = component.find(SvgSymbolCircleComponent);
    expect(svgSymbolEl.prop('href')).to.equal('//wherever.svg#id');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['class']);

    const textElement = component.find('.empty-component-text');
    expect(textElement.text()).to.equal('Where is everybody?');
  });

  it('should render with custom SVG symbol, using default classSuffixes', () => {
    const svgSymbol = { href: '//wherever.svg#id' };
    const component = shallow(<EmptyComponent {...{ svgSymbol }} />);
    expect(component.prop('className')).to.equal('empty-component');

    const svgSymbolEl = component.find(SvgSymbolCircleComponent);
    expect(svgSymbolEl.prop('href')).to.equal('//wherever.svg#id');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['gray-darker', '70', 'circle']);
  });

  it('should not render with SVG symbol, when hideIcon is set to true', () => {
    const svgSymbol = { href: '//wherever.svg#id' };
    const component = shallow(<EmptyComponent {...{ svgSymbol, hideIcon: true }} />);
    expect(component.prop('className')).to.equal('empty-component');
    const svgSymbolEl = component.find(SvgSymbolCircleComponent);
    expect(svgSymbolEl).to.have.length(0);
  });
});
