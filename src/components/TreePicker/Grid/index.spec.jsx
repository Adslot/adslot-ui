import _ from 'lodash';
import React from 'react';
import { render, cleanup, queryByAttribute } from '@testing-library/react';
import TreePickerGrid from '.';
import TreePickerMocks from '../mocks';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');

describe('<TreePickerGrid />', () => {
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

    const { getByTestId, queryByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryByTestId('grid-wrapper')).toBeInTheDocument();
    expect(getByTestId('grid-wrapper').children).toHaveLength(2);

    expect(queryByTestId('treepicker-grid-node-wrapper')).toBeInTheDocument();
    expect(getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');
    expect(getByTestId('treepicker-grid-node-wrapper').children).toHaveLength(3);

    expect(getByTestId('grid-wrapper')).toContainElement(getByTestId('treepicker-grid-node-wrapper'));
    expect(getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');

    expect(queryByTestId('empty-wrapper')).toBeInTheDocument();
    expect(getByTestId('grid-wrapper')).toContainElement(getByTestId('empty-wrapper'));
  });

  describe('should render with groups', () => {
    let props = {};

    beforeEach(() => {
      props = {
        emptySvgSymbol: svgSymbol,
        emptyText: 'Empty!',
        expandNode: jest.fn(),
        groupFormatter: node => node.id,
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
      const { getByTestId, queryByTestId, queryAllByTestId } = render(<TreePickerGrid {...props} />);
      expect(queryByTestId('grid-wrapper')).toBeInTheDocument();
      expect(getByTestId('grid-wrapper').children).toHaveLength(3);
      expect(queryAllByTestId('treepicker-grid-node-wrapper')).toHaveLength(2);
      queryAllByTestId('treepicker-grid-node-wrapper').forEach(group =>
        expect(group).toHaveClass('treepickergrid-component-group')
      );

      _.forEach(props.nodes, (node, index) => {
        const currentNode = queryAllByTestId('treepicker-grid-node-wrapper')[index];
        const groupLabel = getByClass(currentNode, 'treepickergrid-component-group-label');

        expect(currentNode).toContainElement(groupLabel);
        expect(groupLabel).toHaveTextContent(node.id);
      });
    });

    it('should render with no group header when displayGroupHeader is false', () => {
      props = _.assign({}, props, {
        nodes: [qldNode],
        displayGroupHeader: false,
      });
      const { getByTestId, queryByTestId } = render(<TreePickerGrid {...props} />);
      expect(queryByTestId('grid-wrapper')).toBeInTheDocument();
      expect(getByTestId('grid-wrapper').children).toHaveLength(2);
      expect(queryByTestId('treepicker-grid-node-wrapper')).toBeInTheDocument();
      expect(getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');
      expect(getByTestId('treepicker-grid-node-wrapper').children).toHaveLength(1);
    });
  });

  it('should display empty when there is no valid group', () => {
    const props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: jest.fn(),
      groupFormatter: node => node.randomAttr,
      includeNode: jest.fn(),
      itemType,
      nodes: [qldNode],
      nodeRenderer,
      removeNode: jest.fn(),
      selected: false,
      valueFormatter,
      isLoading: false,
    };
    const { queryByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryByTestId('empty-wrapper')).toBeInTheDocument();
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
    const { queryByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryByTestId('empty-wrapper')).not.toBeInTheDocument();
  });

  it('should display a loading state instead of empty state when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      isLoading: true,
    };
    const { queryByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryByTestId('spinner-wrapper')).toBeInTheDocument();
  });

  it('should display a loading state instead of nodes when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      nodes: [qldNode],
    };

    const { queryByTestId } = render(<TreePickerGrid {...props} isLoading />);
    expect(queryByTestId('spinner-wrapper')).toBeInTheDocument();
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

    const { getByTestId, queryByTestId, rerender } = render(<TreePickerGrid {...props} />);
    expect(queryByTestId('empty-wrapper')).toBeInTheDocument();
    expect(queryByTestId('testing-svg-symbol')).toBeInTheDocument();
    expect(getByTestId('empty-wrapper')).toContainElement(getByTestId('testing-svg-symbol'));

    rerender(<TreePickerGrid {...props} hideIcon />);

    expect(queryByTestId('testing-svg-symbol')).not.toBeInTheDocument();
  });
});
