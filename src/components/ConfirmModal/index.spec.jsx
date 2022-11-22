import React from 'react';
import { render, screen, user } from 'testing';
import ConfirmModal from '.';

it('should render with defaults', () => {
  render(<ConfirmModal show modalApply={jest.fn()} />);

  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('confirm-modal-component');
  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('action-modal');
  expect(screen.getByTestId('action-panel-header')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-body')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-body')).toHaveTextContent('Are you sure?');

  expect(screen.getByTestId('action-panel-header')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByTestId('confirm-modal-confirm'));
  expect(screen.getByTestId('confirm-modal-confirm')).toHaveClass('aui-primary');
  expect(screen.getByTestId('confirm-modal-confirm')).toHaveAttribute('data-test-selector', 'confirm-modal-confirm');
  expect(screen.getByTestId('confirm-modal-confirm')).toHaveTextContent('Confirm');
});

it('should render with props', () => {
  const props = {
    show: true,
    buttonConfirmLabel: 'OK',
    modalClose: jest.fn(),
    modalDescription: 'If sure, please click confirm.',
    modalTitle: 'Please Confirm',
    modalApply: jest.fn(),
  };
  render(<ConfirmModal {...props} />);

  expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('confirm-modal-component');
  expect(screen.getByTestId('action-panel-header')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-title')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-title')).toHaveTextContent('Please Confirm');

  expect(screen.getByTestId('action-panel-body')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-body')).toHaveTextContent('If sure, please click confirm.');

  expect(screen.getByTestId('action-panel-header')).toBeInTheDocument();
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('Cancel'));
  expect(screen.getByTestId('action-panel-header')).toContainElement(screen.getByText('OK'));
});

it('should show modal when `show` is true', () => {
  render(<ConfirmModal show modalApply={jest.fn()} />);
  expect(screen.getByTestId('action-panel-wrapper')).toBeInTheDocument();
});

it('should hide modal when `show` is false', () => {
  render(<ConfirmModal show={false} modalApply={jest.fn()} />);
  expect(screen.queryByTestId('action-panel-wrapper')).not.toBeInTheDocument();
});

it('should call `modalApply` and `modalClose` when we click Apply', async () => {
  const applyMock = jest.fn();
  const closeMock = jest.fn();
  render(<ConfirmModal show modalApply={applyMock} modalClose={closeMock} />);

  await user.click(screen.getByTestId('confirm-modal-confirm'));
  expect(applyMock).toHaveBeenCalledTimes(1);
  expect(closeMock).toHaveBeenCalledTimes(1);
});

it('should call `modalClose` when we click Cancel', async () => {
  const closeMock = jest.fn();
  render(<ConfirmModal show modalClose={closeMock} modalApply={jest.fn()} />);

  await user.click(screen.getByText('Cancel'));
  expect(closeMock).toHaveBeenCalledTimes(1);
});
