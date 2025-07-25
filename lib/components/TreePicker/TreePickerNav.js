"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Breadcrumb = _interopRequireDefault(require("../Breadcrumb"));
var _TreePickerContext = require("./TreePickerContext");
const TreePickerNav = ({
  rootLabel = 'All',
  className,
  onNavTo
}) => {
  const paths = (0, _TreePickerContext.useTreePickerPaths)();
  const {
    backTo
  } = (0, _TreePickerContext.useInternalActions)();
  const rootNode = {
    id: '__all__',
    label: rootLabel
  };
  return paths.length === 0 ? null : /*#__PURE__*/_react.default.createElement(_Breadcrumb.default, {
    className: (0, _classnames.default)('aui--tree-picker-nav', 'aui--tree-picker-section', className),
    rootNode: rootNode,
    divider: "/",
    nodes: paths,
    onClick: pathId => {
      const newPath = pathId === rootNode.id ? null : pathId;
      backTo(newPath);
      onNavTo?.(newPath);
    }
  });
};
TreePickerNav.propTypes = {
  rootLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  onNavTo: _propTypes.default.func
};
var _default = exports.default = TreePickerNav;