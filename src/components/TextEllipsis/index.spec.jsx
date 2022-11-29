import React from 'react';
import { render, screen, user } from 'testing';
import TextEllipsis from '.';

describe('<TextEllipsis />', () => {
  it('should render with defaults', () => {
    render(<TextEllipsis>Sample text</TextEllipsis>);
    expect(screen.getByTestId('popover-element')).toBeInTheDocument();
    expect(screen.getByTestId('popover-element')).toHaveClass('aui--text-ellipsis-wrapper');

    expect(screen.getByTestId('text-ellipsis')).toBeInTheDocument();
    expect(screen.getByTestId('text-ellipsis')).toHaveClass('text-ellipsis-component');
    expect(screen.getByTestId('text-ellipsis')).toHaveTextContent('Sample text');
  });

  it('should render with no popover when text length is less than max length', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 20 });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 50 });

    render(<TextEllipsis>this is a test</TextEllipsis>);
    await user.hover(screen.getByTestId('text-ellipsis'));

    expect(screen.getByTestId('popover-element')).toBeInTheDocument();
    expect(screen.getByTestId('text-ellipsis')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-wrapper')).not.toBeInTheDocument();
  });

  it('should render with popover when text length is more than max length', async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 50 });

    render(<TextEllipsis>this is a test</TextEllipsis>);
    await user.hover(screen.getByTestId('text-ellipsis'));

    expect(screen.getByTestId('popover-element')).toBeInTheDocument();
    expect(screen.getByTestId('text-ellipsis')).toBeInTheDocument();
    expect(screen.getByTestId('popover-wrapper')).toBeInTheDocument();
  });
});
