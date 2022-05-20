"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../lib/utils");

var SplitPane = function SplitPane(_ref) {
  var children = _ref.children,
      dts = _ref.dts,
      additionalClassNames = _ref.additionalClassNames;

  var splitPaneClass = _classnames.default.apply(void 0, ['splitpane-component'].concat((0, _toConsumableArray2.default)(additionalClassNames)));

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
SplitPane.defaultProps = {
  additionalClassNames: []
};
var _default = SplitPane;
exports.default = _default;