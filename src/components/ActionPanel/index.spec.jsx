import _ from 'lodash';
import React from 'react';
import { act, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';
import ActionPanel from '.';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

afterEach(cleanup);

describe('<ActionPanel />', () => {
  const makeProps = (override) =>
    _.merge(
      {
        title: 'Action Panel',
        size: 'small',
        onClose: _.noop,
        children: <div>content</div>,
      },
      override
    );

  it('should render with defaults', () => {
    const { getByTestId, queryByTestId } = render(<ActionPanel {...makeProps()} />);
    expect(queryByTestId('action-panel-header')).toBeInTheDocument();
    expect(getByTestId('action-panel-header')).toHaveClass('aui--action-panel-header');
    expect(getByTestId('action-panel-title')).toHaveClass('title');
    expect(getByTestId('action-panel-title')).toHaveTextContent('Action Panel');

    expect(queryByTestId('action-panel-body')).toBeInTheDocument();
    expect(getByTestId('action-panel-body')).toHaveClass('aui--action-panel-body');

    expect(document.body).not.toHaveClass('modal-open');
  });

  it('should render as a modal', () => {
    let wrapper;
    act(() => {
      wrapper = render(
        <ActionPanel {...makeProps({ isModal: true, size: 'large', actionButton: <Button>Action</Button> })} />
      );
    });

    expect(document.body).toHaveClass('modal-open');
    expect(wrapper.queryByTestId('action-panel-modal-wrapper')).toBeInTheDocument();
    expect(wrapper.getByTestId('action-panel-wrapper')).toHaveClass('aui--action-panel is-large action-modal');
    expect(wrapper.getAllByTestId('button-wrapper')[0]).toHaveTextContent('Cancel'); // default cancel text is 'Cancel'
    wrapper.unmount();
    expect(document.body).not.toHaveClass('modal-open');
  });

  it('should not render modal when isModal is false', () => {
    let wrapper;
    act(() => {
      wrapper = render(
        <ActionPanel {...makeProps({ isModal: false, size: 'large', actionButton: <Button>Action</Button> })} />
      );
    });
    expect(document.body).not.toHaveClass('modal-open');

    wrapper.unmount();
    expect(document.body).not.toHaveClass('modal-open');
  });

  it('should trap focus inside the modal', () => {
    const { getAllByRole } = render(
      <ActionPanel {...makeProps({ isModal: true })}>
        <button>Button</button>
        <input type={'search'} />
      </ActionPanel>
    );
    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByRole('button').at(0)).toHaveFocus();

    act(() => {
      userEvent.tab();
      jest.runAllTimers();
    });
    expect(getAllByRole('button').at(1)).toHaveFocus();
    act(() => {
      userEvent.tab();
      jest.runAllTimers();
    });
    expect(getAllByRole('searchbox').at(0)).toHaveFocus();

    act(() => {
      userEvent.tab();
      jest.runAllTimers();
    });
    expect(getAllByRole('button').at(0)).toHaveFocus();

    act(() => {
      userEvent.tab({ shift: true });
      jest.runAllTimers();
    });

    expect(getAllByRole('searchbox').at(0)).toHaveFocus();
    act(() => {
      userEvent.tab({ shift: true });
      jest.runAllTimers();
    });

    expect(getAllByRole('button').at(1)).toHaveFocus();

    act(() => {
      userEvent.tab({ shift: true });
      jest.runAllTimers();
    });
    expect(getAllByRole('button').at(0)).toHaveFocus();
  });

  it('should call onEscapeClose', () => {
    const onEscapeClose = jest.fn();
    render(
      <ActionPanel {...makeProps({ isModal: true, onEscapeClose })}>
        <button>Button</button>
        <input type={'search'} />
      </ActionPanel>
    );

    act(() => {
      userEvent.tab();
      userEvent.keyboard('[Escape]');
    });
    expect(onEscapeClose).toBeCalledTimes(1);
  });

  it('should not close when call onEscapeClose prevents default', () => {
    const onEscapeClose = (e) => e.preventDefault();
    const onClose = jest.fn();
    render(
      <ActionPanel {...makeProps({ isModal: true, onClose, onEscapeClose })}>
        <button>Button</button>
        <input type={'search'} />
      </ActionPanel>
    );

    act(() => {
      userEvent.tab();
      userEvent.keyboard('[Escape]');
    });
    expect(onClose).not.toBeCalled();
  });

  it('should hide the modal with the visuallyHidden prop', () => {
    const { getByTestId } = render(<ActionPanel {...makeProps({ isModal: true, visuallyHidden: true })} />);

    expect(getByTestId('action-panel-modal-wrapper')).toHaveClass('visually-hidden');
  });

  it('should focus the originally focussed element when closing a nested action panel', () => {
    const TestComponent = () => {
      const [showNestedActionPanel, setShowNestedActionPanel] = React.useState();
      return (
        <ActionPanel {...makeProps({ isModal: true, visuallyHidden: showNestedActionPanel })}>
          <button
            data-testid="show-nested"
            onClick={() => {
              setShowNestedActionPanel(true);
            }}
          />
          {showNestedActionPanel && (
            <ActionPanel
              {...makeProps({ isModal: true })}
              cancelButton={<button data-testid="nested-cancel" onClick={() => setShowNestedActionPanel(false)} />}
            >
              ...
            </ActionPanel>
          )}
        </ActionPanel>
      );
    };
    const { getByTestId, getAllByTestId } = render(<TestComponent />);

    act(() => {
      userEvent.tab();
      expect(getByTestId('show-nested')).toHaveFocus();
      userEvent.keyboard('[Enter]');
    });

    expect(getAllByTestId('action-panel-modal-wrapper')[0]).toHaveClass('visually-hidden');
    expect(getAllByTestId('action-panel-wrapper')).toHaveLength(2);
    expect(getByTestId('nested-cancel')).toHaveFocus();

    act(() => {
      userEvent.keyboard('[Enter]');
    });

    act(() => jest.runAllTimers());

    expect(getByTestId('show-nested')).toHaveFocus();
  });

  it('should render a user specified text on the cancel button', () => {
    let wrapper;
    act(() => {
      wrapper = render(
        <ActionPanel
          {...makeProps({
            isModal: true,
            size: 'large',
            actionButton: <Button>Action</Button>,
            cancelButton: <Button>This is a cancel text</Button>,
          })}
        />
      );
    });
    expect(wrapper.getAllByTestId('button-wrapper')[0]).toHaveTextContent('This is a cancel text');
  });
});
