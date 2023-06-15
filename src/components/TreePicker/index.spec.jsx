import _ from 'lodash';
import React from 'react';
import { render, screen } from 'testing';
import TreePickerSimplePure, { removeSelected } from '.';
import TreePickerMocks from './mocks';

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
  render(<TreePickerSimplePure {...props} />);
  expect(screen.getByTestId('treepicker-wrapper')).toHaveClass('treepickersimplepure-component');

  expect(screen.getAllByTestId('split-panel-wrapper')).toHaveLength(2);
  const wrapper = screen.getByTestId('treepicker-wrapper');
  const splitPanes = screen.getAllByTestId('split-panel-wrapper');

  expect(wrapper).toContainElement(splitPanes[0]);
  expect(wrapper).toContainElement(splitPanes[1]);

  expect(screen.getByTestId('treepicker-nav-wrapper')).toBeInTheDocument();

  expect(screen.getAllByTestId('flexible-spacer-wrapper')).toHaveLength(2);
  const leftSplitPane = screen.getByDts(`treepicker-splitpane-available-${_.kebabCase(itemType)}`);
  const rightSplitPane = screen.getByDts(`treepicker-splitpane-selected-${_.kebabCase(itemType)}`);
  expect(leftSplitPane).toContainElement(screen.getAllByTestId('flexible-spacer-wrapper')[0]);
  expect(rightSplitPane).toContainElement(screen.getAllByTestId('flexible-spacer-wrapper')[1]);
});

it('should render empty text as expected', () => {
  const newProps = _.assign({}, props, { subtree: [] });

  const view = render(<TreePickerSimplePure {...newProps} />);

  expect(screen.getByText('Begin searching.')).toBeInTheDocument();
  expect(screen.getByText('Begin searching.')).toHaveClass('empty-component-text');

  view.rerender(<TreePickerSimplePure {...newProps} searchValue="keyword" />);
  expect(screen.queryByText('Begin searching.')).not.toBeInTheDocument();
  expect(screen.getByText('No items to select.')).toBeInTheDocument();
  expect(screen.getByText('No items to select.')).toHaveClass('empty-component-text');
});

it('should have disabled class included when disabled set to true', () => {
  render(<TreePickerSimplePure disabled {...props} />);
  expect(screen.getByTestId('treepicker-wrapper')).toHaveClass('treepickersimplepure-component disabled');
});

it('should not render TreePickerNav when hideSearchOnRoot is true and on root level', () => {
  const hideSearchOnRootProps = _.assign({}, props, {
    hideSearchOnRoot: true,
    breadcrumbNodes: [],
  });
  render(<TreePickerSimplePure {...hideSearchOnRootProps} />);
  expect(screen.queryByTestId('treepicker-nav-wrapper')).not.toBeInTheDocument();
});

it('should render TreePickerNav when hideSearchOnRoot is true and not on root level', () => {
  const hideSearchOnRootProps = _.assign({}, props, {
    hideSearchOnRoot: true,
  });
  render(<TreePickerSimplePure {...hideSearchOnRootProps} />);
  expect(screen.getByTestId('treepicker-nav-wrapper')).toBeInTheDocument();
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
