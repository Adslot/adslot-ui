/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import SvgSymbol from '.';

describe('SvgSymbol', () => {
  it('should render with href', () => {
    const component = shallow(<SvgSymbol />);
    expect(component.prop('className')).to.equal('svg-symbol-component');
    expect(component.type()).to.equal('svg');

    const useElement = component.find('use');
    expect(useElement.prop('href')).to.equal(undefined);
  });

  it('should render with props', () => {
    const props = {
      classSuffixes: ['16', 'red'],
      href: '/assets/other-svg-symbols.svg#checklist-incomplete',
    };
    const component = shallow(<SvgSymbol {...props} />);
    expect(component.prop('className')).to
      .equal('svg-symbol-component svg-symbol-component-16 svg-symbol-component-red');

    const useElement = component.find('use');
    expect(useElement.prop('href')).to.equal('/assets/other-svg-symbols.svg#checklist-incomplete');
  });
});
