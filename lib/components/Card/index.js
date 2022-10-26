"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

const CardContent = _ref => {
  let {
    children,
    className,
    stretch,
    fill,
    append,
    dts
  } = _ref;
  const contentClassNames = (0, _classnames.default)('card-component-content', {
    stretch,
    fill,
    append
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

const Card = _ref2 => {
  let {
    children,
    className,
    accent,
    dts
  } = _ref2;
  const baseClass = 'card-component';
  const containerClassNames = (0, _classnames.default)(baseClass, {
    [`accent accent-${accent}`]: accent
  }, className);

  const nestedChildren = _react.default.Children.map(children, (child // eslint-disable-line lodash/prefer-lodash-method
  ) => !_lodash.default.get(child, 'props.append') ? child : null);

  const appendedChildren = _react.default.Children.map(children, (child // eslint-disable-line lodash/prefer-lodash-method
  ) => _lodash.default.get(child, 'props.append') ? child : null);

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: containerClassNames
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: `${baseClass}-content-container`
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