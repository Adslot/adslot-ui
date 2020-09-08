import _ from 'lodash';
import React from 'react';
import { render, cleanup, queryByAttribute } from '@testing-library/react';
import TreePickerSimplePure, { removeSelected } from '.';
import TreePickerMocks from './mocks';

afterEach(cleanup);

const getByDts = queryByAttribute.bind(null, 'data-test-selector');

describe('<TreePicker />', () => {
  const { actNode, initialSelection, itemType, ntNode, qldNode, saNode } = TreePickerMocks;
  const svgSymbol = <div className="testing-svg-symbol" />;

  const props = {
    breadcrumbNodes: [saNode],
    breadcrumbOnClick: _.noop,
    emptySvgSymbol: svgSymbol,
    initialStateNode: 'Begin searching.',
    initialStateSymbol: svgSymbol,
    expandNode: _.noop,
    includeNode: _.noop,
    itemType,
    nodeRenderer: _.noop,
    removeNode: _.noop,
    onClear: _.noop,
    onChange: _.noop,
    onSearch: _.noop,
    searchOnEnter: false,
    searchPlaceholder: 'Search Geometry',
    searchValue: '',
    selectedNodes: initialSelection,
    subtree: [qldNode, saNode, actNode, ntNode],
    svgSymbolCancel: svgSymbol,
    svgSymbolSearch: svgSymbol,
    hideSearchOnRoot: false,
  };

  it('should render with props', () => {
    const { container, getByTestId, queryAllByTestId } = render(<TreePickerSimplePure {...props} />);
    expect(getByTestId('treepicker-wrapper')).toHaveClass('treepickersimplepure-component');

    expect(queryAllByTestId('split-panel-wrapper')).toHaveLength(2);

    getByTestId('treepicker-wrapper').children.forEach(child => expect(child).toHaveClass('splitpane-component'));

    expect(queryAllByTestId('treepicker-nav-wrapper')).toHaveLength(1);

    expect(queryAllByTestId('flexible-spacer-wrapper')).toHaveLength(2);
    const leftSplitPane = getByDts(container, `treepicker-splitpane-available-${_.kebabCase(itemType)}`);
    const rightSplitPane = getByDts(container, `treepicker-splitpane-selected-${_.kebabCase(itemType)}`);
    expect(leftSplitPane).toContainElement(queryAllByTestId('flexible-spacer-wrapper')[0]);
    expect(rightSplitPane).toContainElement(queryAllByTestId('flexible-spacer-wrapper')[1]);
  });

  it('should render empty text as expected', () => {
    const newProps = _.assign({}, props, { subtree: [] });

    const { getByText, queryAllByText, rerender } = render(<TreePickerSimplePure {...newProps} />);

    expect(queryAllByText('Begin searching.')).toHaveLength(1);
    expect(getByText('Begin searching.')).toHaveClass('empty-component-text');

    rerender(<TreePickerSimplePure {...newProps} searchValue="keyword" />);
    expect(queryAllByText('Begin searching.')).toHaveLength(0);
    expect(queryAllByText('No items to select.')).toHaveLength(1);
    expect(getByText('No items to select.')).toHaveClass('empty-component-text');
  });

  it('should have disabled class included when disabled set to true', () => {
    const { getByTestId } = render(<TreePickerSimplePure disabled {...props} />);
    expect(getByTestId('treepicker-wrapper')).toHaveClass('treepickersimplepure-component disabled');
  });

  it('should not render TreePickerNav when hideSearchOnRoot is true and on root level ', () => {
    const hideSearchOnRootProps = _.assign({}, props, {
      hideSearchOnRoot: true,
      breadcrumbNodes: [],
    });
    const { queryAllByTestId } = render(<TreePickerSimplePure {...hideSearchOnRootProps} />);
    expect(queryAllByTestId('treepicker-nav-wrapper')).toHaveLength(0);
  });

  it('should render TreePickerNav when hideSearchOnRoot is true and not on root level', () => {
    const hideSearchOnRootProps = _.assign({}, props, {
      hideSearchOnRoot: true,
    });
    const { queryAllByTestId } = render(<TreePickerSimplePure {...hideSearchOnRootProps} />);
    expect(queryAllByTestId('treepicker-nav-wrapper')).toHaveLength(1);
  });

  describe('removeSelected', () => {
    it('should remove selected nodes from a subtree', () => {
      const subtree = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).toEqual([{ id: 2 }]);
    });

    it('should return an empty array when passed an empty subtree', () => {
      const subtree = [];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).toEqual([]);
    });

    it('should return undefined when passed an undefined subtree', () => {
      const subtree = undefined;
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).toEqual(undefined);
    });
  });
});
