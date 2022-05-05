"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

/* eslint-disable react/no-unused-prop-types */
var Tab = function Tab(_ref) {
  var children = _ref.children,
      show = _ref.show;
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "tabpanel",
    "aria-hidden": show,
    className: (0, _classnames.default)(['tab-pane', 'fade', {
      active: show,
      in: show
    }])
  }, children);
};

Tab.innerName = 'au_tab';
Tab.propTypes = {
  children: _propTypes.default.node.isRequired,

  /**
   * string or number
   */
  eventKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  title: _propTypes.default.node.isRequired,
  tabClassName: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  show: _propTypes.default.bool
};
var _default = Tab;
exports.default = _default;