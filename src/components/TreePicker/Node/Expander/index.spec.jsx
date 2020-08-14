import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TreePickerNodeExpander from '.';

afterEach(cleanup);

describe('<TreePickerNodeExpander />', () => {
  it('should render with default isLoading false', () => {
    const onClickMock = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<TreePickerNodeExpander onClick={onClickMock} />);

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(1);
    expect(getByTestId('grid-cell-wrapper')).toHaveAttribute('data-test-selector', 'expander');
    expect(queryAllByTestId('spinner-wrapper')).toHaveLength(0);

    fireEvent.click(getByTestId('grid-cell-wrapper'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should render with isLoading true', () => {
    const onClickMock = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<TreePickerNodeExpander onClick={onClickMock} isLoading />);

    expect(getByTestId('grid-cell-wrapper')).not.toBeEmpty();
    expect(queryAllByTestId('spinner-wrapper')).toHaveLength(1);
    fireEvent.click(getByTestId('grid-cell-wrapper'));
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
