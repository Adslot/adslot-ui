"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _TreePickerContext = require("./TreePickerContext");
var _TreePickerTree = _interopRequireDefault(require("./TreePickerTree"));
var _TreePickerHeader = _interopRequireDefault(require("./TreePickerHeader"));
var _TreePickerNode = _interopRequireDefault(require("./TreePickerNode"));
var _TreePickerNav = _interopRequireDefault(require("./TreePickerNav"));
var _TreePickerSearch = _interopRequireDefault(require("./TreePickerSearch"));
const TreePicker = ({
  children,
  renderNode,
  className
}) => {
  const renderNodeWithKey = _react.default.useCallback((node, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: node.id
  }, renderNode(node, index)), [renderNode]);
  return /*#__PURE__*/_react.default.createElement(_TreePickerContext.TreePickerProvider, {
    renderNode: renderNodeWithKey
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('tree-picker', className)
  }, children));
};
TreePicker.propTypes = {
  children: _propTypes.default.node.isRequired,
  renderNode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
};
TreePicker.Tree = _TreePickerTree.default;
TreePicker.Header = _TreePickerHeader.default;
TreePicker.Node = _TreePickerNode.default;
TreePicker.Nav = _TreePickerNav.default;
TreePicker.Search = _TreePickerSearch.default;
var _default = exports.default = TreePicker;