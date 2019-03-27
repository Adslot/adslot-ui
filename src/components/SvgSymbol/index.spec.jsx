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
    expect(useElement.prop('href')).to.equal('');
  });

  it('should render with props', () => {
    const props = {
      classSuffixes: ['16', 'red'],
      href: '/assets/other-svg-symbols.svg#checklist-incomplete',
    };
    const component = shallow(<SvgSymbol {...props} />);
    expect(component.prop('className')).to.equal(
      'svg-symbol-component svg-symbol-component-16 svg-symbol-component-red'
    );

    const useElement = component.find('use');
    expect(useElement.prop('href')).to.equal('/assets/other-svg-symbols.svg#checklist-incomplete');
  });

  it('should render with base64 encoded data', () => {
    const encodedData =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjciLz48cGF0aCBkPSJNNi4wNyA2LjA3bDMuODYgMy44Nm0wLTMuODZMNi4wNyA5LjkzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
    const component = shallow(<SvgSymbol href={encodedData} />);
    const imgElement = component.find('img');
    expect(imgElement).to.have.length(1);
    expect(imgElement.prop('src')).to.equal(encodedData);
  });
});
