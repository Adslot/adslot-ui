"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _Button = _interopRequireDefault(require("../Button"));
var _TreePickerContext = require("./TreePickerContext");
var _utils = require("../../utils");
const getNoAddable = state => _lodash.default.isEmpty(state.addable);
const HeaderAddAll = () => {
  const noAddable = (0, _TreePickerContext.useTreePickerSlice)(getNoAddable);
  const getTreeState = (0, _TreePickerContext.useTreePickerGetState)();
  return noAddable ? /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--tree-picker-header-action-holder"
  }) : /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "link",
    className: "aui--tree-picker-header-add-all",
    onClick: () => {
      const addable = getTreeState().addable;
      _lodash.default.forEach(addable, addNodeRef => {
        addNodeRef.current(true);
      });
    }
  }, "Include All");
};
const getCurrentNodeHeader = state => {
  const currentNode = state.paths[state.paths.length - 1];
  return currentNode?.header;
};
const TreePickerHeader = ({
  children,
  className,
  label,
  dts
}) => {
  const header = (0, _TreePickerContext.useTreePickerSlice)(getCurrentNodeHeader);
  const finalLabel = !_lodash.default.isUndefined(header) ? header : label;
  return !finalLabel ? null : /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)('aui--tree-picker-row', 'aui--tree-picker-header', className)
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--tree-picker-row-content"
  }, finalLabel), children ?? /*#__PURE__*/_react.default.createElement(HeaderAddAll, null));
};
TreePickerHeader.propTypes = {
  label: _propTypes.default.node,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  dts: _propTypes.default.string
};
var _default = exports.default = TreePickerHeader;