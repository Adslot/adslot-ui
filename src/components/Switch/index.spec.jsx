import React from 'react';
import { render, screen, user } from 'testing';
import Switch from '.';

describe('<Switch />', () => {
  it('should correctly render defaults', () => {
    render(<Switch />);

    expect(screen.getByTestId('switch-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('switch-checkbox')).not.toBeChecked();
    expect(screen.getByTestId('switch-checkbox')).toHaveAttribute('data-test-selector', 'switch-component');
  });

  it('should correctly render controlled Switch', () => {
    render(<Switch checked onChange={jest.fn()} />);
    expect(screen.getByTestId('switch-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should throw warning if checked is provided without onChange', () => {
    jest.spyOn(console, 'warn').mockReturnValueOnce();
    render(<Switch checked />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should throw warning if both defaultChecked and checked are provided', () => {
    jest.spyOn(console, 'warn').mockReturnValueOnce();
    render(<Switch defaultChecked checked onChange={jest.fn()} />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled'
    );
  });

  it('should update checked value', async () => {
    render(<Switch defaultChecked={false} onChange={jest.fn()} />);

    expect(screen.getByTestId('switch-checkbox')).not.toBeChecked();
    await user.click(screen.getByTestId('switch-checkbox'));
    expect(screen.getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should correctly call onChange for controlled Switch', async () => {
    const onChange = jest.fn();
    render(<Switch checked onChange={onChange} />);
    expect(screen.getByTestId('switch-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('switch-checkbox')).toBeChecked();

    await user.click(screen.getByTestId('switch-checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should correctly change switch checked for uncontrolled Switch', async () => {
    render(<Switch defaultChecked={false} />);

    expect(screen.getByTestId('switch-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('switch-checkbox')).not.toBeChecked();

    await user.click(screen.getByTestId('switch-checkbox'));
    expect(screen.getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should correctly apply className', () => {
    render(<Switch className="some-class" />);

    expect(screen.getByTestId('switch-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('switch-checkbox')).toHaveClass('some-class');
  });
});
