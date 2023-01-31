"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSelected = exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _SplitPane = _interopRequireDefault(require("../SplitPane"));
var _Grid = _interopRequireDefault(require("./Grid"));
var _Nav = _interopRequireDefault(require("./Nav"));
var _FlexibleSpacer = _interopRequireDefault(require("../FlexibleSpacer"));
var _TreePickerPropTypes = require("../../prop-types/TreePickerPropTypes");
const removeSelected = _ref => {
  let {
    subtree,
    selectedNodes
  } = _ref;
  if (!subtree) return subtree;
  return _lodash.default.reject(subtree, _ref2 => {
    let {
      id
    } = _ref2;
    return _lodash.default.some(selectedNodes, {
      id
    });
  });
};
exports.removeSelected = removeSelected;
const TreePickerSimplePure = _ref3 => {
  let {
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
    addNodePopoverInfoProps,
    removeNodePopoverInfoProps
  } = _ref3;
  const selectableNodes = removeSelected({
    subtree,
    selectedNodes
  });
  let searchTextNode = emptyText || 'No items to select.';
  searchTextNode = initialStateNode && _lodash.default.isEmpty(searchValue) ? initialStateNode : searchTextNode;
  const emptySymbol = initialStateSymbol && _lodash.default.isEmpty(searchValue) ? initialStateSymbol : emptySvgSymbol;
  const className = (0, _classnames.default)('treepickersimplepure-component', {
    disabled
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_SplitPane.default, {
    additionalClassNames: additionalClassNames,
    dts: `treepicker-splitpane-available-${_lodash.default.kebabCase(itemType)}`
  }, hideSearchOnRoot && _lodash.default.isEmpty(breadcrumbNodes) ? null : /*#__PURE__*/_react.default.createElement(_Nav.default, {
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
    svgSymbolSearch
  }), /*#__PURE__*/_react.default.createElement(_Grid.default, {
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
    addNodePopoverInfoProps
  }), /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null)), /*#__PURE__*/_react.default.createElement(_SplitPane.default, {
    dts: `treepicker-splitpane-selected-${_lodash.default.kebabCase(itemType)}`
  }, selectedTopSearch, /*#__PURE__*/_react.default.createElement(_Grid.default, {
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
    removeNodePopoverInfoProps
  }), /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null)));
};
TreePickerSimplePure.propTypes = {
  /**
   * 	Class Names for SplitPane component
   */
  additionalClassNames: _propTypes.default.arrayOf(_propTypes.default.string),
  /**
   * 	Optional. This prop allows customization of the Breadcrumb root node. { id: PropTypes.sting | PropTypes.number, label: PropTypes.string}
   */
  breadcrumbRootNode: _TreePickerPropTypes.TreePickerPropTypesBreadCrumbNode,
  /**
   * 	Returns node id. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  breadcrumbNodes: _propTypes.default.arrayOf(_TreePickerPropTypes.TreePickerPropTypesBreadCrumbNode.isRequired),
  /**
   * 	This propType creates a list of breadcrumb node
   */
  breadcrumbOnClick: _propTypes.default.func,
  /**
   * 	Interval time on search
   */
  debounceInterval: _propTypes.default.number,
  /**
   * 	Disables treepicker including search bar
   */
  disabled: _propTypes.default.bool,
  /**
   * 	Disables treepicker's grid item
   */
  disableInclude: _propTypes.default.bool,
  /**
   * 	The svg symbol used when there will be no item on both left or right Grid
   */
  emptySvgSymbol: _propTypes.default.node,
  /**
   * 	The svg symbol used when there will be no item on right Grid (Selected list)
   */
  emptySelectedListSvgSymbol: _propTypes.default.node,
  /**
   * 	Displays this text when there will be no item on left Grid. Prefer type 'string', but rich text can be used here
   */
  emptyText: _propTypes.default.node,
  /**
   * 	Displays this text when there will be no item on right Grid(Selected list). Prefer type 'string', but rich text can be used here.
   */
  emptySelectedListText: _propTypes.default.node,
  /**
   * 	Triggers when clicking any item in the left Grid
   */
  expandNode: _propTypes.default.func,
  /**
   * 	This function use to transform keys of the list item in the left Grid
   */
  groupFormatter: _propTypes.default.func,
  /**
   * 	Hides the empty icon on right Grid (Selected list). Given emptySvgSymbol and hideIcon together, the empty symbol will be only displayed on the left grid.
   */
  hideIcon: _propTypes.default.bool,
  /**
   * 	Click event on '+' button of each list Item
   */
  includeNode: _propTypes.default.func,
  /**
   * 	Same as emptyText
   */
  initialStateNode: _propTypes.default.node,
  /**
   * 	Same as emptySymbol
   */
  initialStateSymbol: _propTypes.default.node,
  /**
   * 	Uses for specific className
   */
  itemType: _propTypes.default.string,
  isLoading: _propTypes.default.bool,
  /**
   * 	Uses for rendering custom node
   */
  nodeRenderer: _propTypes.default.func,
  removeNode: _propTypes.default.func,
  /**
   * 	Triggers when search input changes
   */
  onChange: _propTypes.default.func,
  /**
   * 	Triggers when the user clicks the clear button on search input
   */
  onClear: _propTypes.default.func,
  /**
   * Please see <a href='/search'>Search</a>
   */
  onSearch: _propTypes.default.func,
  /**
   * Please see <a href='/search'>Search</a>
   */
  searchOnEnter: _propTypes.default.bool,
  searchPlaceholder: _propTypes.default.string,
  searchValue: _propTypes.default.string,
  selectedNodes: _propTypes.default.arrayOf(_TreePickerPropTypes.TreePickerPropTypesNode).isRequired,
  /**
   * 	Show or hide the search field on the selection pane
   */
  showSearch: _propTypes.default.bool,
  /**
   *  A list of available unselected nodes. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  subtree: _propTypes.default.arrayOf(_TreePickerPropTypes.TreePickerPropTypesNode.isRequired),
  svgSymbolCancel: _propTypes.default.node,
  svgSymbolSearch: _propTypes.default.node,
  /**
   * 	e.g: Default Group
   */
  displayGroupHeader: _propTypes.default.bool,
  hideSearchOnRoot: _propTypes.default.bool,
  /**
   * 	A react node to be rendered at the top of the right hand side pane. Generally we are expecting a search component.
   */
  selectedTopSearch: _propTypes.default.node,
  addNodePopoverInfoProps: _propTypes.default.object,
  removeNodePopoverInfoProps: _propTypes.default.object
};
TreePickerSimplePure.defaultProps = {
  itemType: 'node',
  debounceInterval: 0,
  disabled: false,
  displayGroupHeader: true,
  isLoading: false,
  searchOnEnter: false,
  showSearch: true,
  searchPlaceholder: 'Search',
  hideSearchOnRoot: false
};
var _default = TreePickerSimplePure;
exports.default = _default;