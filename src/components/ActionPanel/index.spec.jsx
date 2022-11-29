import _ from 'lodash';
import React from 'react';
import { render, screen } from 'testing';
import Button from '../Button';
import ActionPanel from '.';

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
    const view = render(<ActionPanel {...makeProps()} />);
    expect(screen.getByTestId('action-panel-header')).toBeInTheDocument();
    expect(screen.getByTestId('action-panel-header')).toHaveClass('aui--action-panel-header');
    expect(screen.getByTestId('action-panel-title')).toHaveClass('title');
    expect(screen.getByTestId('action-panel-title')).toHaveTextContent('Action Panel');

    expect(screen.getByTestId('action-panel-body')).toBeInTheDocument();
    expect(screen.getByTestId('action-panel-body')).toHaveClass('aui--action-panel-body');

    expect(view.baseElement).not.toHaveClass('modal-open');
  });

  it('should render as a modal', () => {
    const view = render(
      <ActionPanel {...makeProps({ isModal: true, size: 'large', actionButton: <Button>Action</Button> })} />
    );

    expect(view.baseElement).toHaveClass('modal-open');
    expect(screen.getByTestId('action-panel-modal-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('action-panel-wrapper')).toHaveClass('aui--action-panel is-large action-modal');
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveTextContent('Cancel'); // default cancel text is 'Cancel'
    view.unmount();
    expect(view.baseElement).not.toHaveClass('modal-open');
  });

  it('should not render modal when isModal is false', () => {
    const view = render(
      <ActionPanel {...makeProps({ isModal: false, size: 'large', actionButton: <Button>Action</Button> })} />
    );
    expect(view.baseElement).not.toHaveClass('modal-open');
    view.unmount();
    expect(view.baseElement).not.toHaveClass('modal-open');
  });

  it('should hide the modal with the visuallyHidden prop', () => {
    render(<ActionPanel {...makeProps({ isModal: true, visuallyHidden: true })} />);

    expect(screen.getByTestId('action-panel-modal-wrapper')).toHaveClass('visually-hidden');
  });

  it('should render a user specified text on the cancel button', () => {
    render(
      <ActionPanel
        {...makeProps({
          isModal: true,
          size: 'large',
          actionButton: <Button>Action</Button>,
          cancelText: 'This is a cancel text',
        })}
      />
    );
    expect(screen.getAllByTestId('button-wrapper')[0]).toHaveTextContent('This is a cancel text');
  });
});
