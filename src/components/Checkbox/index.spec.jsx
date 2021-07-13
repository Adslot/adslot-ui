import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Checkbox from '.';

afterEach(cleanup);

describe('<Checkbox />', () => {
  it('should render with props', () => {
    const { getByTestId, queryByTestId } = render(
      <form>
        <Checkbox label="The Terminator" name="movies" checked dts="checkbox-terminator" />
      </form>
    );
    expect(queryByTestId('checkbox-input')).toBeInTheDocument();
    expect(getByTestId('checkbox-input')).toBeChecked();
    expect(getByTestId('checkbox-input')).toHaveAttribute('name', 'movies');
    expect(getByTestId('checkbox-wrapper')).toHaveAttribute('data-test-selector', 'checkbox-terminator');
    expect(getByTestId('checkbox-label')).toHaveTextContent('The Terminator');
  });

  it('should render with just label', () => {
    const { getByTestId, queryByTestId } = render(<Checkbox label="Label goes here" />);
    expect(queryByTestId('checkbox-input')).toBeInTheDocument();
    expect(getByTestId('checkbox-label')).toHaveTextContent('Label goes here');
  });

  it('should render with id, className', () => {
    const { getByTestId } = render(<Checkbox id="checkboxId" className="checkboxClass" />);
    expect(getByTestId('checkbox-input')).toHaveClass('checkboxClass');
    expect(getByTestId('checkbox-input')).toHaveAttribute('id', 'checkboxId');
  });

  it('should render without a label', () => {
    const { queryByTestId } = render(<Checkbox name="movies" value="terminator" />);
    expect(queryByTestId('checkbox-label')).not.toBeInTheDocument();
  });

  it('should add inline class when inline prop in true', () => {
    const { getByTestId, rerender } = render(<Checkbox name="movies" value="terminator" />);
    expect(getByTestId('checkbox-wrapper')).not.toHaveClass('checkbox-component-inline');
    rerender(<Checkbox name="movies" value="terminator" inline />);
    expect(getByTestId('checkbox-wrapper')).toHaveClass('checkbox-component-inline');
  });

  it('should be disabled when "disable" prop is true', () => {
    const { getByTestId, rerender } = render(<Checkbox name="movies" value="terminator" />);
    expect(getByTestId('checkbox-wrapper')).not.toHaveClass('disabled');
    rerender(<Checkbox name="movies" value="terminator" disabled />);
    expect(getByTestId('checkbox-wrapper')).toHaveClass('disabled');
  });

  it('should pass next state valut to the onChange function', () => {
    const handleChange = jest.fn();
    const { getByTestId, rerender } = render(<Checkbox name="name" value="value" onChange={handleChange} />);
    fireEvent.click(getByTestId('checkbox-input'));
    expect(handleChange).toHaveBeenCalledWith(true, 'name', 'value');
    rerender(<Checkbox name="name" value="value" checked onChange={handleChange} />);
    fireEvent.click(getByTestId('checkbox-input'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(false, 'name', 'value');
    rerender(<Checkbox name="name" value="value" checked="partial" onChange={handleChange} />);
    fireEvent.click(getByTestId('checkbox-input'));
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith(false, 'name', 'value');
  });
});
