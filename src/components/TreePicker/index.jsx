import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import SplitPane from '../SplitPane';
import TreePickerGrid from './Grid';
import TreePickerNav from './Nav';
import FlexibleSpacer from '../FlexibleSpacer';
import SvgSymbol from '../SvgSymbol';
import TreePickerPropTypes from '../../prop-types/TreePickerPropTypes';
import './styles.scss';

export const removeSelected = ({ subtree, selectedNodes }) => {
  if (!subtree) return subtree;

  return _.reject(subtree, ({ id }) => _.some(selectedNodes, { id }));
};

const TreePickerSimplePureComponent = ({
  additionalClassNames,
  breadcrumbRootNode,
  breadcrumbNodes,
  breadcrumbOnClick,
  debounceInterval,
  disabled,
  disableInclude,
  emptySvgSymbol,
  emptySelectedListSvgSymbol,
  emptyText,
  emptySelectedListText,
  expandNode,
  groupFormatter,
  hideIcon,
  includeNode,
  initialStateNode,
  initialStateSymbol,
  isLoading,
  itemType,
  nodeRenderer,
  removeNode,
  onChange,
  onClear,
  onSearch,
  searchOnEnter,
  searchPlaceholder,
  searchValue,
  selectedNodes,
  showSearch,
  subtree,
  svgSymbolCancel,
  svgSymbolSearch,
  displayGroupHeader,
  hideSearchOnRoot,
  selectedTopSearch,
}) => {
  const selectableNodes = removeSelected({ subtree, selectedNodes });
  let searchTextNode = emptyText || 'No items to select.';
  searchTextNode = initialStateNode && _.isEmpty(searchValue) ? initialStateNode : searchTextNode;
  const emptySymbol = initialStateSymbol && _.isEmpty(searchValue) ? initialStateSymbol : emptySvgSymbol;

  return (
    <div className={`treepickersimplepure-component ${disabled ? 'disabled' : ''}`}>
      <SplitPane
        additionalClassNames={additionalClassNames}
        dts={`treepicker-splitpane-available-${_.kebabCase(itemType)}`}
      >
        {hideSearchOnRoot && _.isEmpty(breadcrumbNodes) ? null : (
          <TreePickerNav
            {...{
              breadcrumbRootNode,
              breadcrumbNodes,
              breadcrumbOnClick,
              debounceInterval,
              disabled,
              isLoading,
              onClear,
              onChange,
              onSearch,
              searchOnEnter,
              searchPlaceholder,
              searchValue,
              showSearch,
              svgSymbolCancel,
              svgSymbolSearch,
            }}
          />
        )}

        <TreePickerGrid
          {...{
            disabled: disabled || disableInclude,
            emptySvgSymbol: emptySymbol,
            emptyText: searchTextNode,
            expandNode,
            groupFormatter,
            includeNode,
            isLoading,
            itemType,
            nodes: selectableNodes,
            nodeRenderer,
            selected: false,
            displayGroupHeader,
          }}
        />
        <FlexibleSpacer />
      </SplitPane>

      <SplitPane dts={`treepicker-splitpane-selected-${_.kebabCase(itemType)}`}>
        {selectedTopSearch}
        <TreePickerGrid
          {...{
            disabled,
            emptySvgSymbol: emptySelectedListSvgSymbol || emptySvgSymbol,
            emptyText: emptySelectedListText || 'Nothing selected.',
            hideIcon,
            itemType,
            nodes: selectedNodes,
            nodeRenderer,
            removeNode,
            selected: true,
            displayGroupHeader,
          }}
        />
        <FlexibleSpacer />
      </SplitPane>
    </div>
  );
};

TreePickerSimplePureComponent.displayName = 'TreePickerSimplePureComponent';

TreePickerSimplePureComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  breadcrumbRootNode: TreePickerPropTypes.breadCrumbNode,
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode.isRequired),
  breadcrumbOnClick: PropTypes.func,
  debounceInterval: PropTypes.number,
  disabled: PropTypes.bool,
  disableInclude: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptySelectedListSvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.node,
  emptySelectedListText: PropTypes.node,
  expandNode: PropTypes.func,
  groupFormatter: PropTypes.func,
  hideIcon: PropTypes.bool,
  includeNode: PropTypes.func,
  initialStateNode: PropTypes.node,
  initialStateSymbol: PropTypes.shape(SvgSymbol.propTypes),
  itemType: PropTypes.string,
  isLoading: PropTypes.bool,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  searchOnEnter: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedNodes: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired).isRequired,
  showSearch: PropTypes.bool,
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired),
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  displayGroupHeader: PropTypes.bool,
  hideSearchOnRoot: PropTypes.bool,
  selectedTopSearch: PropTypes.node,
};

TreePickerSimplePureComponent.defaultProps = {
  itemType: 'node',
  debounceInterval: 0,
  disabled: false,
  displayGroupHeader: true,
  isLoading: false,
  searchOnEnter: false,
  showSearch: true,
  hideSearchOnRoot: false,
};

export default TreePickerSimplePureComponent;