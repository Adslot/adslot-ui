import { shallow } from 'enzyme';
import React from 'react';
import SvgSymbolComponent from 'components/alexandria/SvgSymbolComponent';

describe('SvgSymbolComponent', () => {
  it('should render with href', () => {
    const component = shallow(<SvgSymbolComponent />);
    expect(component.prop('className')).to.equal('svg-symbol-component');
    expect(component.type()).to.equal('svg');

    const useElement = component.find('use');
    expect(useElement.prop('xlinkHref')).to.equal(undefined);
  });

  it('should render with props', () => {
    const props = {
      classSuffixes: ['16', 'red'],
      href: '/assets/other-svg-symbols.svg#checklist-incomplete',
    };
    const component = shallow(<SvgSymbolComponent {...props} />);
    expect(component.prop('className')).to
      .equal('svg-symbol-component svg-symbol-component-16 svg-symbol-component-red');

    const useElement = component.find('use');
    expect(useElement.prop('xlinkHref')).to.equal('/assets/other-svg-symbols.svg#checklist-incomplete');
  });
});
