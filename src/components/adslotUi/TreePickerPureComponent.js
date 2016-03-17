import _ from 'lodash';
import SplitPane from 'components/adslotUi/SplitPaneComponent';
import TreePickerGrid from 'components/adslotUi/TreePickerGridComponent';
import TreePickerNav from 'components/adslotUi/TreePickerNavComponent';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import TreePickerSelected from 'components/adslotUi/TreePickerSelectedComponent';
import React, { PropTypes } from 'react';
import { FlexSpacer, SvgSymbol } from 'alexandria-adslot';
import { removeSelected } from 'helpers/TreePickerHelpers';

require('styles/adslotUi/TreePickerPure.scss');

const TreePickerPureComponent = ({
  activeRootTypeId,
  averageWithinRootType,
  baseItem,
  breadcrumbNodes,
  breadcrumbOnClick,
  changeRootType,
  emptySvgSymbol,
  expandNode,
  helpText,
  includeNode,
  removeNode,
  rootTypes,
  searchOnChange,
  searchOnClear,
  searchPlaceholder,
  searchValue,
  selectedLabel,
  selectedNodesByRootType,
  subtree,
  svgSymbolCancel,
  svgSymbolSearch,
  totalsSuffix,
  valueFormatter,
  warnOnRequired,
}) => {
  const changeRootTypeBound = (rootType) => {
    if (rootType.id !== activeRootTypeId) {
      return changeRootType.bind(null, rootType.id);
    }

    return () => null;
  };

  const selectableNodes = removeSelected({ subtree, selectedNodes: selectedNodesByRootType[activeRootTypeId] });

  return (
    <div className="treepickerpure-component">

      <SplitPane dts="treepicker-splitpane-available">

        <ul className="nav nav-tabs">
          {rootTypes.length ? _.map(rootTypes, (rootType) =>
            <li className={(rootType.id === activeRootTypeId) ? 'active' : ''} key={rootType.id}>
              <a onClick={changeRootTypeBound(rootType)} data-test-selector="treepicker-nav-tab">
                <SvgSymbol
                  href={_.get(rootType, 'svgSymbol.href')}
                  classSuffixes={_.get(rootType, 'svgSymbol.classSuffixes', ['gray-darker'])}
                />
                {rootType.label}
              </a>
            </li>)
          : <li><a>Loading</a></li>}
        </ul>

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
          }}
        />
        <FlexSpacer />
      </SplitPane>

      <SplitPane dts="treepicker-splitpane-selected">

        <TreePickerSelected
          {...{
            averageWithinRootType,
            baseItem,
            emptySvgSymbol,
            helpText,
            removeNode,
            rootTypes,
            selectedLabel,
            selectedNodesByRootType,
            totalsSuffix,
            valueFormatter,
            warnOnRequired,
          }}
        />

      </SplitPane>

    </div>
  );
};

TreePickerPureComponent.displayName = 'AdslotUiTreePickerPureComponent';

const baseItemPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

const rootType = PropTypes.shape({
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
});

TreePickerPureComponent.propTypes = {
  activeRootTypeId: PropTypes.string,
  averageWithinRootType: PropTypes.bool.isRequired,
  baseItem: baseItemPropType,
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  changeRootType: PropTypes.func.isRequired,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  expandNode: PropTypes.func,
  helpText: PropTypes.shape({
    average: PropTypes.string,
    sum: PropTypes.string,
  }),
  includeNode: PropTypes.func,
  removeNode: PropTypes.func,
  rootTypes: PropTypes.arrayOf(rootType).isRequired,
  searchOnChange: PropTypes.func,
  searchOnClear: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedLabel: PropTypes.string,
  selectedNodesByRootType: PropTypes.shape(),
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node).isRequired,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
  totalsSuffix: PropTypes.string,
  valueFormatter: PropTypes.func,
  warnOnRequired: PropTypes.bool,
};

TreePickerPureComponent.defaultProps = {
  averageWithinRootType: false,
  rootTypes: [],
  selectedNodesByRootType: {},
  subtree: [],
};

export default TreePickerPureComponent;
