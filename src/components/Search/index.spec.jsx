import React from 'react';
import { render, screen, user } from 'testing';
import Search from '.';
import SvgSymbol from '../SvgSymbol';
import Spinner from '../Spinner';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    render(<Search onSearch={props.onSearch} />);

    expect(screen.getByTestId('search-wrapper')).toHaveClass('aui--search-component');
    expect(screen.queryByTestId('spinner-wrapper')).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-button')).not.toBeInTheDocument();

    expect(screen.getByTestId('search-input')).toHaveClass('aui--search-component-input');
    expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', '');
    expect(screen.getByTestId('search-input')).toHaveValue('');
    expect(screen.getByTestId('search-input')).toBeEnabled();

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toHaveClass('search-icon');
  });

  it('should render a search button if searchOnEnter and showSearchButton are true', () => {
    render(<Search onSearch={props.onSearch} searchOnEnter />);
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toContainElement(screen.getByTestId('search-icon'));
    expect(screen.getByTestId('search-icon')).toHaveClass('search-icon');
  });

  it('should render a spinner if searchOnEnter and isLoading are true', () => {
    render(<Search onSearch={props.onSearch} searchOnEnter isLoading />);
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toContainElement(screen.getByTestId('spinner'));
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-small');
  });

  it('should render with given props', () => {
    render(<Search {...props} />);

    expect(screen.getByTestId('search-wrapper')).toHaveClass('aui--search-component additional-class');
    expect(screen.getByTestId('search-wrapper')).toHaveAttribute('data-test-selector', 'test-dts');

    expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'search');
    expect(screen.getByTestId('search-input')).toHaveValue('abc');
  });

  it('should throw warning if value is provided without onChange', () => {
    jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
    render(<Search value="foo" onSearch={props.onSearch} />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should disable input when disabled is true', () => {
    render(<Search onSearch={props.onSearch} disabled />);
    expect(screen.getByTestId('search-input')).toBeDisabled();
  });

  it('should trigger `onBlur` when blur the search input', async () => {
    const onBlur = jest.fn();
    render(<Search {...props} onBlur={onBlur} />);

    await user.tab();
    expect(screen.getByTestId('search-input')).toHaveFocus();
    expect(onBlur).toHaveBeenCalledTimes(0);

    await user.tab();
    expect(screen.getByTestId('search-input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  describe('Icons', () => {
    it('should render given search icons', () => {
      const icons = {
        search: <SvgSymbol href="svg_path" />,
      };
      render(<Search icons={icons} onSearch={props.onSearch} />);
      expect(screen.getByTestId('svg-symbol-use')).toHaveAttribute('href', 'svg_path');
    });

    it('should render given cancel icons', () => {
      const icons = {
        close: <SvgSymbol href="svg_path" />,
      };
      render(<Search {...props} icons={icons} />);
      expect(screen.getByTestId('svg-symbol-use')).toHaveAttribute('href', 'svg_path');
    });

    it('should render given loading spinner if isLoading is true', () => {
      const icons = {
        loader: <Spinner size="small" />,
      };
      render(<Search icons={icons} onSearch={props.onSearch} isLoading />);
      expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
    });
  });

  describe('Clear Button', () => {
    it('should render clear button when value is not empty and search button is not shown', () => {
      render(<Search {...props} />);
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toHaveClass('cancel-icon');
    });

    it('should fire onChange, onSearch and onClear when clear button is clicked', async () => {
      const callbacks = {
        onChange: jest.fn(),
        onSearch: jest.fn(),
        onClear: jest.fn(),
      };
      render(<Search {...props} {...callbacks} />);
      expect(screen.getByTestId('search-icon-wrapper')).toHaveClass('aui--search-component-icon');
      await user.click(screen.getByTestId('search-icon-wrapper'));

      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledWith('');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('');
      expect(callbacks.onClear).toHaveBeenCalledTimes(1);
      expect(callbacks.onClear).toHaveBeenCalledWith('');
    });

    it('should not fire onSearch if searchOnEnter is true', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };

      render(<Search {...callbacks} searchOnEnter />);
      await user.type(screen.getByTestId('search-input'), 'a');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);

      await user.click(screen.getByTestId('close-icon'));
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);
    });

    it('should fire onSearch when clicking "X" icon if searchOnEnter is false', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };

      render(<Search {...callbacks} />);
      await user.type(screen.getByTestId('search-input'), 'a');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);

      await user.click(screen.getByTestId('close-icon'));
      expect(callbacks.onSearch).toHaveBeenCalledTimes(2);
      expect(callbacks.onSearch).toHaveBeenNthCalledWith(2, '');
    });

    it('should clear its own value state if onChange is not provided', async () => {
      render(<Search onSearch={props.onSearch} />);
      await user.type(screen.getByTestId('search-input'), 'foo');
      expect(screen.getByTestId('search-input')).toHaveValue('foo');

      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toHaveClass('cancel-icon');
      await user.click(screen.getByTestId('close-icon'));
      expect(screen.getByTestId('search-input')).toHaveValue('');
    });
  });

  describe('Value Changed', () => {
    it('should fire onChange and onSearch with the latest value when value changed', async () => {
      const callbacks = {
        onChange: jest.fn(),
        onSearch: jest.fn(),
      };
      render(<Search {...callbacks} />);

      await user.type(screen.getByTestId('search-input'), 'v');
      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledWith('v');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('v');
    });

    it('should fire onSearch after debounceInterval', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      render(<Search {...callbacks} debounceInterval={500} />);

      await user.type(screen.getByTestId('search-input'), 'new-value');
      expect(callbacks.onSearch).not.toHaveBeenCalledWith('new-value');

      await sleep(500);
      expect(callbacks.onSearch).toHaveBeenCalledWith('new-value');
    });

    it('should not fire onSearch when value changed if searchOnEnter is true', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      render(<Search {...callbacks} searchOnEnter />);
      await user.type(screen.getByTestId('search-input'), 'new-value');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);
    });

    it('should fire onSearch when searchOnEnter is true and search button is clicked', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      render(<Search {...callbacks} searchOnEnter />);

      await user.type(screen.getByTestId('search-input'), 'some-value');
      await user.click(screen.getByTestId('search-button'), { preventDefault: jest.fn() });

      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onSearch).toHaveBeenCalledWith('some-value');
    });

    it('should fire onSearch when searchOnEnter is true and ENTER key is pressed', async () => {
      const callbacks = {
        onSearch: jest.fn(),
        onChange: jest.fn(),
      };
      render(<Search {...callbacks} searchOnEnter />);
      await user.click(screen.getByTestId('search-input'));
      await user.keyboard('[Enter]');

      expect(callbacks.onChange).toHaveBeenCalledTimes(0);
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);

      await user.type(screen.getByTestId('search-input'), 'a');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(1);
      expect(callbacks.onChange).toHaveBeenCalledTimes(1);
    });

    it('should not fire onSearch when pressed enter key if searchOnEnter is false ', async () => {
      const callbacks = {
        onSearch: jest.fn(),
      };
      render(<Search {...callbacks} searchOnEnter={false} />);
      await user.click(screen.getByTestId('search-input'));
      await user.keyboard('[Enter]');
      expect(callbacks.onSearch).toHaveBeenCalledTimes(0);
    });
  });
});
