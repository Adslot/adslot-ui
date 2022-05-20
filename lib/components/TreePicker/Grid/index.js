"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Node = _interopRequireDefault(require("../Node"));

var _Empty = _interopRequireDefault(require("../../Empty"));

var _Grid = _interopRequireDefault(require("../../Grid"));

var _Row = _interopRequireDefault(require("../../Grid/Row"));

var _Spinner = _interopRequireDefault(require("../../Spinner"));

var _TreePickerPropTypes = require("../../../prop-types/TreePickerPropTypes");

var TreePickerGrid = function TreePickerGrid(_ref) {
  var disabled = _ref.disabled,
      emptySvgSymbol = _ref.emptySvgSymbol,
      expandNode = _ref.expandNode,
      groupFormatter = _ref.groupFormatter,
      hideIcon = _ref.hideIcon,
      includeNode = _ref.includeNode,
      itemType = _ref.itemType,
      isLoading = _ref.isLoading,
      nodes = _ref.nodes,
      nodeRenderer = _ref.nodeRenderer,
      removeNode = _ref.removeNode,
      selected = _ref.selected,
      valueFormatter = _ref.valueFormatter,
      emptyText = _ref.emptyText,
      displayGroupHeader = _ref.displayGroupHeader;

  var nodesByGroupLabel = _lodash.default.groupBy(nodes, groupFormatter);

  var emptySvgIcon = hideIcon ? null : emptySvgSymbol;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, null, isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-nodes-container"
  }, /*#__PURE__*/_react.default.createElement(_Spinner.default, null), /*#__PURE__*/_react.default.createElement("p", null, "Loading\u2026")) : _lodash.default.map(nodesByGroupLabel, function (groupedNodes, label) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "treepickergrid-component-group",
      key: _lodash.default.kebabCase(label)
    }, displayGroupHeader ? /*#__PURE__*/_react.default.createElement("div", {
      className: "treepickergrid-component-group-label"
    }, /*#__PURE__*/_react.default.createElement(_Row.default, {
      dts: "group-label-".concat(_lodash.default.kebabCase(label))
    }, label)) : null, _lodash.default.map(groupedNodes, function (node) {
      return /*#__PURE__*/_react.default.createElement(_Node.default, {
        key: node.id,
        disabled: disabled,
        expandNode: expandNode,
        includeNode: includeNode,
        itemType: itemType,
        node: node,
        nodeRenderer: nodeRenderer,
        removeNode: removeNode,
        selected: selected,
        valueFormatter: valueFormatter
      });
    }));
  }), nodes && !isLoading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
    collection: nodes,
    icon: emptySvgIcon,
    text: emptyText
  }) : null);
};

TreePickerGrid.propTypes = {
  disabled: _propTypes.default.bool,
  emptySvgSymbol: _propTypes.default.node,
  emptyText: _propTypes.default.node.isRequired,
  expandNode: _propTypes.default.func,
  groupFormatter: _propTypes.default.func,
  hideIcon: _propTypes.default.bool,
  includeNode: _propTypes.default.func,
  itemType: _propTypes.default.string.isRequired,
  isLoading: _propTypes.default.bool,
  nodes: _propTypes.default.arrayOf(_TreePickerPropTypes.TreePickerPropTypesNode),
  nodeRenderer: _propTypes.default.func,
  removeNode: _propTypes.default.func,
  selected: _propTypes.default.bool.isRequired,
  valueFormatter: _propTypes.default.func,
  displayGroupHeader: _propTypes.default.bool
};
TreePickerGrid.defaultProps = {
  disabled: false,
  displayGroupHeader: true,
  groupFormatter: function groupFormatter() {
    return 'Default Group';
  },
  hideIcon: false,
  isLoading: false
};
var _default = TreePickerGrid;
exports.default = _default;