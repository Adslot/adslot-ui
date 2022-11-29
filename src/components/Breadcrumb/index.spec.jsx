import React from 'react';
import { render, screen, user } from 'testing';
import Breadcrumb from '.';

describe('<Breadcrumb />', () => {
  let nodes;
  beforeEach(() => {
    nodes = [
      { id: 'a', label: 'Canada' },
      { id: 'b', label: 'British Columbia' },
      { id: 'c', label: 'Victoria' },
    ];
  });

  it('should render empty with the component className when no nodes', () => {
    render(<Breadcrumb onClick={jest.fn()} />);

    expect(screen.getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb');
    expect(screen.getByTestId('breadcrumb-wrapper')).not.toHaveClass('aui--breadcrumb--disabled');
    expect(screen.queryByTestId('breadcrumb-node-wrapper')).not.toBeInTheDocument();
  });

  it('should render nodes', () => {
    render(<Breadcrumb onClick={jest.fn()} nodes={nodes} divider="/" />);

    expect(screen.getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb');
    expect(screen.getByTestId('breadcrumb-wrapper')).not.toHaveClass('aui--breadcrumb--disabled');
    expect(screen.queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(4);
    expect(screen.queryAllByTestId('breadcrumb-node-wrapper')[0]).toHaveTextContent('All');

    expect(screen.queryAllByTestId('breadcrumb-node-divider')).toHaveLength(nodes.length);
    screen
      .queryAllByTestId('breadcrumb-node-divider')
      .forEach((node) => expect(node).toHaveTextContent('/', { normalizeSpaces: false }));

    screen.queryAllByTestId('breadcrumb-node-wrapper').forEach((node, index) => {
      expect(node).toHaveClass('aui--breadcrumb-node');
      if (index === nodes.length) expect(node).not.toHaveClass('aui--breadcrumb-node-link');
      if (index !== nodes.length) expect(node).toHaveClass('aui--breadcrumb-node-link');
    });
  });

  it('should call props.onClick when clicking a node with onClick handler', async () => {
    const onClick = jest.fn();
    render(<Breadcrumb onClick={onClick} nodes={nodes} />);

    await user.click(screen.queryAllByTestId('breadcrumb-node-wrapper')[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe('disabled', () => {
    it('should have disabled class', () => {
      render(<Breadcrumb onClick={jest.fn()} nodes={nodes} disabled />);
      expect(screen.getByTestId('breadcrumb-wrapper')).toHaveClass('aui--breadcrumb--disabled');
    });

    it('should not trigger onclick', async () => {
      const onClick = jest.fn();
      render(<Breadcrumb onClick={jest.fn()} nodes={nodes} disabled />);
      await user.click(screen.queryAllByTestId('breadcrumb-node-wrapper')[0]);
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
