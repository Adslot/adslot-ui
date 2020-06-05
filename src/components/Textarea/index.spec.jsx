import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Textarea from '.';

afterEach(cleanup);

describe('<Textarea />', () => {
  it('should render a textarea element', () => {
    const { queryAllByTestId } = render(<Textarea />);
    expect(queryAllByTestId('textarea-area')).toHaveLength(1);
  });

  it('should render a countdown span when maxLength is specified', () => {
    const { getByTestId } = render(<Textarea maxLength={120} statusClass="someclass" />);
    expect(getByTestId('textarea-span')).toHaveTextContent('120 characters remaining');
    expect(getByTestId('textarea-span')).toHaveClass('someclass');
  });

  it('should give additional className to the textarea', () => {
    const { getByTestId } = render(<Textarea maxLength={120} className="someclass" />);
    expect(getByTestId('textarea-area')).toHaveClass('form-control someclass');
  });

  it('should trigger onChange handler', () => {
    const props = { onChange: jest.fn(), maxLength: 120 };
    const { getByTestId } = render(<Textarea {...props} />);
    fireEvent.change(getByTestId('textarea-area'), { target: { value: 'abcde' } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should update the remaining character count on textarea change', () => {
    const { getByTestId } = render(<Textarea maxLength={120} />);
    expect(getByTestId('textarea-span')).toHaveTextContent('120 characters remaining');
    fireEvent.change(getByTestId('textarea-area'), { target: { value: 'abcde' } });
    expect(getByTestId('textarea-span')).toHaveTextContent('115 characters remaining');
  });

  it('should not update the remaining character count when maxLength is not specified', () => {
    const { getByTestId, queryAllByTestId } = render(<Textarea />);
    expect(queryAllByTestId('textarea-span')).toHaveLength(0);
    fireEvent.change(getByTestId('textarea-area'), { target: { value: 'abcde' } });
    expect(queryAllByTestId('textarea-span')).toHaveLength(0);
  });

  it('should pass on additional props to textarea element', () => {
    const { getByTestId } = render(<Textarea placeholder="hello" maxLength={120} />);

    expect(getByTestId('textarea-area')).toHaveAttribute('maxLength', '120');
    expect(getByTestId('textarea-area')).toHaveAttribute('placeholder', 'hello');
  });
});
