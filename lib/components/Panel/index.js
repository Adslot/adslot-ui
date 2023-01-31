"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
class Panel extends _react.default.PureComponent {
  onHeaderClick = () => this.props.onClick(this.props.id);
  render() {
    const {
      className,
      children,
      dts,
      icon,
      isCollapsed,
      title
    } = this.props;
    const classesCombined = (0, _classnames.default)(['panel-component', {
      collapsed: isCollapsed
    }, className]);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classesCombined,
      "data-test-selector": dts
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "panel-component-header clearfix",
      onClick: this.onHeaderClick
    }, icon, title), /*#__PURE__*/_react.default.createElement("div", {
      className: "panel-component-content"
    }, children));
  }
}
Panel.propTypes = {
  id: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  icon: _propTypes.default.node,
  title: _propTypes.default.node.isRequired,
  isCollapsed: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  children: _propTypes.default.node
};
var _default = Panel;
exports.default = _default;