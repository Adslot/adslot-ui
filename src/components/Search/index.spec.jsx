import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '.';
import SvgSymbol from '../SvgSymbol';
import Spinner from '../Spinner';

afterEach(cleanup);

describe('<Search />', () => {
  const props = {
    className: 'additional-class',
    dts: 'test-dts',
    placeholder: 'search',
    value: 'abc',
    onChange: jest.fn(),
    onSearch: jest.fn(),
  };

  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<Search onSearch={props.onSearch} />);

    expect(getByTestId('search-wrapper')).toHaveClass('aui--search-component');
    expect(queryAllByTestId('spinner-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('search-button')).toHaveLength(0);

    expect(getByTestId('search-input')).toHaveClass('aui--search-component-input');
    expect(getByTestId('search-input')).toHaveAttribute('placeholder', '');
    expect(getByTestId('search-input')).toHaveAttribute('value', '');
    expect(getByTestId('search-input')).toBeEnabled();

    expect(queryAllByTestId('search-icon')).toHaveLength(1);
    expect(getByTestId('search-icon')).toHaveClass('search-icon');
  });

  it('should render search button if searchOnEnter is true', () => {
    const { queryAllByTestId } = render(<Search onSearch={props.onSearch} searchOnEnter />);
    expect(queryAllByTestId('search-button')).toHaveLength(1);
  });

  it('should render with given props', () => {
    const { getByTestId } = render(<Search {...props} />);

    expect(getByTestId('search-wrapper')).toHaveClass('aui--search-component additional-class');
    expect(getByTestId('search-wrapper')).toHaveAttribute('data-test-selector', 'test-dts');

    expect(getByTestId('search-input')).toHaveAttribute('placeholder', 'search');
    expect(getByTestId('search-input')).toHaveAttribute('value', 'abc');
  });

  it('should throw warning if value is provided without onChange', () => {
    console.warn = jest.fn();

    render(<Search value="foo" onSearch={props.onSearch} />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should disable input when disabled is true', () => {
    const { getByTestId } = render(<Search onSearch={props.onSearch} disabled />);
    expect(getByTestId('search-input')).toBeDisabled();
  });

  it('should trigger `onBlur` when blur the search input', () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(<Search {...props} onBlur={onBlur} />);

    expect(onBlur).toHaveBeenCalledTimes(0);

    fireEvent.blur(getByTestId('search-input'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  describe('Icons', () => {
    it('should render given search icons', () => {
      const icons = {
        search: <SvgSymbol href="svg_path" />,
      };
      const { getByTestId } = render(<Search icons={icons} onSearch={props.onSearch} />);
      expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'svg_path');
    });

    it('should render given cancel icons', () => {
      const icons = {
        close: <SvgSymbol href="svg_path" />,
      };
      const { getByTestId } = render(<Search {...props} icons={icons} />);
      expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'svg_path');
    });

    it('should render given loading spinner if isLoading is true', () => {
      const icons = {
        loader: <Spinner size="small" />,
      };
      const { queryAllByTestId } = render(<Search icons={icons} onSearch={props.onSearch} isLoading />);
      expect(queryAllByTestId('spinner-wrapper')).toHaveLength(1);
    });
  });

  it('should render given icons', () => {
    const icons = {
      search: <SvgSymbol href="svg_path" />,
    };
    const { getByTestId } = render(<Search icons={icons} onSearch={props.onSearch} />);
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'svg_path');
  });

  describe('Clear Button', () => {
    it('should render clear button when value is not empty and search button is not shown', () => {
      const { getByTestId, queryAllByTestId } = render(<Search {...props} />);
      expect(queryAllByTestId('search-icon')).toHaveLength(1);
      expect(getByTestId('search-icon')).toHaveClass('cancel-icon');
    });

    it('should fire onChange, onSearch and onClear when clear button is clicked', () => {
      const callbacks = {
        onChange: jest.fn(),
        onSearch: jest.fn(),
        onClear: jest.fn(),
      };
      const { getByTestId } = render(<Search {...props} {...callbacks} />);
      expect(getByTestId('search-icon-wrapper')).toHaveClass('aui--search-component-icon');
      fireEvent.click(getByTestId('search-icon-wrapper'));

      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledWith('');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('');
      expect(callbacks.onClear).toHaveBeenCalledTimes(1);
      expect(callbacks.onClear).toHaveBeenCalledWith('');
    });

    it('should not fire onSearch if searchOnEnter is true', () => {
      const callbacks = {
        onSearch: jest.fn(),
      };

      const { getByTestId } = render(<Search {...callbacks} searchOnEnter />);
      fireEvent.change(getByTestId('search-input'), { target: { value: 'a' } });
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);
    });

    it('should clear its own value state if onChange is not provided', () => {
      const { getByTestId, queryAllByTestId } = render(<Search onSearch={props.onSearch} />);
      fireEvent.change(getByTestId('search-input'), { target: { value: 'foo' } });
      expect(getByTestId('search-input')).toHaveAttribute('value', 'foo');

      expect(queryAllByTestId('search-icon')).toHaveLength(1);
      expect(getByTestId('search-icon')).toHaveClass('cancel-icon');
      fireEvent.click(getByTestId('search-icon'));
      expect(getByTestId('search-input')).toHaveAttribute('value', '');
    });
  });

  describe('Value Changed', () => {
    it('should fire onChange and onSearch with the latest value when value changed', () => {
      const callbacks = {
        onChange: jest.fn(),
        onSearch: jest.fn(),
      };
      const { getByTestId } = render(<Search {...callbacks} />);

      fireEvent.change(getByTestId('search-input'), { target: { value: 'new-value' } });

      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledWith('new-value');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('new-value');
    });

    it('should fire onSearch after debounceInterval', done => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      const { getByTestId } = render(<Search {...callbacks} debounceInterval={500} />);

      fireEvent.change(getByTestId('search-input'), { target: { value: 'new-value' } });
      setTimeout(() => {
        expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
        expect(callbacks.onSearch).toHaveBeenCalledWith('new-value');
        done();
      }, 500);
    });

    it('should not fire onSearch when value changed if searchOnEnter is true', () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      const { getByTestId } = render(<Search {...callbacks} searchOnEnter />);
      fireEvent.change(getByTestId('search-input'), { target: { value: 'new-value' } });
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);
    });

    it('should change its own value state if onChange is not provided', () => {
      const { getByTestId } = render(<Search onSearch={props.onSearch} />);
      fireEvent.change(getByTestId('search-input'), { target: { value: 'new-value' } });
      expect(getByTestId('search-input')).toHaveAttribute('value', 'new-value');
    });

    it('should fire onSearch when searchOnEnter is true and search button is clicked', () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      const { getByTestId } = render(<Search {...callbacks} searchOnEnter />);

      fireEvent.change(getByTestId('search-input'), { target: { value: 'some-value' } });
      fireEvent.click(getByTestId('search-button'), { preventDefault: jest.fn() });

      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('some-value');
    });

    it('should fire onSearch when searchOnEnter is true and ENTER key is pressed', () => {
      const callbacks = {
        onSearch: jest.fn(),
        onChange: jest.fn(),
      };
      const { getByTestId } = render(<Search {...callbacks} searchOnEnter />);
      fireEvent.keyPress(getByTestId('search-input'), {
        key: 'Enter',
        keyCode: 13,
        preventDefault: jest.fn(),
      });
      expect(callbacks.onChange).toHaveBeenCalledTimes(0);
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);

      userEvent.type(getByTestId('search-input'), 'a');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
