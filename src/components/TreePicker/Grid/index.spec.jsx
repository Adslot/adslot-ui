import _ from 'lodash';
import React from 'react';
import { render, screen } from 'testing';
import TreePickerGrid from '.';
import TreePickerMocks from '../mocks';

const { itemType, qldNode, saNode, nodeRenderer, valueFormatter } = TreePickerMocks;
const svgSymbol = <div className="testing-empty-svg-symbol" data-testid="testing-svg-symbol" />;

it('should render with props', () => {
  const props = {
    emptySvgSymbol: svgSymbol,
    emptyText: 'Empty!',
    expandNode: jest.fn(),
    includeNode: jest.fn(),
    itemType,
    nodes: [qldNode, saNode],
    nodeRenderer,
    removeNode: jest.fn(),
    selected: false,
    valueFormatter,
    displayGroupHeader: true,
    isLoading: false,
  };

  render(<TreePickerGrid {...props} />);
  expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-wrapper').children).toHaveLength(2);

  expect(screen.getByTestId('treepicker-grid-node-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');
  expect(screen.getByTestId('treepicker-grid-node-wrapper').children).toHaveLength(3);

  expect(screen.getByTestId('grid-wrapper')).toContainElement(screen.getByTestId('treepicker-grid-node-wrapper'));
  expect(screen.getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');

  expect(screen.getByTestId('empty-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-wrapper')).toContainElement(screen.getByTestId('empty-wrapper'));
});

describe('should render with groups', () => {
  let props = {};

  beforeEach(() => {
    props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: jest.fn(),
      groupFormatter: (node) => node.id,
      includeNode: jest.fn(),
      itemType,
      nodes: [qldNode, saNode],
      nodeRenderer,
      removeNode: jest.fn(),
      selected: false,
      valueFormatter,
      isLoading: false,
    };
  });

  it('should render with groups by default', () => {
    render(<TreePickerGrid {...props} />);
    expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('grid-wrapper').children).toHaveLength(3);
    expect(screen.getAllByTestId('treepicker-grid-node-wrapper')).toHaveLength(2);
    screen
      .getAllByTestId('treepicker-grid-node-wrapper')
      .forEach((group) => expect(group).toHaveClass('treepickergrid-component-group'));

    _.forEach(props.nodes, (node, index) => {
      const currentNode = screen.getAllByTestId('treepicker-grid-node-wrapper')[index];
      const groupLabel = screen.getByDts(`group-label-${node.id}`);

      expect(currentNode).toContainElement(groupLabel);
      expect(groupLabel).toHaveTextContent(node.id);
    });
  });

  it('should render with no group header when displayGroupHeader is false', () => {
    props = _.assign({}, props, {
      nodes: [qldNode],
      displayGroupHeader: false,
    });
    render(<TreePickerGrid {...props} />);
    expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('grid-wrapper').children).toHaveLength(2);
    expect(screen.getByTestId('treepicker-grid-node-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');
    expect(screen.getByTestId('treepicker-grid-node-wrapper').children).toHaveLength(1);
  });
});

it('should display empty when there is no valid group', () => {
  const props = {
    emptySvgSymbol: svgSymbol,
    emptyText: 'Empty!',
    expandNode: jest.fn(),
    groupFormatter: (node) => node.randomAttr,
    includeNode: jest.fn(),
    itemType,
    nodes: [qldNode],
    nodeRenderer,
    removeNode: jest.fn(),
    selected: false,
    valueFormatter,
    isLoading: false,
  };
  render(<TreePickerGrid {...props} />);
  expect(screen.getByTestId('empty-wrapper')).toBeInTheDocument();
});

it('should not display empty with an undefined nodes list', () => {
  const props = {
    emptySvgSymbol: svgSymbol,
    emptyText: 'Empty!',
    expandNode: jest.fn(),
    includeNode: jest.fn(),
    itemType,
    nodes: undefined,
    removeNode: jest.fn(),
    selected: false,
    valueFormatter,
    isLoading: false,
  };
  render(<TreePickerGrid {...props} />);
  expect(screen.queryByTestId('empty-wrapper')).not.toBeInTheDocument();
});

it('should display a loading state instead of empty state when isLoading is set to true', () => {
  const props = {
    selected: false,
    itemType: 'test',
    emptyText: 'nothing here',
    isLoading: true,
  };
  render(<TreePickerGrid {...props} />);
  expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
});

it('should display a loading state instead of nodes when isLoading is set to true', () => {
  const props = {
    selected: false,
    itemType: 'test',
    emptyText: 'nothing here',
    nodes: [qldNode],
  };

  render(<TreePickerGrid {...props} isLoading />);
  expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
});

it('should hide the emptySvgSymbol of the tree picker grid as expected', () => {
  const props = {
    emptySvgSymbol: svgSymbol,
    emptyText: 'Empty!',
    nodes: [],
    expandNode: jest.fn(),
    includeNode: jest.fn(),
    itemType,
    nodeRenderer,
    removeNode: jest.fn(),
    selected: false,
    valueFormatter,
    displayGroupHeader: true,
    isLoading: false,
  };

  const view = render(<TreePickerGrid {...props} />);
  expect(screen.getByTestId('empty-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('testing-svg-symbol')).toBeInTheDocument();
  expect(screen.getByTestId('empty-wrapper')).toContainElement(screen.getByTestId('testing-svg-symbol'));

  view.rerender(<TreePickerGrid {...props} hideIcon />);

  expect(screen.queryByTestId('testing-svg-symbol')).not.toBeInTheDocument();
});
