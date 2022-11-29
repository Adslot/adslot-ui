import React from 'react';
import { toast } from 'react-toastify';
import { render, screen, waitFor } from 'testing';
import Toast, { ToastMessage } from '.';

describe('Toast.notify', () => {
  it('should render notification as expected', async () => {
    const toastSpy = jest.spyOn(toast, 'info');

    render(<Toast.Container />);
    Toast.notify({
      message: 'Testing Toast',
    });

    expect(toastSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Testing Toast');
  });

  it('should render default info type', async () => {
    render(<Toast.Container />);
    Toast.notify({
      title: 'test',
      message: 'Default toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });

    expect(screen.getByClass('aui--toast-title')).toHaveClass('aui--toast-title-info');
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Default toast');
  });

  it('should render success type', async () => {
    render(<Toast.Container />);

    Toast.notify({
      title: 'SUCCESS',
      theme: 'success',
      message: 'Success toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });

    expect(screen.getByClass('aui--toast-title')).toHaveClass('aui--toast-title-success');

    expect(screen.getByClass('aui--toast-title')).toHaveTextContent('SUCCESS');
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Success toast');
  });

  it('should render alert type', async () => {
    render(<Toast.Container />);

    Toast.notify({
      title: 'ALERT',
      theme: 'alert',
      message: 'Alert toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });

    expect(screen.getByClass('aui--toast-title')).toHaveClass('aui--toast-title-alert');

    expect(screen.getByClass('aui--toast-title')).toHaveTextContent('ALERT');
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Alert toast');
  });

  it('should render attention type', async () => {
    render(<Toast.Container />);

    Toast.notify({
      title: 'ATTENTION',
      theme: 'attention',
      message: 'Attention toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });

    expect(screen.getByClass('aui--toast-title')).toHaveClass('aui--toast-title-attention');

    expect(screen.getByClass('aui--toast-title')).toHaveTextContent('ATTENTION');
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Attention toast');
  });

  it('should render info type', async () => {
    render(<Toast.Container />);

    Toast.notify({
      title: 'INFO',
      theme: 'info',
      message: 'Info toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });

    expect(screen.getByClass('aui--toast-title')).toHaveClass('aui--toast-title-info');

    expect(screen.getByClass('aui--toast-title')).toHaveTextContent('INFO');
    expect(screen.getByClass('aui--toast-body-message')).toHaveTextContent('Info toast');
  });
});

describe('<ToastMessage />', () => {
  it('should render toast message as expected', () => {
    render(<ToastMessage toastClass="aui--toast-title aui--toast-title-info" title="Test" message="Test Message" />);

    expect(screen.getAllByClass('aui--toast-body-message')).toHaveLength(1);
    expect(screen.getAllByClass('aui--toast-title aui--toast-title-info')).toHaveLength(1);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});

describe('<Toast.Container />', () => {
  it('should render Toast.Container without error', async () => {
    render(<Toast.Container />);
    Toast.notify({
      title: 'test',
      theme: 'attention',
      message: 'Testing Toast',
    });
    await waitFor(() => {
      expect(screen.getByClass('aui--toast-body-message')).toBeInTheDocument();
    });
    expect(screen.getAllByClass('aui--toast-container')).toHaveLength(1);
  });
});
