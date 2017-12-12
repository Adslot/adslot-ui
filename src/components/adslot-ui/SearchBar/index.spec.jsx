import _ from 'lodash';
import React from 'react';
import SearchBar from 'adslot-ui/SearchBar';
import SvgSymbol from 'alexandria/SvgSymbol';
import Button from 'react-bootstrap/lib/Button';

import sinon from 'sinon';
import { shallow } from 'enzyme';

const defaultProps = {
  searchString: '',
  searchIconHref: '',
  onSearchStringChange: _.noop,
  onSearch: _.noop,
};

const props = {
  additionalClassNames: ['class-a', 'class-b'],
  searchString: '',
  searchIconHref: '',
  onSearchStringChange: _.noop,
  onSearch: _.noop,
  dts: 'test-dts',
};

describe('SearchBarComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<SearchBar {...defaultProps} />);
    expect(component.prop('className')).to.equal('search-bar-component');

    const inputElement = component.find('input');
    expect(inputElement).to.have.length(1);

    const buttonElement = component.find(Button);
    expect(buttonElement).to.have.length(1);

    const svgSymbolElement = buttonElement.find(SvgSymbol);
    expect(svgSymbolElement).to.have.length(1);
  });

  it('should render with props', () => {
    const component = shallow(<SearchBar {...props} />);
    expect(component.prop('className')).to.equal('search-bar-component class-a class-b');
    expect(component.prop('data-test-selector')).to.equal('test-dts');
  });

  it('should bind onSearchStringChange to search input change event', () => {
    const callback = sinon.spy();
    const component = shallow(<SearchBar {...defaultProps} onSearchStringChange={callback} />);
    const inputElement = component.find('input');
    inputElement.simulate('change', { target: { value: 'Granny Smith' } });
    expect(callback.calledOnce).to.equal(true);
    expect(callback.calledWith('Granny Smith'));
  });

  it('should bind onSearch to search input key press event', () => {
    const callback = sinon.spy();
    const component = shallow(<SearchBar {...defaultProps} onSearch={callback} />);
    const inputElement = component.find('input');
    const ENTER_KEY = 13;
    inputElement.simulate('keypress', { keyCode: ENTER_KEY });
    expect(callback.calledOnce).to.equal(true);
    const A_KEY = 65;
    inputElement.simulate('keypress', { keyCode: A_KEY });
    expect(callback.calledOnce).to.equal(true);
  });

  it('should bind onSearch to search button click event', () => {
    const callback = sinon.spy();
    const component = shallow(<SearchBar {...defaultProps} onSearch={callback} />);
    const buttonElement = component.find(Button);
    buttonElement.simulate('click');
    expect(callback.calledOnce).to.equal(true);
  });
});
