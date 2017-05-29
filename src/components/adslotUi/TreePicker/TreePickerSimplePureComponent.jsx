import _ from 'lodash';
import React, { PropTypes } from 'react';
import SplitPane from 'components/adslotUi/SplitPaneComponent';
import TreePickerGrid from 'components/adslotUi/TreePicker/TreePickerGridComponent';
import TreePickerNav from 'components/adslotUi/TreePicker/TreePickerNavComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import FlexibleSpacer from 'components/alexandria/FlexibleSpacer/component';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
import { removeSelected } from 'helpers/TreePickerHelpers';

require('styles/adslotUi/TreePickerSimplePure.scss');

const TreePickerSimplePureComponent = ({
  additionalClassNames,
  breadcrumbNodes,
  breadcrumbOnClick,
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
  itemType,
  nodeRenderer,
  removeNode,
  searchOnChange,
  searchOnClear,
  searchPlaceholder,
  searchValue,
  selectedNodes,
  subtree,
  svgSymbolCancel,
  svgSymbolSearch,
}) => {
  const selectableNodes = removeSelected({ subtree, selectedNodes });
  let searchTextNode = emptyText || 'No items to select.';
  searchTextNode = initialStateNode && _.isEmpty(searchValue) ? initialStateNode : searchTextNode;
  const emptySymbol = initialStateSymbol && _.isEmpty(searchValue) ? initialStateSymbol : emptySvgSymbol;

  return (
    <div className="treepickersimplepure-component">
      <SplitPane
        additionalClassNames={additionalClassNames}
        dts={`treepicker-splitpane-available-${_.kebabCase(itemType)}`}
      >
        <TreePickerNav
          {...{
            breadcrumbNodes,
            breadcrumbOnClick,
            disabled,
            searchOnChange,
            searchOnClear,
            searchPlaceholder,
            searchValue,
            svgSymbolCancel,
            svgSymbolSearch,
          }}
        />

        <TreePickerGrid
          {...{
            disabled: disabled || disableInclude,
            emptySvgSymbol: emptySymbol,
            emptyText: searchTextNode,
            expandNode,
            groupFormatter,
            includeNode,
            itemType,
            nodes: selectableNodes,
            nodeRenderer,
            selected: false,
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
  disabled: PropTypes.bool,
  disableInclude: PropTypes.bool,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptySelectedListSvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  emptyText: PropTypes.any,
  emptySelectedListText: PropTypes.any,
  expandNode: PropTypes.func,
  groupFormatter: PropTypes.func,
  hideIcon: PropTypes.bool,
  includeNode: PropTypes.func,
  initialStateNode: PropTypes.any,
  initialStateSymbol: PropTypes.shape(SvgSymbol.propTypes),
  itemType: PropTypes.string.isRequired,
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  searchOnChange: PropTypes.func,
  searchOnClear: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedNodes: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired).isRequired,
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired),
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
};

TreePickerSimplePureComponent.defaultProps = {
  disabled: false,
  itemType: 'node',
};

export default TreePickerSimplePureComponent;
