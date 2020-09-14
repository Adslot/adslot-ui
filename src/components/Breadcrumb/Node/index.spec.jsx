import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import BreadcrumbNode from '.';

afterEach(cleanup);

describe('<BreadcrumbNode />', () => {
  let node;
  let onClick;

  beforeEach(() => {
    node = { id: 'a', label: 'Canada' };
    onClick = jest.fn();
  });

  it('should render a link node', () => {
    const props = { isLast: false, onClick, node };
    const { getByTestId } = render(<BreadcrumbNode {...props} />);

    expect(getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node aui--breadcrumb-node-link');
    expect(getByTestId('breadcrumb-node-wrapper')).toHaveTextContent('Canada');
  });

  it('should render a last node', () => {
    const props = { isLast: true, onClick, node };
    const { getByTestId } = render(<BreadcrumbNode {...props} />);

    expect(getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node');
    expect(getByTestId('breadcrumb-node-wrapper')).toHaveTextContent('Canada');
    fireEvent.click(getByTestId('breadcrumb-node-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should trigger onClick when clicking a node', () => {
    const props = { isLast: false, onClick: onClick, node };
    const { getByTestId } = render(<BreadcrumbNode {...props} />);

    expect(getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node aui--breadcrumb-node-link');
    expect(getByTestId('breadcrumb-node-wrapper')).toHaveTextContent(node.label);

    fireEvent.click(getByTestId('breadcrumb-node-wrapper'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('a');
  });
});
