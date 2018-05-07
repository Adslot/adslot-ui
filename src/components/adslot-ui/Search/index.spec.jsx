/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import SvgSymbol from 'alexandria/SvgSymbol';
import Spinner from 'alexandria/Spinner';
import Search from './';

describe('Search', () => {
  let sandbox = null;
  let props = {};

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    props = { onClear: _.noop, onChange: _.noop, onSearch: _.noop };
    sandbox.spy(props, 'onClear');
    sandbox.spy(props, 'onChange');
    sandbox.spy(props, 'onSearch');
  });

  afterEach(() => sandbox.restore());

  it('should render using defaultProps', () => {
    const component = shallow(<Search />);
    expect(component.prop('className')).to.equal('search-component');
    expect(component.find(Spinner).length).to.equal(0);

    const inputEl = component.find('input');
    expect(inputEl.prop('className')).to.equal('search-component-input');
    expect(inputEl.prop('disabled')).to.equal(false);
    expect(inputEl.prop('name')).to.equal('search');
    expect(inputEl.prop('onChange')).to.be.a('function');
    expect(inputEl.prop('placeholder')).to.equal('Search ');
    expect(inputEl.prop('type')).to.equal('search');
    expect(inputEl.prop('value')).to.equal('');

    const svgSymbolEl = component.find(SvgSymbol);
    expect(svgSymbolEl.prop('href')).to.equal('/assets/svg-symbols.svg#search');
    expect(svgSymbolEl.prop('classSuffixes')).to.deep.equal(['gray-light']);
    expect(svgSymbolEl.prop('onClick')).to.be.an('undefined');
  });

  it('should render using a placeholder', () => {
    const component = shallow(<Search placeholder="your feelings" />);

    const inputEl = component.find('input');
    expect(inputEl.prop('placeholder')).to.equal('Search your feelings');
  });

  describe('onChange()', () => {
    it('should fire onChange when the user changes the value', () => {
      const component = shallow(<Search {...props} />);

      const inputEl = component.find('input');
      inputEl.simulate('change', { target: { value: 'needle' } });
      expect(props.onChange.calledOnce).to.equal(true);
      expect(props.onChange.calledWith('needle')).to.equal(true);
    });

    it('should do nothing if `disabled` flag is on', () => {
      const component = shallow(<Search {...props} disabled />);

      const inputEl = component.find('input');
      inputEl.simulate('change', { target: { value: 'needle' } });
      expect(props.onChange.calledOnce).to.equal(false);
    });

    it('should not fire onSearch if `searchOnChange` is false', done => {
      const component = shallow(<Search {...props} searchOnChange={false} />);
      const inputEl = component.find('input');
      inputEl.simulate('change', { target: { value: 'needle' } });
      setImmediate(() => {
        expect(props.onSearch.calledOnce).to.equal(false);
        done();
      });
    });
  });

  it('should not fire onClear, onChange, onSearch when user clicks the icon while disabled', () => {
    _.assign(props, {
      disabled: true,
      value: 'some value',
    });
    const component = shallow(<Search {...props} />);

    const svgSymbolEl = component.find(SvgSymbol);
    svgSymbolEl.simulate('click');
    expect(props.onChange.called).to.equal(false);
    expect(props.onClear.called).to.equal(false);
    expect(props.onSearch.called).to.equal(false);
  });

  it('should fire onClear, onChange, onSearch once with empty string value when user clicks the icon', () => {
    props.value = 'some value';
    const component = shallow(<Search {...props} />);

    const svgSymbolEl = component.find(SvgSymbol);
    svgSymbolEl.simulate('click');
    expect(props.onClear.calledOnce).to.equal(true);
    expect(props.onClear.calledWith('')).to.equal(true);
    expect(props.onChange.calledOnce).to.equal(true);
    expect(props.onChange.calledWith('')).to.equal(true);
    expect(props.onSearch.calledOnce).to.equal(true);
    expect(props.onSearch.calledWith('')).to.equal(true);
  });

  it('should render with a value', () => {
    props.value = 'some value';
    const component = shallow(<Search {...props} />);
    const inputEl = component.find('input');

    expect(inputEl.prop('value')).to.equal('some value');
  });

  describe('with searchOnEnterKey prop', () => {
    let disabledStub = null;

    beforeEach(() => {
      props.searchOnEnterKey = true;
      props.searchOnChange = false;
      props.disabled = false;
      disabledStub = sandbox.stub(props, 'disabled');
    });

    it('should not call props.onSearch when disabled with enter key pressed', () => {
      disabledStub.value(true);
      const component = shallow(<Search {...props} />);
      const inputEl = component.find('input');
      inputEl.simulate('keyPress', { key: 'Enter', which: 13 });
      expect(props.onSearch.called).to.equal(false);
    });

    it('should call props.onSearch when enter key pressed', () => {
      disabledStub.value(false);
      const component = shallow(<Search {...props} />);
      const inputEl = component.find('input');
      inputEl.simulate('keyPress', { key: 'Enter', which: 13 });
      expect(props.onSearch.calledOnce).to.equal(true);
    });

    it('should not call props.onEnterKey when not enter key pressed', () => {
      disabledStub.value(false);
      const component = shallow(<Search {...props} />);
      const inputEl = component.find('input');
      inputEl.simulate('keyPress', { key: 'a', which: 97 });
      expect(props.onSearch.called).to.equal(false);
    });

    it('should not fire onSearch when user clicks the icon', () => {
      const component = shallow(<Search {...props} />);

      const svgSymbolEl = component.find(SvgSymbol);
      svgSymbolEl.simulate('click');
      expect(props.onSearch.called).to.equal(false);
    });

    it('should render loading spinner when isLoading set to true', () => {
      const component = shallow(<Search {...props} isLoading />);
      expect(component.find(Spinner).length).to.equal(1);
    });
  });
});
