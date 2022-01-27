import React from 'react';
import { toast } from 'react-toastify';
import { act, render, cleanup, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import Toast, { ToastMessage } from '.';

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
afterEach(cleanup);

describe('Toast.notify', () => {
  it('should render notification as expected', () => {
    const toastSpy = jest.spyOn(toast, 'info');

    render(<Toast.Container />);
    Toast.notify({
      title: 'test',
      theme: 'test',
      message: 'Testing Toast',
    });

    expect(toastSpy).toHaveBeenCalledTimes(1);
    toastSpy.mockRestore();
  });
});

describe('<ToastMessage />', () => {
  it('should render toast message as expected', () => {
    const { queryByText, container } = render(
      <ToastMessage toastClass="aui--toast-title aui--toast-title-info" title="Test" message="Test Message" />
    );

    expect(queryAllByClass(container, 'aui--toast-body-message')).toHaveLength(1);
    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-info')).toHaveLength(1);
    expect(queryByText('Test')).toBeInTheDocument();
    expect(queryByText('Test Message')).toBeInTheDocument();
  });
});

describe('<Toast.Container />', () => {
  it('should render Toast.Container without error', () => {
    const { container } = render(<Toast.Container />);

    act(() => {
      jest.runAllTimers();
    });

    expect(
      queryAllByClass(
        container,
        'Toastify__toast-container Toastify__toast-container--bottom-left aui--toast-container'
      )
    ).toHaveLength(1);
  });
});

describe('<Toast.Notification />', () => {
  it('should render default info type', () => {
    const { container, rerender, queryByText } = render(
      <div>
        <Toast.Container />
      </div>
    );
    rerender(
      <div>
        <Toast.Container />
        <Toast.Notification message={<span>Default toast</span>} />
      </div>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-info')).toHaveLength(1);
    expect(getByClass(container, 'aui--toast-title aui--toast-title-info')).toBeEmptyDOMElement();
    expect(queryByText('Default toast')).toBeInTheDocument();
  });

  it('should render success type', () => {
    const { container, rerender, queryByText } = render(
      <div>
        <Toast.Container />
      </div>
    );
    rerender(
      <div>
        <Toast.Container />
        <Toast.Notification theme="success" message={<span>Success toast</span>} title="SUCCESS" />
      </div>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-success')).toHaveLength(1);
    expect(getByClass(container, 'aui--toast-title aui--toast-title-success')).toHaveTextContent('SUCCESS');
    expect(queryByText('Success toast')).toBeInTheDocument();
  });

  it('should render alert type', () => {
    const { container, rerender, queryByText } = render(
      <div>
        <Toast.Container />
      </div>
    );
    rerender(
      <div>
        <Toast.Container />
        <Toast.Notification theme="alert" message={<span>Alert toast</span>} title="ALERT" />
      </div>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-alert')).toHaveLength(1);
    expect(getByClass(container, 'aui--toast-title aui--toast-title-alert')).toHaveTextContent('ALERT');
    expect(queryByText('Alert toast')).toBeInTheDocument();
  });

  it('should render attention type', () => {
    const { container, rerender, queryByText } = render(
      <div>
        <Toast.Container />
      </div>
    );
    rerender(
      <div>
        <Toast.Container />
        <Toast.Notification theme="attention" message={<span>Attention toast</span>} title="ATTENTION" />
      </div>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-attention')).toHaveLength(1);
    expect(getByClass(container, 'aui--toast-title aui--toast-title-attention')).toHaveTextContent('ATTENTION');
    expect(queryByText('Attention toast')).toBeInTheDocument();
  });

  it('should render info type', () => {
    const { container, rerender, queryByText } = render(
      <div>
        <Toast.Container />
      </div>
    );
    rerender(
      <div>
        <Toast.Container />
        <Toast.Notification theme="info" message={<span>Info toast</span>} title="INFO" />
      </div>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByClass(container, 'aui--toast-title aui--toast-title-info')).toHaveLength(1);
    expect(getByClass(container, 'aui--toast-title aui--toast-title-info')).toHaveTextContent('INFO');
    expect(queryByText('Info toast')).toBeInTheDocument();
  });
});
