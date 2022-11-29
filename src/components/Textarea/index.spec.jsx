import React from 'react';
import { render, screen, user } from 'testing';
import Textarea from '.';

describe('<Textarea />', () => {
  it('should render a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByTestId('textarea-area')).toBeInTheDocument();
  });

  it('should render a countdown span when maxLength is specified', () => {
    render(<Textarea maxLength={120} statusClass="someclass" />);
    expect(screen.getByTestId('textarea-span')).toHaveTextContent('120 characters remaining');
    expect(screen.getByTestId('textarea-span')).toHaveClass('someclass');
  });

  it('should render a countdown span when maxLength is specified with a value', () => {
    render(<Textarea maxLength={120} statusClass="someclass" value="test" />);
    expect(screen.getByTestId('textarea-span')).toHaveTextContent('116 characters remaining');
    expect(screen.getByTestId('textarea-span')).toHaveClass('someclass');
  });

  it('should give additional className to the textarea', () => {
    render(<Textarea maxLength={120} className="someclass" />);
    expect(screen.getByTestId('textarea-area')).toHaveClass('form-control someclass');
  });

  it('should trigger onChange handler', async () => {
    const props = { onChange: jest.fn(), maxLength: 120 };
    render(<Textarea {...props} />);
    expect(props.onChange).toHaveBeenCalledTimes(0);
    await user.type(screen.getByTestId('textarea-area'), 'a');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should update the remaining character count on textarea change', async () => {
    render(<Textarea maxLength={120} />);
    expect(screen.getByTestId('textarea-span')).toHaveTextContent('120 characters remaining');
    await user.type(screen.getByTestId('textarea-area'), 'abcde');
    expect(screen.getByTestId('textarea-span')).toHaveTextContent('115 characters remaining');
  });

  it('should not update the remaining character count when maxLength is not specified', async () => {
    render(<Textarea />);
    expect(screen.queryByTestId('textarea-span')).not.toBeInTheDocument();
    await user.type(screen.getByTestId('textarea-area'), 'abcde');
    expect(screen.queryByTestId('textarea-span')).not.toBeInTheDocument();
  });

  it('should pass on additional props to textarea element', () => {
    render(<Textarea placeholder="hello" maxLength={120} />);

    expect(screen.getByTestId('textarea-area')).toHaveAttribute('maxLength', '120');
    expect(screen.getByTestId('textarea-area')).toHaveAttribute('placeholder', 'hello');
  });
});
