import React from 'react';
import { render, screen, user } from 'testing';
import Checkbox from '.';

it('should render with props', () => {
  render(
    <form>
      <Checkbox label="The Terminator" name="movies" checked dts="checkbox-terminator" />
    </form>
  );
  expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
  expect(screen.getByTestId('checkbox-input')).toBeChecked();
  expect(screen.getByTestId('checkbox-input')).toHaveAttribute('name', 'movies');
  expect(screen.getByTestId('checkbox')).toHaveAttribute('data-test-selector', 'checkbox-terminator');
  expect(screen.getByTestId('checkbox-label')).toHaveTextContent('The Terminator');
});

it('should render with just label', () => {
  render(<Checkbox label="Label goes here" />);
  expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
  expect(screen.getByTestId('checkbox-label')).toHaveTextContent('Label goes here');
});

it('should render with id, className', () => {
  render(<Checkbox id="checkboxId" className="checkboxClass" />);
  expect(screen.getByTestId('checkbox')).toHaveClass('checkboxClass');
  expect(screen.getByTestId('checkbox-input')).toHaveAttribute('id', 'checkboxId');
});

it('should render without a label', () => {
  render(<Checkbox name="movies" value="terminator" />);
  expect(screen.queryByTestId('checkbox-label')).not.toBeInTheDocument();
});

it('should be disabled when "disable" prop is true', () => {
  const view = render(<Checkbox name="movies" value="terminator" />);
  expect(screen.getByTestId('checkbox')).not.toHaveClass('disabled');
  view.rerender(<Checkbox name="movies" value="terminator" disabled />);
  expect(screen.getByTestId('checkbox')).toHaveClass('disabled');
});

it('should pass next state value to the onChange function', async () => {
  const handleChange = jest.fn();
  const view = render(<Checkbox name="name" value="value" onChange={handleChange} />);
  await user.click(screen.getByTestId('checkbox-input'));
  expect(handleChange).toHaveBeenCalledWith(true, 'name', 'value');
  view.rerender(<Checkbox name="name" value="value" checked onChange={handleChange} />);
  await user.click(screen.getByTestId('checkbox-input'));
  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange).toHaveBeenCalledWith(false, 'name', 'value');
  view.rerender(<Checkbox name="name" value="value" checked="partial" onChange={handleChange} />);
  await user.click(screen.getByTestId('checkbox-input'));
  expect(handleChange).toHaveBeenCalledTimes(3);
  expect(handleChange).toHaveBeenCalledWith(false, 'name', 'value');
});
