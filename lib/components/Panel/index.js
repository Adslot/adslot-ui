"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _useCollapse = require("../../hooks/useCollapse");
const Panel = ({
  onClick,
  className,
  children,
  dts,
  icon,
  id,
  isCollapsed,
  title,
  animate = true
}) => {
  const onHeaderClick = () => {
    onClick(id);
  };
  const {
    height,
    containerRef,
    transitionState
  } = (0, _useCollapse.useCollapse)({
    collapsed: isCollapsed,
    transitionMs: animate ? 250 : null
  });
  const classesCombined = (0, _classnames.default)(['panel-component', {
    collapsed: isCollapsed,
    [transitionState]: transitionState
  }, className]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classesCombined,
    "data-test-selector": dts
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-component-header clearfix",
    onClick: onHeaderClick
  }, icon, title), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height
    },
    className: (0, _classnames.default)('panel-component-content-wrapper', {
      animate
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    className: "panel-component-content"
  }, children)));
};
Panel.propTypes = {
  id: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  icon: _propTypes.default.node,
  title: _propTypes.default.node.isRequired,
  isCollapsed: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  children: _propTypes.default.node,
  animate: _propTypes.default.bool
};
var _default = exports.default = Panel;