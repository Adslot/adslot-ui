import _ from 'lodash';
import React from 'react';
import { act, render, cleanup } from '@testing-library/react';
import Button from '../Button';
import ActionPanel from '.';

afterEach(cleanup);

describe('<ActionPanel />', () => {
  const makeProps = override =>
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
});
