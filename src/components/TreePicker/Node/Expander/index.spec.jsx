import React from 'react';
import { render, screen, user } from 'testing';
import TreePickerNodeExpander from '.';

it('should render with default isLoading false', async () => {
  const onClickMock = jest.fn();
  render(<TreePickerNodeExpander onClick={onClickMock} />);

  expect(screen.getByTestId('grid-cell-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-cell-wrapper')).toHaveAttribute('data-test-selector', 'expander');
  expect(screen.queryByTestId('spinner-wrapper')).not.toBeInTheDocument();

  await user.click(screen.getByTestId('grid-cell-wrapper'));
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('should render with isLoading true', async () => {
  const onClickMock = jest.fn();
  render(<TreePickerNodeExpander onClick={onClickMock} isLoading />);

  expect(screen.getByTestId('grid-cell-wrapper')).not.toBeEmptyDOMElement();
  expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
  await user.click(screen.getByTestId('grid-cell-wrapper'));
  expect(onClickMock).toHaveBeenCalledTimes(0);
});
