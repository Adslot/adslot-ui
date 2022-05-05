import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper } from '../../lib/utils';
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
  var symbolClassesList = "".concat(symbolBaseClass, " ").concat(classSuffixHelper({
    classSuffixes: classSuffixes,
    suffixOptions: suffixOptions,
    componentClass: symbolBaseClass
  }));
  var circleClassesList = "".concat(circleBaseClass, " ").concat(classSuffixHelper({
    classSuffixes: classSuffixes,
    componentClass: circleBaseClass
  }));

  if (href.indexOf(base64UrlPrefix) !== -1) {
    isEncoded = true;
  }

  var symbol = isEncoded ? /*#__PURE__*/React.createElement("div", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: href,
    alt: "svg-symbol"
  })) : /*#__PURE__*/React.createElement("svg", {
    className: symbolClassesList,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("use", {
    href: href,
    xlinkHref: href
  }));
  return isCircle ? /*#__PURE__*/React.createElement("div", {
    className: circleClassesList
  }, symbol) : symbol;
};

SvgSymbol.propTypes = {
  classSuffixes: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * accept both file path and base64 encoded string
   */
  href: PropTypes.string,
  onClick: PropTypes.func,
  isCircle: PropTypes.bool
};
SvgSymbol.defaultProps = {
  href: '',
  classSuffixes: [],
  isCircle: false
};
export default SvgSymbol;