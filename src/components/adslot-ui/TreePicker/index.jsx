import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'adslot-ui/SplitPane';
import TreePickerGrid from 'adslot-ui/TreePicker/Grid';
import TreePickerNav from 'adslot-ui/TreePicker/Nav';
import FlexibleSpacer from 'alexandria/FlexibleSpacer';
import SvgSymbol from 'alexandria/SvgSymbol';
import TreePickerPropTypes from '../../prop-types/TreePickerPropTypes';

require('./styles.scss');

export const removeSelected = ({ subtree, selectedNodes }) => {
  if (!subtree) return subtree;

  return _.reject(subtree, ({ id }) => _.some(selectedNodes, { id }));
};

const TreePickerSimplePureComponent = ({
  additionalClassNames,
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
  searchOnChange,
  searchOnEnterKey,
  searchPlaceholder,
  searchValue,
  selectedNodes,
  subtree,
  svgSymbolCancel,
  svgSymbolSearch,
  displayGroupHeader,
  hideSearchOnRoot,
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
              breadcrumbNodes,
              breadcrumbOnClick,
              debounceInterval,
              disabled,
              isLoading,
              onClear,
              onChange,
              onSearch,
              searchOnChange,
              searchOnEnterKey,
              searchPlaceholder,
              searchValue,
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

TreePickerSimplePureComponent.displayName = 'AdslotUiTreePickerSimplePureComponent';

TreePickerSimplePureComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
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
  searchOnChange: PropTypes.bool,
  searchOnEnterKey: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedNodes: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired).isRequired,
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired),
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  displayGroupHeader: PropTypes.bool,
  hideSearchOnRoot: PropTypes.bool,
};

TreePickerSimplePureComponent.defaultProps = {
  itemType: 'node',
  debounceInterval: 0,
  disabled: false,
  displayGroupHeader: true,
  isLoading: false,
  searchOnChange: true,
  searchOnEnterKey: false,
  hideSearchOnRoot: false,
};

export default TreePickerSimplePureComponent;
