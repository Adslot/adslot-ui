import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TreePickerNodeExpander from '.';

afterEach(cleanup);

describe('<TreePickerNodeExpander />', () => {
  it('should render with default isLoading false', () => {
    const onClickMock = jest.fn();
    const { getByTestId, queryByTestId } = render(<TreePickerNodeExpander onClick={onClickMock} />);

    expect(queryByTestId('grid-cell-wrapper')).toBeInTheDocument();
    expect(getByTestId('grid-cell-wrapper')).toHaveAttribute('data-test-selector', 'expander');
    expect(queryByTestId('spinner-wrapper')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('grid-cell-wrapper'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should render with isLoading true', () => {
    const onClickMock = jest.fn();
    const { getByTestId, queryByTestId } = render(<TreePickerNodeExpander onClick={onClickMock} isLoading />);

    expect(getByTestId('grid-cell-wrapper')).not.toBeEmptyDOMElement();
    expect(queryByTestId('spinner-wrapper')).toBeInTheDocument();
    fireEvent.click(getByTestId('grid-cell-wrapper'));
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
