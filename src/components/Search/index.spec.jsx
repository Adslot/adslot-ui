import _ from 'lodash';
import { Search, SvgSymbol, Spinner } from 'adslot-ui';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe('Search', () => {
  let sandbox = null;
  const props = {
    className: 'additional-class',
    dts: 'test-dts',
    placeholder: 'search',
    value: 'abc',
    onChange: _.noop,
    onSearch: _.noop,
  };

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should render with defaults', () => {
    const wrapper = shallow(<Search onSearch={props.onSearch} />);

    expect(wrapper.prop('className')).to.equal('aui--search-component');
    expect(wrapper.find(Spinner).length).to.equal(0);
    expect(wrapper.find('button').length).to.equal(0);

    const inputEle = wrapper.find('input');
    expect(inputEle.prop('className')).to.equal('aui--search-component-input');
    expect(inputEle.prop('placeholder')).to.equal('');
    expect(inputEle.prop('value')).to.equal('');
    expect(inputEle.prop('disabled')).to.equal(false);

    const svgSymbolEle = wrapper.find('.search-icon');
    expect(svgSymbolEle.length).to.equal(1);
  });

  it('should render search button if searchOnEnter is true', () => {
    const wrapper = shallow(<Search onSearch={props.onSearch} searchOnEnter />);
    expect(wrapper.find('button').length).to.equal(1);
  });

  it('should render with given props', () => {
    const wrapper = shallow(<Search {...props} />);

    expect(wrapper.prop('className')).to.equal('aui--search-component additional-class');
    expect(wrapper.prop('data-test-selector')).to.equal('test-dts');

    const inputEle = wrapper.find('input');
    expect(inputEle.prop('placeholder')).to.equal('search');
    expect(inputEle.prop('value')).to.equal('abc');
  });

  it('should throw warning if value is provided without onChange', () => {
    sandbox.stub(console, 'warn');

    shallow(<Search value="foo" onSearch={props.onSearch} />);

    expect(
      console.warn.calledWith(
        'Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.'
      )
    ).to.equal(true);
  });

  it('should disable input when disabled is true', () => {
    const wrapper = shallow(<Search onSearch={props.onSearch} disabled />);

    const inputEle = wrapper.find('input');
    expect(inputEle.prop('disabled')).to.equal(true);
  });

  describe('Icons', () => {
    it('should render given search icons', () => {
      const icons = {
        search: <SvgSymbol href="svg_path" />,
      };
      const wrapper = shallow(<Search icons={icons} onSearch={props.onSearch} />);
      expect(wrapper.find(SvgSymbol).prop('href')).to.equal('svg_path');
    });

    it('should render given cancel icons', () => {
      const icons = {
        close: <SvgSymbol href="svg_path" />,
      };
      const wrapper = shallow(<Search {...props} icons={icons} />);
      expect(wrapper.find(SvgSymbol).prop('href')).to.equal('svg_path');
    });

    it('should render given loading spinner if isLoading is true', () => {
      const icons = {
        loader: <Spinner size="small" />,
      };
      const wrapper = shallow(<Search icons={icons} onSearch={props.onSearch} isLoading />);
      expect(wrapper.find(Spinner).length).to.equal(1);
    });
  });

  it('should render given icons', () => {
    const icons = {
      search: <SvgSymbol href="svg_path" />,
    };
    const wrapper = shallow(<Search icons={icons} onSearch={props.onSearch} />);
    expect(wrapper.find(SvgSymbol).prop('href')).to.equal('svg_path');
  });

  describe('Clear Button', () => {
    it('should render clear button when value is not empty and search button is not shown', () => {
      const wrapper = shallow(<Search {...props} />);
      const svgSymbolEle = wrapper.find('.cancel-icon');
      expect(svgSymbolEle.length).to.equal(1);
    });

    it('should fire onChange, onSearch and onClear when clear button is clicked', () => {
      const callbacks = {
        onChange: sinon.spy(),
        onSearch: sinon.spy(),
        onClear: sinon.spy(),
      };
      const wrapper = shallow(<Search {...props} {...callbacks} />);
      const clearBtn = wrapper.find('span.aui--search-component-icon');
      clearBtn.simulate('click');
      expect(callbacks.onChange.calledOnce).to.equal(true);
      expect(callbacks.onChange.calledWith('')).to.equal(true);
      expect(callbacks.onSearch.calledOnce).to.equal(true);
      expect(callbacks.onSearch.calledWith('')).to.equal(true);
      expect(callbacks.onClear.calledOnce).to.equal(true);
      expect(callbacks.onClear.calledWith('')).to.equal(true);
    });

    it('should not fire onSearch if searchOnEnter is true', () => {
      const callbacks = {
        onSearch: sinon.spy(),
      };
      const wrapper = shallow(<Search {...callbacks} searchOnEnter />);
      wrapper.instance().onClear();
      expect(callbacks.onSearch.calledOnce).to.equal(false);
    });

    it('should clear its own value state if onChange is not provided', () => {
      const wrapper = shallow(<Search onSearch={props.onSearch} />);
      wrapper.setState({ value: 'foo' });
      const clearBtn = wrapper.find('span.aui--search-component-icon');
      clearBtn.simulate('click');
      expect(wrapper.state('value')).to.equal('');
    });
  });

  describe('Value Changed', () => {
    it('should fire onChange and onSearch with the latest value when value changed', () => {
      const callbacks = {
        onChange: sinon.spy(),
        onSearch: sinon.spy(),
      };
      const wrapper = shallow(<Search {...callbacks} />);
      const inputEle = wrapper.find('input');
      inputEle.simulate('change', { target: { value: 'new-value' } });
      expect(callbacks.onChange.calledOnce).to.equal(true);
      expect(callbacks.onChange.calledWith('new-value')).to.equal(true);
      expect(callbacks.onSearch.calledOnce).to.equal(true);
      expect(callbacks.onSearch.calledWith('new-value')).to.equal(true);
    });

    it('should fire onSearch after debounceInterval', done => {
      const callbacks = {
        onSearch: sinon.spy(),
      };
      const wrapper = shallow(<Search {...callbacks} debounceInterval={500} />);
      const inputEle = wrapper.find('input');
      inputEle.simulate('change', { target: { value: 'new-value' } });
      setTimeout(() => {
        expect(callbacks.onSearch.calledOnce).to.equal(true);
        expect(callbacks.onSearch.calledWith('new-value')).to.equal(true);
        done();
      }, 500);
    });

    it('should not fire onSearch when value changed if searchOnEnter is true', () => {
      const callbacks = {
        onSearch: sinon.spy(),
      };
      const wrapper = shallow(<Search {...callbacks} searchOnEnter />);
      const inputEle = wrapper.find('input');
      inputEle.simulate('change', { target: { value: 'new-value' } });
      expect(callbacks.onSearch.calledOnce).to.equal(false);
    });

    it('should change its own value state if onChange is not provided', () => {
      const wrapper = shallow(<Search onSearch={props.onSearch} />);
      const inputEle = wrapper.find('input');
      inputEle.simulate('change', { target: { value: 'new-value' } });
      expect(wrapper.state('value')).to.equal('new-value');
    });
  });

  it('should fire onSearch when searchOnEnter is true and search button is clicked', () => {
    const callbacks = {
      onSearch: sinon.spy(),
    };
    const wrapper = shallow(<Search {...callbacks} searchOnEnter />);
    const buttonEle = wrapper.find('button');
    wrapper.setState({ value: 'some-value' });
    buttonEle.simulate('click', { preventDefault: sinon.spy() });
    expect(callbacks.onSearch.calledOnce).to.equal(true);
    expect(callbacks.onSearch.calledWith('some-value')).to.equal(true);
  });

  it('should fire onSearch when searchOnEnter is true and ENTER key is pressed', () => {
    const callbacks = {
      onSearch: sinon.spy(),
    };
    const wrapper = shallow(<Search {...callbacks} searchOnEnter />);
    const inputEle = wrapper.find('input');
    inputEle.simulate('keypress', { key: 'Enter', preventDefault: sinon.spy() });
    expect(callbacks.onSearch.calledOnce).to.equal(true);
    inputEle.simulate('keypress', { key: 'a' });
    expect(callbacks.onSearch.calledOnce).to.equal(true);
  });
});
