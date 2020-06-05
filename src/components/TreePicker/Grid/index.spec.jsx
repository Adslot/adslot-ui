import _ from 'lodash';
import React from 'react';
import { render, cleanup, queryByAttribute } from '@testing-library/react';
import TreePickerGrid from '.';
import TreePickerMocks from '../mocks';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');

describe('<TreePickerGrid />', () => {
  const { itemType, qldNode, saNode, nodeRenderer, valueFormatter } = TreePickerMocks;
  const svgSymbol = <div className="testing-empty-svg-symbol" />;

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

    const { getByTestId, queryAllByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);
    expect(getByTestId('grid-wrapper').children).toHaveLength(2);

    expect(queryAllByTestId('treepicker-grid-node-wrapper')).toHaveLength(1);
    expect(getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');
    expect(getByTestId('treepicker-grid-node-wrapper').children).toHaveLength(3);

    expect(getByTestId('grid-wrapper')).toContainElement(getByTestId('treepicker-grid-node-wrapper'));
    expect(getByTestId('treepicker-grid-node-wrapper')).toHaveClass('treepickergrid-component-group');

    expect(queryAllByTestId('empty-wrapper')).toHaveLength(1);
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
      const { getByTestId, queryAllByTestId } = render(<TreePickerGrid {...props} />);
      expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);
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
      const { getByTestId, queryAllByTestId } = render(<TreePickerGrid {...props} />);
      expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);
      expect(getByTestId('grid-wrapper').children).toHaveLength(2);
      expect(queryAllByTestId('treepicker-grid-node-wrapper')).toHaveLength(1);
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
    const { queryAllByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryAllByTestId('empty-wrapper')).toHaveLength(1);
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
    const { queryAllByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryAllByTestId('empty-wrapper')).toHaveLength(0);
  });

  it('should display a loading state instead of empty state when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      isLoading: true,
    };
    const { queryAllByTestId } = render(<TreePickerGrid {...props} />);
    expect(queryAllByTestId('spinner-wrapper')).toHaveLength(1);
  });

  it('should display a loading state instead of nodes when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      nodes: [qldNode],
    };

    const { queryAllByTestId } = render(<TreePickerGrid {...props} isLoading />);
    expect(queryAllByTestId('spinner-wrapper')).toHaveLength(1);
  });
});
