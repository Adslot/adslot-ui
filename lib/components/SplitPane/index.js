"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _utils = require("../../utils");
const SplitPane = ({
  children,
  dts,
  additionalClassNames = []
}) => {
  const splitPaneClass = (0, _classnames.default)('splitpane-component', ...additionalClassNames);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: splitPaneClass
  }, (0, _utils.expandDts)(dts)), children);
};
SplitPane.propTypes = {
  additionalClassNames: _propTypes.default.arrayOf(_propTypes.default.string),
  children: _propTypes.default.node,
  /**
   * 	render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: _propTypes.default.string
};
var _default = exports.default = SplitPane;