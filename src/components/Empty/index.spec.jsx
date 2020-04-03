/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import { SvgSymbol } from 'adslot-ui';
import Empty from '.';

describe('Empty', () => {
  it('should render with defaults', () => {
    const component = shallow(<Empty />);
    expect(component.prop('className')).to.equal('empty-component');

    const textElement = component.find('.empty-component-text');
    expect(textElement.text()).to.equal('Nothing to show.');
  });

  it('should render an empty div when passed a non-empty collection Array', () => {
    const component = shallow(<Empty collection={[1]} />);
    expect(component.prop('className')).to.be.an('undefined');
    expect(component.children()).to.have.length(0);
  });

  it('should render an empty div when passed a non-empty collection Object', () => {
    const component = shallow(<Empty collection={{ foo: 1 }} />);
    expect(component.prop('className')).to.be.an('undefined');
    expect(component.children()).to.have.length(0);
  });

  it('should render with custom SVG symbol', () => {
    const svgSymbol = <SvgSymbol href="//wherever.svg#id" classSuffixes={['class']} />;
    const props = { icon: svgSymbol, text: 'Where is everybody?' };
    const component = shallow(<Empty {...props} />);
    expect(component.prop('className')).to.equal('empty-component');

    const svgSymbolEl = component.find(SvgSymbol);
    expect(svgSymbolEl.prop('href')).to.equal('//wherever.svg#id');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['class']);

    const textElement = component.find('.empty-component-text');
    expect(textElement.text()).to.equal('Where is everybody?');
  });
});
