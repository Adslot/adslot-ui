"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../lib/utils");
const base64UrlPrefix = 'data:image/svg+xml;base64,';
const SvgSymbol = props => {
  let isEncoded = false;
  const {
    classSuffixes,
    href,
    onClick,
    isCircle
  } = props;
  const suffixOptions = {
    clickable: props.onClick
  };
  const symbolBaseClass = 'aui--svg-symbol-component';
  const circleBaseClass = 'aui--svg-symbol-component-circle';
  const symbolClassesList = `${symbolBaseClass} ${(0, _utils.classSuffixHelper)({
    classSuffixes,
    suffixOptions,
    componentClass: symbolBaseClass
  })}`;
  const circleClassesList = `${circleBaseClass} ${(0, _utils.classSuffixHelper)({
    classSuffixes,
    componentClass: circleBaseClass
  })}`;
  if (href.indexOf(base64UrlPrefix) !== -1) {
    isEncoded = true;
  }
  const symbol = isEncoded ? /*#__PURE__*/_react.default.createElement("div", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: href,
    alt: "svg-symbol"
  })) : /*#__PURE__*/_react.default.createElement("svg", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("use", {
    href: href,
    xlinkHref: href
  }));
  return isCircle ? /*#__PURE__*/_react.default.createElement("div", {
    className: circleClassesList
  }, symbol) : symbol;
};
SvgSymbol.propTypes = {
  classSuffixes: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),
  /**
   * accept both file path and base64 encoded string
   */
  href: _propTypes.default.string,
  onClick: _propTypes.default.func,
  isCircle: _propTypes.default.bool
};
SvgSymbol.defaultProps = {
  href: '',
  classSuffixes: [],
  isCircle: false
};
var _default = SvgSymbol;
exports.default = _default;