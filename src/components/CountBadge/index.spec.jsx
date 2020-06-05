import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CountBadge from '.';

afterEach(cleanup);

describe('<CountBadge />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<CountBadge value={1} dts="count-badge-one" />);
    expect(getByTestId('count-badge-wrapper')).toHaveAttribute('data-test-selector', 'count-badge-one');
    expect(getByTestId('count-badge-wrapper')).toHaveTextContent('1');
    expect(getByTestId('count-badge-wrapper')).toHaveClass('status-default');
    expect(getByTestId('count-badge-wrapper')).toHaveClass('count-badge-font-size-normal');
  });

  it('should render with status info', () => {
    const { getByTestId } = render(<CountBadge value={2} dts="count-badge-two" status="info" />);
    expect(getByTestId('count-badge-wrapper')).toHaveClass('status-info');
  });

  it('should render with status warning', () => {
    const { getByTestId } = render(<CountBadge value={2} dts="count-badge-three" status="warning" />);
    expect(getByTestId('count-badge-wrapper')).toHaveClass('status-warning');
  });

  it('should render with status danger', () => {
    const { getByTestId } = render(<CountBadge value={2} dts="count-badge-four" status="danger" />);
    expect(getByTestId('count-badge-wrapper')).toHaveClass('status-danger');
  });

  it('should render with a smaller font size if the value is greater than 99', () => {
    const { getByTestId } = render(<CountBadge value={100} dts="count-badge-five" status="info" />);
    expect(getByTestId('count-badge-wrapper')).toHaveClass('count-badge-font-size-small');
  });
});
