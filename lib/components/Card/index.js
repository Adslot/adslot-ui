"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      className = _ref.className,
      stretch = _ref.stretch,
      fill = _ref.fill,
      append = _ref.append,
      dts = _ref.dts;
  var contentClassNames = (0, _classnames2.default)('card-component-content', {
    stretch: stretch,
    fill: fill,
    append: append
  }, className);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: contentClassNames
  }, (0, _utils.expandDts)(dts)), children);
};

CardContent.propTypes = {
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  fill: _propTypes.default.bool,
  stretch: _propTypes.default.bool,
  append: _propTypes.default.bool,
  dts: _propTypes.default.string
};
CardContent.defaultProps = {
  fill: false,
  stretch: false,
  append: false
};

var Card = function Card(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      accent = _ref2.accent,
      dts = _ref2.dts;
  var baseClass = 'card-component';
  var containerClassNames = (0, _classnames2.default)(baseClass, (0, _defineProperty2.default)({}, "accent accent-".concat(accent), accent), className);

  var nestedChildren = _react.default.Children.map(children, function (child // eslint-disable-line lodash/prefer-lodash-method
  ) {
    return !_lodash.default.get(child, 'props.append') ? child : null;
  });

  var appendedChildren = _react.default.Children.map(children, function (child // eslint-disable-line lodash/prefer-lodash-method
  ) {
    return _lodash.default.get(child, 'props.append') ? child : null;
  });

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: containerClassNames
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-content-container")
  }, nestedChildren), appendedChildren);
};

Card.propTypes = {
  /**
   * arrayOf Card.Content
   */
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  accent: _propTypes.default.string,
  dts: _propTypes.default.string
};
var _default = {
  Container: Card,
  Content: CardContent
};
exports.default = _default;