import React from 'react';
import { render, screen, user } from 'testing';
import AlertInput from '.';

describe('<AlertInput />', () => {
  describe('handleMouseEnter() and handleMouseLeave()', () => {
    it('should set `isPopoverVisible` to true/false if alert message exists', async () => {
      render(<AlertInput alertMessage="Hello" />);
      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.hover(screen.getByTestId('alert-input-wrapper'));

      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();

      await user.unhover(screen.getByTestId('alert-input-wrapper'));

      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    it('should not set `isPopoverVisible` to true if no alert message exists', async () => {
      render(<AlertInput />);
      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.hover(screen.getByTestId('alert-input-wrapper'));
      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();

      await user.unhover(screen.getByTestId('alert-input-wrapper'));
      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('handleInputFocus()', () => {
    it('should set `isFocused` to true, and `isPopoverVisible` if there is an alert message', async () => {
      const onFocus = jest.fn();
      render(<AlertInput alertMessage="Hello" onFocus={onFocus} />);

      await user.click(screen.getByClass('aui--alert-input__input'));

      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--focused');
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('aui--popover-wrapper aui--alert-input__popover');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should set `isFocused` to true, but not `isPopoverVisible` if no alert message', async () => {
      const onFocus = jest.fn();
      render(<AlertInput onFocus={onFocus} />);

      await user.click(screen.getByClass('aui--alert-input__input'));

      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--focused');
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleInputBlur ()', () => {
    it('should set `isFocused` and `isPopoverVisible` to false', async () => {
      render(<AlertInput />);

      await user.click(screen.getByClass('aui--alert-input__input'));
      await user.tab();

      expect(screen.getByTestId('alert-input-wrapper')).not.toHaveClass('aui--alert-input--focused');
      expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
    });

    it('should call `onBlur` if exists', async () => {
      const onBlur = jest.fn();
      render(<AlertInput onBlur={onBlur} />);

      await user.click(screen.getByClass('aui--alert-input__input'));
      await user.tab();
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
      render(<AlertInput {...props} />);

      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input');
      expect(screen.getByTestId('alert-input-wrapper')).not.toBeEmptyDOMElement();

      expect(screen.getByPlaceholderText('Type a number')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type a number')).toHaveClass('aui--alert-input__input');
      expect(screen.getByPlaceholderText('Type a number')).toHaveAttribute('min', '0');
      expect(screen.getByPlaceholderText('Type a number')).toHaveAttribute('type', 'number');
      expect(screen.getByPlaceholderText('Type a number')).toHaveValue(100);
    });

    it('should also render with default props', async () => {
      render(<AlertInput alertMessage="test" />);

      await user.hover(screen.getByTestId('alert-input-wrapper'));
      expect(screen.getByTestId('alert-input-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('success');
      expect(screen.getByTestId('popover-wrapper')).toHaveAttribute('placement', 'bottom');
    });

    it('should render with addons', () => {
      const props = {
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      render(<AlertInput {...props} />);

      expect(screen.queryAllByClass('aui--alert-input__addon')).toHaveLength(2);
      expect(screen.queryAllByClass('aui--alert-input__input')).toHaveLength(1);
      expect(screen.getByText('$')).toHaveClass('aui--alert-input__addon');
      expect(screen.getByText('.00')).toHaveClass('aui--alert-input__addon');
    });

    it('should render with disabled input', () => {
      const props = {
        value: 10000,
        disabled: true,
        prefixAddon: '$',
        suffixAddon: '.00',
      };
      render(<AlertInput {...props} />);

      expect(screen.queryAllByClass('aui--alert-input__addon')).toHaveLength(2);
      expect(screen.queryAllByClass('aui--alert-input__input')).toHaveLength(1);
      expect(screen.getByText('$')).toHaveClass('aui--alert-input__addon');
      expect(screen.getByText('.00')).toHaveClass('aui--alert-input__addon');
      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input--disabled');
    });

    it('should render with alert status', () => {
      const props = {
        alertStatus: 'error',
      };
      render(<AlertInput {...props} />);
      expect(screen.getByTestId('alert-input-wrapper')).toHaveClass('aui--alert-input error');
    });

    it('should set correct theme for popover', async () => {
      let props = {
        alertStatus: 'error',
        alertMessage: 'something is wrong',
      };
      const view = render(<AlertInput {...props} />);
      await user.hover(screen.getByTestId('alert-input-wrapper'));
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-error');

      props.alertStatus = 'warning';
      view.rerender(<AlertInput {...props} />);
      expect(screen.getByTestId('popover-wrapper')).toHaveClass('popover-warn');
    });

    it('should set correct popoverPlacement position for popover', async () => {
      const props = {
        popoverPlacement: 'left',
        alertMessage: 'something is wrong',
      };
      render(<AlertInput {...props} />);
      await user.hover(screen.getByTestId('alert-input-wrapper'));
      expect(screen.getByTestId('popover-wrapper')).toHaveAttribute('placement', 'left');
    });
  });
});
