import { shallow } from 'enzyme';
import React from 'react';
import SvgSymbolCircleComponent from 'components/alexandria/SvgSymbolCircleComponent';
import SvgSymbolComponent from 'components/alexandria/SvgSymbolComponent';

describe('SvgSymbolCircleComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<SvgSymbolCircleComponent />);
    expect(component.prop('className')).to.equal('svgsymbolcircle-component');

    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(svgSymbolEl.prop('classSuffixes')).to.have.length(0);
    expect(svgSymbolEl.prop('href')).to.equal(undefined);
  });

  it('should render with props', () => {
    const component = shallow(<SvgSymbolCircleComponent href="foo#bar" classSuffixes={['70']} />);
    expect(component.prop('className')).to.equal('svgsymbolcircle-component svgsymbolcircle-component-70');

    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['70']);
    expect(svgSymbolEl.prop('href')).to.equal('foo#bar');
  });
});
