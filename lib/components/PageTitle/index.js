"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _FlexibleSpacer = _interopRequireDefault(require("../FlexibleSpacer"));

var baseClass = 'pagetitle-component';

var PageTitle = function PageTitle(_ref) {
  var children = _ref.children,
      isFooter = _ref.isFooter,
      title = _ref.title;
  var className = (0, _classnames2.default)(baseClass, (0, _defineProperty2.default)({}, "".concat(baseClass, "-is-footer"), isFooter));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    id: _lodash.default.isString(title) ? _lodash.default.kebabCase(title) : 'title'
  }, children ? /*#__PURE__*/_react.default.createElement("span", {
    className: "flexible-wrapper-inline"
  }, title, /*#__PURE__*/_react.default.createElement(_FlexibleSpacer.default, null), children) : title);
};

PageTitle.propTypes = {
  children: _propTypes.default.node,
  isFooter: _propTypes.default.bool,
  title: _propTypes.default.node
};
PageTitle.defaultProps = {
  isFooter: false
};
var _default = PageTitle;
exports.default = _default;