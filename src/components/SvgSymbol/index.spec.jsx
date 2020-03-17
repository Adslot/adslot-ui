/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow, mount } from 'enzyme';
import SvgSymbol from '.';

describe('SvgSymbol', () => {
  it('should render with href', () => {
    const component = shallow(<SvgSymbol />);
    expect(component.find('.aui--svg-symbol-component')).to.have.length(1);
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
    expect(
      component.find('.aui--svg-symbol-component.aui--svg-symbol-component-16.aui--svg-symbol-component-red')
    ).to.have.length(1);

    const useElement = component.find('use');
    expect(useElement.prop('href')).to.equal('/assets/other-svg-symbols.svg#checklist-incomplete');
  });

  it('should render with base64 encoded data', () => {
    const encodedData =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjciLz48cGF0aCBkPSJNNi4wNyA2LjA3bDMuODYgMy44Nm0wLTMuODZMNi4wNyA5LjkzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
    const component = shallow(<SvgSymbol href={encodedData} isCircle={false} />);
    const imgElement = component.find('img');
    expect(imgElement).to.have.length(1);
    expect(imgElement.prop('src')).to.equal(encodedData);
  });

  it('should render with isCircle', () => {
    const component = mount(<SvgSymbol isCircle />);
    const wrapper = component.find('.aui--svg-symbol-component-circle');
    expect(wrapper).to.have.length(1);

    const children = component.find('.aui--svg-symbol-component');
    expect(children).to.have.length(1);
    expect(children.find('use').prop('href')).to.equal('');
  });

  it('should render with props including isCircle', () => {
    const component = mount(<SvgSymbol isCircle href="foo#bar" classSuffixes={['70']} />);
    const wrapper = component.find('.aui--svg-symbol-component-circle.aui--svg-symbol-component-circle-70');
    expect(wrapper).to.have.length(1);

    const children = component.find('.aui--svg-symbol-component.aui--svg-symbol-component-70');
    expect(children).to.have.length(1);
    expect(children.find('use').prop('href')).to.equal('foo#bar');
  });

  it('should not render circle background with false isCircle', () => {
    const component = mount(<SvgSymbol isCircle={false} href="foo#bar" classSuffixes={['70']} />);
    const wrapper = component.find('.aui--svg-symbol-component-circle.aui--svg-symbol-component-circle-70');
    expect(wrapper).to.have.length(0);

    const children = component.find('.aui--svg-symbol-component.aui--svg-symbol-component-70');
    expect(children).to.have.length(1);
    expect(children.find('use').prop('href')).to.equal('foo#bar');
  });
});
