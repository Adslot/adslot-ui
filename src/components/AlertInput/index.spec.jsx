import React from 'react';
import {
  createEvent,
  render,
  cleanup,
  fireEvent,
  queryByAttribute,
  queryAllByAttribute,
  act,
} from '@testing-library/react';
import AlertInput from '.';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

describe('<AlertInput />', () => {
  describe('handleMouseEnter() and handleMouseLeave()', () => {
    it('should set `isPopoverVisible` to true/false if alert message exists', () => {
      const { getByTestId, queryByTestId } = render(<AlertInput alertMessage="Hello" />);
      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      fireEvent.mouseEnter(getByTestId('alert-input-wrapper'));

      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).toBeInTheDocument();

      fireEvent.mouseLeave(getByTestId('alert-input-wrapper'));

      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    it('should not set `isPopoverVisible` to true if no alert message exists', () => {
      const { getByTestId, queryByTestId } = render(<AlertInput />);
      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      fireEvent.mouseEnter(getByTestId('alert-input-wrapper'));
      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      fireEvent.mouseLeave(getByTestId('alert-input-wrapper'));
      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('handleInputFocus()', () => {
    it('should set `isFocused` to true, and `isPopoverVisible` if there is an alert message', () => {
      const { container, getByTestId } = render(<AlertInput alertMessage="Hello" />);
      const onSelect = jest.fn();
      console.error = jest.fn();

      fireEvent(
        getByClass(container, 'aui--alert-input__input'),
        createEvent.focus(getByClass(container, 'aui--alert-input__input'), {
          target: { select: onSelect },
        })
      );

      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--focused');
      expect(getByTestId('popover-wrapper')).toHaveClass('aui--popover-wrapper aui--alert-input__popover');
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should set `isFocused` to true, but not `isPopoverVisible` if no alert message', () => {
      const { container, getByTestId, queryByTestId } = render(<AlertInput />);
      const onSelect = jest.fn();
      console.error = jest.fn();

      act(() => {
        fireEvent(
          getByClass(container, 'aui--alert-input__input'),
          createEvent.focus(getByClass(container, 'aui--alert-input__input'), {
            target: { select: onSelect },
          })
        );
        jest.runAllTimers();
      });

      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--focused');
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should call prop `onFocus` if exists', () => {
      const onFocus = jest.fn();
      const onSelect = jest.fn();
      console.error = jest.fn();
      const { container, getByTestId, queryByTestId } = render(<AlertInput onFocus={onFocus} />);

      act(() => {
        fireEvent(
          getByClass(container, 'aui--alert-input__input'),
          createEvent.focus(getByClass(container, 'aui--alert-input__input'), {
            target: { select: onSelect },
          })
        );
        jest.runAllTimers();
      });

      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--focused');
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleInputBlur ()', () => {
    it('should set `isFocused` and `isPopoverVisible` to false', () => {
      const onSelect = jest.fn();
      console.error = jest.fn();
      const { container, getByTestId, queryByTestId } = render(<AlertInput />);
      act(() => {
        fireEvent(
          getByClass(container, 'aui--alert-input__input'),
          createEvent.focus(getByClass(container, 'aui--alert-input__input'), {
            target: { select: onSelect },
          })
        );
        jest.runAllTimers();
      });

      act(() => {
        fireEvent.blur(getByClass(container, 'aui--alert-input__input'));
        jest.runAllTimers();
      });

      expect(getByTestId('alert-input-wrapper')).not.toHaveClass('aui--alert-input--focused');
      expect(queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    it('should call `onBlur` if exists', () => {
      const onBlur = jest.fn();
      console.error = jest.fn();
      const { container } = render(<AlertInput onBlur={onBlur} />);

      act(() => {
        fireEvent.blur(getByClass(container, 'aui--alert-input__input'));
        jest.runAllTimers();
      });

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('render()', () => {
    it('should render with input props', () => {
      const props = {
        value: 100,
        type: 'number',
        min: 0,
        placeholder: 'Type a number',
        onValueChange: jest.fn(),
        onBlur: jest.fn(),
      };
      const { getByTestId, queryByTestId, getByPlaceholderText, queryByPlaceholderText } = render(
        <AlertInput {...props} />
      );

      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input');
      expect(getByTestId('alert-input-wrapper')).not.toBeEmptyDOMElement();

      expect(queryByPlaceholderText('Type a number')).toBeInTheDocument();
      expect(getByPlaceholderText('Type a number')).toHaveClass('aui--alert-input__input');
      expect(getByPlaceholderText('Type a number')).toHaveAttribute('min', '0');
      expect(getByPlaceholderText('Type a number')).toHaveAttribute('type', 'number');
      expect(getByPlaceholderText('Type a number')).toHaveValue(100);
    });

    it('should also render with default props', () => {
      const { getByTestId, queryByTestId } = render(<AlertInput alertMessage="test" />);
      console.error = jest.fn();
      act(() => {
        fireEvent.mouseEnter(getByTestId('alert-input-wrapper'));
        jest.runAllTimers();
      });

      expect(queryByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(getByTestId('alert-input-wrapper')).toHaveClass('success');
      expect(getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
    });

    it('should render with addons', () => {
      const props = {
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      const { getByTestId, getByText } = render(<AlertInput {...props} />);

      expect(queryAllByClass(getByTestId('alert-input-wrapper'), 'aui--alert-input__addon')).toHaveLength(2);
      expect(queryAllByClass(getByTestId('alert-input-wrapper'), 'aui--alert-input__input')).toHaveLength(1);
      expect(getByText('$')).toHaveClass('aui--alert-input__addon');
      expect(getByText('.00')).toHaveClass('aui--alert-input__addon');
    });

    it('should render with disabled input', () => {
      const props = {
        value: 10000,
        disabled: true,
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      const { getByTestId, getByText } = render(<AlertInput {...props} />);

      expect(queryAllByClass(getByTestId('alert-input-wrapper'), 'aui--alert-input__addon')).toHaveLength(2);
      expect(queryAllByClass(getByTestId('alert-input-wrapper'), 'aui--alert-input__input')).toHaveLength(1);
      expect(getByText('$')).toHaveClass('aui--alert-input__addon');
      expect(getByText('.00')).toHaveClass('aui--alert-input__addon');
      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--disabled');
    });

    it('should render with alert status', () => {
      const props = {
        alertStatus: 'error',
      };
      const { getByTestId } = render(<AlertInput {...props} />);
      expect(getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input error');
    });

    it('should set correct theme for popover', () => {
      let props = {
        alertStatus: 'error',
        alertMessage: 'something is wrong',
      };
      const { getByTestId, rerender } = render(<AlertInput {...props} />);
      fireEvent.mouseEnter(getByTestId('alert-input-wrapper'));
      expect(getByTestId('popover-wrapper')).toHaveClass('popover-error');

      props.alertStatus = 'warning';
      rerender(<AlertInput {...props} />);
      expect(getByTestId('popover-wrapper')).toHaveClass('popover-warn');
    });

    it('should set correct popoverPlacement position for popover', () => {
      const props = {
        popoverPlacement: 'left',
        alertMessage: 'something is wrong',
      };
      const { getByTestId } = render(<AlertInput {...props} />);
      fireEvent.mouseEnter(getByTestId('alert-input-wrapper'));
      expect(getByTestId('popover-wrapper')).toHaveAttribute('placement', 'left');
    });
  });
});
