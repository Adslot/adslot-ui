"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _FlexibleSpacer = _interopRequireDefault(require("../FlexibleSpacer"));

const baseClass = 'pagetitle-component';

const PageTitle = _ref => {
  let {
    children,
    isFooter,
    title
  } = _ref;
  const className = (0, _classnames.default)(baseClass, {
    [`${baseClass}-is-footer`]: isFooter
  });
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