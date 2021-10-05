import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ConfirmModal from '.';

afterEach(cleanup);

describe('<ConfirmModal />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryByTestId } = render(<ConfirmModal show />);

    expect(getByTestId('action-panel-wrapper')).toHaveClass('confirm-modal-component');
    expect(getByTestId('action-panel-wrapper')).toHaveClass('action-modal');
    expect(queryByTestId('action-panel-header')).toBeInTheDocument();
    expect(queryByTestId('action-panel-body')).toBeInTheDocument();
    expect(getByTestId('action-panel-body')).toHaveTextContent('Are you sure?');

    expect(queryByTestId('action-panel-header')).toBeInTheDocument();
    expect(getByTestId('action-panel-header')).toContainElement(getByTestId('confirm-modal-confirm'));
    expect(getByTestId('confirm-modal-confirm')).toHaveClass('btn-primary');
    expect(getByTestId('confirm-modal-confirm')).toHaveAttribute('data-test-selector', 'confirm-modal-confirm');
    expect(getByTestId('confirm-modal-confirm')).toHaveTextContent('Confirm');
  });

  it('should render with props', () => {
    const props = {
      show: true,
      buttonConfirmLabel: 'OK',
      modalClose: jest.fn(),
      modalDescription: 'If sure, please click confirm.',
      modalTitle: 'Please Confirm',
    };
    const { getByTestId, queryByTestId, getByText } = render(<ConfirmModal {...props} />);

    expect(getByTestId('action-panel-wrapper')).toHaveClass('confirm-modal-component');
    expect(queryByTestId('action-panel-header')).toBeInTheDocument();
    expect(queryByTestId('action-panel-title')).toBeInTheDocument();
    expect(getByTestId('action-panel-title')).toHaveTextContent('Please Confirm');

    expect(queryByTestId('action-panel-body')).toBeInTheDocument();
    expect(getByTestId('action-panel-body')).toHaveTextContent('If sure, please click confirm.');

    expect(queryByTestId('action-panel-header')).toBeInTheDocument();
    expect(getByTestId('action-panel-header')).toContainElement(getByText('Cancel'));
    expect(getByTestId('action-panel-header')).toContainElement(getByText('OK'));
  });

  it('should show modal when `show` is true', () => {
    const { getByTestId } = render(<ConfirmModal show />);
    expect(getByTestId('action-panel-wrapper')).toMatchSnapshot();
  });

  it('should hide modal when `show` is false', () => {
    const { queryByTestId } = render(<ConfirmModal show={false} />);
    expect(queryByTestId('action-panel-wrapper')).not.toBeInTheDocument();
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
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => fireEvent.click(getByTestId('confirm-modal-confirm'))).toThrow(
      'AdslotUi ConfirmModal needs a modalApply handler'
    );
  });

  it('should call `modalClose` when we click Cancel', () => {
    const closeMock = jest.fn();
    const { getByText } = render(<ConfirmModal show modalClose={closeMock} />);

    fireEvent.click(getByText('Cancel'));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
