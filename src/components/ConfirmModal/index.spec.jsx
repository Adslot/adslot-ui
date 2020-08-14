import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ConfirmModal from '.';

afterEach(cleanup);

describe('<ConfirmModal />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<ConfirmModal show />);

    expect(getByTestId('confirm-modal-wrapper')).toHaveClass('confirm-modal-component');
    expect(getByTestId('confirm-modal-wrapper')).toHaveClass('modal');

    expect(queryAllByTestId('confirm-modal-header')).toHaveLength(0);
    expect(queryAllByTestId('confirm-modal-body')).toHaveLength(1);
    expect(getByTestId('confirm-modal-body')).toHaveTextContent('Are you sure?');

    expect(queryAllByTestId('confirm-modal-footer')).toHaveLength(1);
    expect(getByTestId('confirm-modal-confirm')).toHaveClass('btn-primary');
    expect(getByTestId('confirm-modal-confirm')).toHaveAttribute('data-test-selector', 'confirm-modal-confirm');
    expect(getByTestId('confirm-modal-confirm')).toHaveTextContent('Confirm');
  });

  it('should render with props', () => {
    const props = {
      show: true,
      buttonCancelLabel: 'Close',
      buttonConfirmLabel: 'OK',
      modalClose: jest.fn(),
      modalDescription: 'If sure, please click confirm.',
      modalTitle: 'Please Confirm',
    };
    const { getByTestId, queryAllByTestId } = render(<ConfirmModal {...props} />);
    expect(getByTestId('confirm-modal-wrapper')).toHaveClass('confirm-modal-component');
    expect(queryAllByTestId('confirm-modal-header')).toHaveLength(1);
    expect(queryAllByTestId('confirm-modal-title')).toHaveLength(1);
    expect(getByTestId('confirm-modal-title')).toHaveTextContent('Please Confirm');

    expect(queryAllByTestId('confirm-modal-body')).toHaveLength(1);
    expect(getByTestId('confirm-modal-body')).toHaveTextContent('If sure, please click confirm.');

    expect(queryAllByTestId('confirm-modal-footer')).toHaveLength(1);

    expect(getByTestId('confirm-modal-cancel')).toHaveClass('btn-inverse');
    expect(getByTestId('confirm-modal-cancel')).toHaveAttribute('data-test-selector', 'confirm-modal-cancel');
    expect(getByTestId('confirm-modal-cancel')).toHaveTextContent('Close');

    expect(getByTestId('confirm-modal-confirm')).toHaveClass('btn-primary');
    expect(getByTestId('confirm-modal-confirm')).toHaveAttribute('data-test-selector', 'confirm-modal-confirm');
    expect(getByTestId('confirm-modal-confirm')).toHaveTextContent('OK');
  });

  it('should show modal when `show` is true', () => {
    const { getByTestId } = render(<ConfirmModal show />);
    expect(getByTestId('confirm-modal-wrapper')).toMatchSnapshot();
  });

  it('should hide modal when `show` is false', () => {
    const { queryAllByTestId } = render(<ConfirmModal show={false} />);
    expect(queryAllByTestId('confirm-modal-wrapper')).toHaveLength(0);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    const applyMock = jest.fn();
    const closeMock = jest.fn();
    const { getByTestId } = render(<ConfirmModal show modalApply={applyMock} modalClose={closeMock} />);

    fireEvent.click(getByTestId('confirm-modal-confirm'));
    expect(applyMock).toHaveBeenCalledTimes(1);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const { getByTestId } = render(<ConfirmModal show />);
    console.error = err => {
      throw new Error(err);
    };
    expect(() => fireEvent.click(getByTestId('confirm-modal-confirm'))).toThrow(
      'AdslotUi ConfirmModal needs a modalApply handler'
    );
  });

  it('should call `modalClose` when we click Cancel', () => {
    const closeMock = jest.fn();
    const { getByTestId } = render(<ConfirmModal show modalClose={closeMock} />);

    fireEvent.click(getByTestId('confirm-modal-cancel'));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
