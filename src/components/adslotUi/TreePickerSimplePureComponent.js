import SplitPane from 'components/adslotUi/SplitPaneComponent';
import TreePickerGrid from 'components/adslotUi/TreePickerGridComponent';
import TreePickerNav from 'components/adslotUi/TreePickerNavComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import React, { PropTypes } from 'react';
import { FlexSpacer, SvgSymbol } from 'alexandria-adslot';
import { removeSelected } from 'helpers/TreePickerHelpers';

require('styles/adslotUi/TreePickerSimplePure.scss');

const TreePickerSimplePureComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  emptySvgSymbol,
  expandNode,
  subtree,
  includeNode,
  removeNode,
  searchOnChange,
  searchOnClear,
  searchPlaceholder,
  searchValue,
  selectedNodes,
  svgSymbolCancel,
  svgSymbolSearch,
  disableInclude,
}) => {
  const selectableNodes = removeSelected({ subtree, selectedNodes });
  return (
    <div className="treepickersimplepure-component">
      <SplitPane>
        <TreePickerNav
          {...{
            breadcrumbNodes,
            breadcrumbOnClick,
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
            emptySvgSymbol,
            emptyText: 'No items to select.',
            expandNode,
            includeNode,
            nodes: selectableNodes,
            selected: false,
            disableInclude,
          }}
        />
        <FlexSpacer />
      </SplitPane>

      <SplitPane>
        <TreePickerGrid
          {...{
            emptySvgSymbol,
            emptyText: 'Nothing selected.',
            nodes: selectedNodes,
            removeNode,
            selected: true,
          }}
        />
        <FlexSpacer />
      </SplitPane>
    </div>
  );
};

TreePickerSimplePureComponent.displayName = 'AdslotUiTreePickerSimplePureComponent';

TreePickerSimplePureComponent.propTypes = {
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode.isRequired),
  breadcrumbOnClick: PropTypes.func,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  expandNode: PropTypes.func,
  includeNode: PropTypes.func,
  removeNode: PropTypes.func,
  searchOnChange: PropTypes.func,
  searchOnClear: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedNodes: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired).isRequired,
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired),
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  disableInclude: PropTypes.bool,
};

export default TreePickerSimplePureComponent;
