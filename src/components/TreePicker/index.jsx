import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import SplitPane from '../SplitPane';
import TreePickerGrid from './Grid';
import TreePickerNav from './Nav';
import FlexibleSpacer from '../FlexibleSpacer';
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
  /**
   * 	Class Names for SplitPane component
   */
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  /**
   * 	Optional. This prop allows customization of the Breadcrumb root node. { id: PropTypes.sting | PropTypes.number, label: PropTypes.string}
   */
  breadcrumbRootNode: TreePickerPropTypes.breadCrumbNode,
  /**
   * 	Returns node id. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode.isRequired),
  /**
   * 	This propType creates a list of breadcrumb node
   */
  breadcrumbOnClick: PropTypes.func,
  /**
   * 	Interval time on search
   */
  debounceInterval: PropTypes.number,
  /**
   * 	Disables treepicker including search bar
   */
  disabled: PropTypes.bool,
  /**
   * 	Disables treepicker's grid item
   */
  disableInclude: PropTypes.bool,
  /**
   * 	Displays this svg symbol when there will be no item on both left or right Grid
   */
  emptySvgSymbol: PropTypes.node,
  /**
   * 	Displays this svg symbol when there will be no item on right Grid(Selected list)
   */
  emptySelectedListSvgSymbol: PropTypes.node,
  /**
   * 	Displays this text when there will be no item on left Grid. Prefer type 'string', but rich text can be used here
   */
  emptyText: PropTypes.node,
  /**
   * 	Displays this text when there will be no item on right Grid(Selected list). Prefer type 'string', but rich text can be used here.
   */
  emptySelectedListText: PropTypes.node,
  /**
   * 	Triggers when clicking any item in the left Grid
   */
  expandNode: PropTypes.func,
  /**
   * 	This function use to transform keys of the list item in the left Grid
   */
  groupFormatter: PropTypes.func,
  /**
   * 	Hides icon when displays empty symbol
   */
  hideIcon: PropTypes.bool,
  /**
   * 	Click event on '+' button of each list Item
   */
  includeNode: PropTypes.func,
  /**
   * 	Same as emptyText
   */
  initialStateNode: PropTypes.node,
  /**
   * 	Same as emptySymbol
   */
  initialStateSymbol: PropTypes.node,
  /**
   * 	Uses for specific className
   */
  itemType: PropTypes.string,
  isLoading: PropTypes.bool,
  /**
   * 	Uses for rendering custom node
   */
  nodeRenderer: PropTypes.func,
  removeNode: PropTypes.func,
  /**
   * 	Triggers when search input changes
   */
  onChange: PropTypes.func,
  /**
   * 	Triggers when the user clicks the clear button on search input
   */
  onClear: PropTypes.func,
  /**
   * Please see <a href='/search'>Search</a>
   */
  onSearch: PropTypes.func,
  /**
   * Please see <a href='/search'>Search</a>
   */
  searchOnEnter: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedNodes: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired).isRequired,
  /**
   * 	Show or hide the search field on the selection pane
   */
  showSearch: PropTypes.bool,
  /**
   *  A list of available unselected nodes. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  subtree: PropTypes.arrayOf(TreePickerPropTypes.node.isRequired),
  svgSymbolCancel: PropTypes.node,
  svgSymbolSearch: PropTypes.node,
  /**
   * 	e.g: Default Group
   */
  displayGroupHeader: PropTypes.bool,
  hideSearchOnRoot: PropTypes.bool,
  /**
   * 	A react node to be rendered at the top of the right hand side pane. Generally we are expecting a search component.
   */
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
  searchPlaceholder: 'Search',
  hideSearchOnRoot: false,
};

export default TreePickerSimplePureComponent;
