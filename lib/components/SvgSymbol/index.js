"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var base64UrlPrefix = 'data:image/svg+xml;base64,';

var SvgSymbol = function SvgSymbol(props) {
  var isEncoded = false;
  var classSuffixes = props.classSuffixes,
      href = props.href,
      onClick = props.onClick,
      isCircle = props.isCircle;
  var suffixOptions = {
    clickable: props.onClick
  };
  var symbolBaseClass = 'aui--svg-symbol-component';
  var circleBaseClass = 'aui--svg-symbol-component-circle';
  var symbolClassesList = "".concat(symbolBaseClass, " ").concat((0, _utils.classSuffixHelper)({
    classSuffixes: classSuffixes,
    suffixOptions: suffixOptions,
    componentClass: symbolBaseClass
  }));
  var circleClassesList = "".concat(circleBaseClass, " ").concat((0, _utils.classSuffixHelper)({
    classSuffixes: classSuffixes,
    componentClass: circleBaseClass
  }));

  if (href.indexOf(base64UrlPrefix) !== -1) {
    isEncoded = true;
  }

  var symbol = isEncoded ? /*#__PURE__*/_react.default.createElement("div", {
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