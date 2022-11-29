import React from 'react';
import { render, screen } from 'testing';
import CountBadge from '.';

describe('<CountBadge />', () => {
  it('should render with defaults', () => {
    render(<CountBadge value={1} dts="count-badge-one" />);
    expect(screen.getByTestId('count-badge-wrapper')).toHaveAttribute('data-test-selector', 'count-badge-one');
    expect(screen.getByTestId('count-badge-wrapper')).toHaveTextContent('1');
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('status-default');
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('count-badge-font-size-normal');
  });

  it('should render with status info', () => {
    render(<CountBadge value={2} dts="count-badge-two" status="info" />);
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('status-info');
  });

  it('should render with status warning', () => {
    render(<CountBadge value={2} dts="count-badge-three" status="warning" />);
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('status-warning');
  });

  it('should render with status danger', () => {
    render(<CountBadge value={2} dts="count-badge-four" status="danger" />);
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('status-danger');
  });

  it('should render with a smaller font size if the value is greater than 99', () => {
    render(<CountBadge value={100} dts="count-badge-five" status="info" />);
    expect(screen.getByTestId('count-badge-wrapper')).toHaveClass('count-badge-font-size-small');
  });
});
