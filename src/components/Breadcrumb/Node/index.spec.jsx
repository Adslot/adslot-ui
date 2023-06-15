import React from 'react';
import { render, screen, user } from 'testing';
import BreadcrumbNode from '.';

let node;
let onClick;

beforeEach(() => {
  node = { id: 'a', label: 'Canada' };
  onClick = jest.fn();
});

it('should render a link node', () => {
  const props = { isLast: false, onClick, node };
  render(<BreadcrumbNode {...props} />);

  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node aui--breadcrumb-node-link');
  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveTextContent('Canada');
});

it('should render a last node', async () => {
  const props = { isLast: true, onClick, node };
  render(<BreadcrumbNode {...props} />);

  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node');
  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveTextContent('Canada');
  await user.click(screen.getByTestId('breadcrumb-node-wrapper'));
  expect(onClick).toHaveBeenCalledTimes(0);
});

it('should trigger onClick when clicking a node', async () => {
  const props = { isLast: false, onClick: onClick, node };
  render(<BreadcrumbNode {...props} />);

  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveClass('aui--breadcrumb-node aui--breadcrumb-node-link');
  expect(screen.getByTestId('breadcrumb-node-wrapper')).toHaveTextContent(node.label);

  await user.click(screen.getByTestId('breadcrumb-node-wrapper'));
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith('a');
});
