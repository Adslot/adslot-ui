import _ from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';
import SearchComponent from 'components/alexandria/SearchComponent';
import SvgSymbolComponent from 'components/alexandria/SvgSymbolComponent';

describe('SearchComponent', () => {
  it('should render using defaultProps', () => {
    const component = shallow(<SearchComponent />);
    expect(component.prop('className')).to.equal('search-component');

    const inputEl = component.find('input');
    expect(inputEl.prop('className')).to.equal('search-component-input');
    expect(inputEl.prop('disabled')).to.equal(false);
    expect(inputEl.prop('name')).to.equal('search');
    expect(inputEl.prop('onChange')).to.be.a('function');
    expect(inputEl.prop('placeholder')).to.equal('Search ');
    expect(inputEl.prop('type')).to.equal('search');
    expect(inputEl.prop('value')).to.equal('');

    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(svgSymbolEl.prop('href')).to.equal('/assets/svg-symbols.svg#search');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['gray-light']);
    expect(svgSymbolEl.prop('onClick')).to.be.an('undefined');
  });

  it('should render using a placeholder', () => {
    const component = shallow(<SearchComponent placeholder="your feelings" />);

    const inputEl = component.find('input');
    expect(inputEl.prop('placeholder')).to.equal('Search your feelings');
  });

  it('should render using a value', () => {
    const component = shallow(<SearchComponent value="needle" />);

    const inputEl = component.find('input');
    expect(inputEl.prop('value')).to.equal('needle');

    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(svgSymbolEl.prop('href')).to.equal('/assets/svg-symbols.svg#cancel');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['gray-darker']);
  });

  it('should fire onChange when the user changes the value', () => {
    const values = [];
    const testFunction = (value) => values.push(value);
    const component = shallow(<SearchComponent onChange={testFunction} />);

    const inputEl = component.find('input');
    inputEl.simulate('change', { target: { value: 'needle' } });
    expect(values).to.deep.equal(['needle']);
  });

  it('should not bind onChange when disabled', () => {
    const testFunction = _.noop;

    const component = shallow(<SearchComponent onChange={testFunction} disabled />);
    const inputEl = component.find('input');
    expect(inputEl.prop('onChange')).to.equal(null);
  });

  it('should error when the user changes the value with no onChange handler', () => {
    const component = shallow(<SearchComponent />);

    const inputEl = component.find('input');
    expect(() => {
      inputEl.simulate('change');
    }).to.throw('Alexandria Search needs an onChange handler');
  });

  it('should fire onClear when the user clicks the icon', () => {
    let fireCount = 0;
    const testFunction = () => { fireCount += 1; };

    const component = shallow(<SearchComponent onClear={testFunction} value="a" />);
    const svgSymbolEl = component.find(SvgSymbolComponent);
    svgSymbolEl.simulate('click');
    expect(fireCount).to.equal(1);
  });

  it('should not bind onClear when disabled', () => {
    const testFunction = _.noop;

    const component = shallow(<SearchComponent onClear={testFunction} value="a" disabled />);
    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(svgSymbolEl.prop('onClick')).to.equal(null);
  });

  it('should error when the user clicks the icon with no onClear handler', () => {
    const component = shallow(<SearchComponent value="a" />);

    const svgSymbolEl = component.find(SvgSymbolComponent);
    expect(() => {
      svgSymbolEl.simulate('click');
    }).to.throw('Alexandria Search needs an onClear handler');
  });
});
