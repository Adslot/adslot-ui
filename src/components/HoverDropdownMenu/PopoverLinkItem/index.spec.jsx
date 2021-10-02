import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import PopoverLinkItem from './';

afterEach(cleanup);

describe('<PopoverLinkItem />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      title: 'Link 1',
      url: 'www.some.url.com',
      target: '_self',
      isEnabled: true,
      onClick: jest.fn(),
    };
  });

  it('should render with default props', () => {
    const { getByText, queryByTestId } = render(<PopoverLinkItem {...props} />);
    expect(queryByTestId('popover-link-item-wrapper')).toBeInTheDocument();
    expect(getByText('Link 1')).toHaveAttribute('href', 'www.some.url.com');
  });

  it('should trigger `props.onClick` when clicking on the component', () => {
    const { getByText } = render(<PopoverLinkItem {...props} />);
    fireEvent.click(getByText('Link 1'));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should not have href props on `PopoverLinkItem` when `target` is _modal', () => {
    props.target = '_modal';
    const { getByText } = render(<PopoverLinkItem {...props} />);
    expect(getByText('Link 1')).not.toHaveAttribute('href');
  });

  it('should add `rel` to anchor props when target is "_blank"', () => {
    props.target = '_blank';
    const { getByText } = render(<PopoverLinkItem {...props} />);
    expect(getByText('Link 1')).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
