import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Breadcrumb from '.';

afterEach(cleanup);

describe('<Breadcrumb />', () => {
  let nodes;
  const onClick = jest.fn();
  beforeEach(() => {
    nodes = [{ id: 'a', label: 'Canada' }, { id: 'b', label: 'British Columbia' }, { id: 'c', label: 'Victoria' }];
  });

  it('should render empty with the component className when no nodes', () => {
    const { getByTestId, queryAllByTestId } = render(<Breadcrumb />);

    expect(getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb');
    expect(getByTestId('breadcrumb-wrapper')).not.toHaveClass('aui--breadcrumb--disabled');
    expect(queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(0);
  });

  it('should render nodes', () => {
    const { getByTestId, queryAllByTestId } = render(<Breadcrumb nodes={nodes} divider="/" />);

    expect(getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb');
    expect(getByTestId('breadcrumb-wrapper')).not.toHaveClass('aui--breadcrumb--disabled');
    expect(queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(4);
    expect(queryAllByTestId('breadcrumb-node-wrapper')[0]).toHaveTextContent('All');

    expect(queryAllByTestId('breadcrumb-node-divider')).toHaveLength(nodes.length);
    queryAllByTestId('breadcrumb-node-divider').forEach(node =>
      expect(node).toHaveTextContent('/', { normalizeSpaces: false })
    );

    queryAllByTestId('breadcrumb-node-wrapper').forEach((node, index) => {
      expect(node).toHaveClass('aui--breadcrumb-node');
      if (index === nodes.length) expect(node).not.toHaveClass('aui--breadcrumb-node-link');
      if (index !== nodes.length) expect(node).toHaveClass('aui--breadcrumb-node-link');
    });
  });

  it('should error when clicking a node with no onClick handler', () => {
    const { queryAllByTestId } = render(<Breadcrumb nodes={nodes} />);
    console.error = err => {
      throw new Error(err);
    };
    expect(() => fireEvent.click(queryAllByTestId('breadcrumb-node-wrapper')[0])).toThrow(
      'Breadcrumb needs an onClick handler to take all'
    );
  });

  it('should call props.onClick when clicking a node with onClick handler', () => {
    const props = { onClick, nodes };
    const { queryAllByTestId } = render(<Breadcrumb {...props} />);

    fireEvent.click(queryAllByTestId('breadcrumb-node-wrapper')[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  describe('disabled', () => {
    const props = {
      onClick,
      nodes,
      disabled: true,
    };

    it('should have disabled class', () => {
      const { getByTestId } = render(<Breadcrumb {...props} />);
      expect(getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb--disabled');
    });

    it('should not have any breadcrumb node', () => {
      const { queryAllByTestId } = render(<Breadcrumb {...props} />);
      expect(queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(0);
      expect(queryAllByTestId('breadcrumb-node')).toHaveLength(0);
    });
  });
});
